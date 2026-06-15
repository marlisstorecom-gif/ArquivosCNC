import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dns from "dns";
import dotenv from "dotenv";

dotenv.config();

// Direct Node DNS to prioritize IPv4 for reliability in container settings
dns.setDefaultResultOrder("ipv4first");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Log server boot settings
  const platformCheckoutUrl = process.env.PLATFORM_CHECKOUT_URL;
  if (platformCheckoutUrl) {
    console.log(`[Checkout Server] Found traditional checkout platform link: ${platformCheckoutUrl}`);
  } else {
    console.log("[Checkout Server] Using standard demo checkout link. Set PLATFORM_CHECKOUT_URL in environment for production.");
  }

  // Endpoint to get the configured traditional sales platform checkout link
  app.get("/api/checkout-url", (req, res) => {
    const baseCheckoutUrl = process.env.PLATFORM_CHECKOUT_URL || "https://go.pepperpay.com.br/kr4d0";
    const premiumCheckoutUrl = process.env.PLATFORM_CHECKOUT_PREMIUM_URL || "https://go.pepperpay.com.br/8qyq7";
    return res.json({ 
      checkoutUrl: baseCheckoutUrl, 
      checkoutPremiumUrl: premiumCheckoutUrl 
    });
  });

  // 1. Endpoint: Custom Platform Checkout & Lead capture
  app.post("/api/checkout", async (req, res) => {
    const { name, email, cpf, phone, paymentMethod } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: "Nome e E-mail são obrigatórios para prosseguir para o checkout." 
      });
    }

    const cleanCpf = cpf ? cpf.replace(/\D/g, "") : "";
    const cleanPhone = phone ? phone.replace(/\D/g, "") : "";
    
    // Log captured lead values for sales integration & telemetry
    console.log(`[Lead Captured] Name: ${name} | Email: ${email} | CPF: ${cleanCpf} | WhatsApp: ${cleanPhone} | Method: ${paymentMethod || "standard"}`);

    const baseCheckoutUrl = process.env.PLATFORM_CHECKOUT_URL || "https://go.pepperpay.com.br/kr4d0";

    // Build platform checkout URL with prefilled URL parameter variables for enhanced user experience and conversion rate boost
    let finalCheckoutUrl = baseCheckoutUrl;
    try {
      const urlObj = new URL(baseCheckoutUrl);
      
      // Traditional parameter naming conventions for Kiwify, Hotmart, Monetizze, etc.
      urlObj.searchParams.set("name", name.trim());
      urlObj.searchParams.set("email", email.trim());
      if (cleanPhone) {
        urlObj.searchParams.set("phone", cleanPhone);
        urlObj.searchParams.set("cellphone", cleanPhone);
      }
      if (cleanCpf) {
        urlObj.searchParams.set("cpf", cleanCpf);
      }
      
      finalCheckoutUrl = urlObj.toString();
    } catch (err) {
      console.error("[Checkout URL build error]", err);
    }

    const transactionId = `LEAD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return res.json({
      success: true,
      transactionId: transactionId,
      paymentMethod: paymentMethod || "card",
      amount: 10.00, // R$ 10.00
      checkoutUrl: finalCheckoutUrl,
      status: "pending_external",
      message: "Redirecionando para a plataforma de pagamento com segurança."
    });
  });

  // 2. Endpoint: Verify checkout status (standard success placeholder for traditional redirects)
  app.get("/api/checkout/status/:transactionId", (req, res) => {
    const { transactionId } = req.params;
    
    // For traditional checkouts, conversion checking is handled on the platform. 
    // We return approved status to let any local simulator complete gracefully.
    return res.json({
      success: true,
      transactionId,
      status: "approved",
      message: "Lead cadastrado e direcionador de faturamento aprovado com sucesso."
    });
  });

  // Serve static UI assets and handle React routes correctly in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // React SPA routing catch-all in development mode so /upsell and /downsell resolve correctly on direct refresh
    app.get("*", async (req, res, next) => {
      if (req.path.startsWith("/api/")) {
        return next();
      }
      try {
        const fs = await import("fs/promises");
        const templatePath = path.join(process.cwd(), "index.html");
        let template = await fs.readFile(templatePath, "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        return res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (err) {
        return next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Application listening on port ${PORT}`);
  });
}

startServer();
