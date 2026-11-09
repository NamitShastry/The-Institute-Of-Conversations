import http from "http";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const PORT = 8089;
const OUT_DIR = path.resolve(process.cwd(), "out");
const SCREENSHOTS_DIR = path.resolve(process.cwd(), "public", "screenshots");

fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// Simple static server for out/ directory
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/") reqPath = "/index.html";
  else if (!path.extname(reqPath)) {
    if (fs.existsSync(path.join(OUT_DIR, reqPath + ".html"))) {
      reqPath = reqPath + ".html";
    } else if (fs.existsSync(path.join(OUT_DIR, reqPath, "index.html"))) {
      reqPath = path.join(reqPath, "index.html");
    }
  }

  const filePath = path.join(OUT_DIR, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, async () => {
  console.log(`Static verification server running at http://127.0.0.1:${PORT}`);

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"],
    });

    const viewports = [
      { name: "1440px", width: 1440, height: 900 },
      { name: "1024px", width: 1024, height: 768 },
      { name: "768px", width: 768, height: 1024 },
      { name: "390px", width: 390, height: 844 },
    ];

    const pages = [
      { route: "/", name: "home" },
      { route: "/team", name: "team" },
      { route: "/events", name: "events" },
      { route: "/sponsors", name: "sponsors" },
      { route: "/guests", name: "guests" },
      { route: "/gallery", name: "gallery" },
      { route: "/contact", name: "contact" },
    ];

    // 1. Capture multi-viewport responsive screenshots
    for (const vp of viewports) {
      console.log(`Testing viewport ${vp.name}...`);
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      for (const p of pages) {
        await page.goto(`http://127.0.0.1:${PORT}${p.route}`, { waitUntil: "networkidle0" });
        await new Promise((r) => setTimeout(r, 600));

        const screenshotPath = path.join(SCREENSHOTS_DIR, `${p.name}-${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: p.name !== "home" });
        console.log(`Saved: ${p.name}-${vp.name}.png`);

        if (p.name === "home" && vp.name === "1440px") {
          const fullHomePath = path.join(SCREENSHOTS_DIR, `home-full-1440px.png`);
          await page.screenshot({ path: fullHomePath, fullPage: true });
          console.log(`Saved: home-full-1440px.png`);
        }
      }
      await page.close();
    }

    // 2. Hero Curtain Sequence Scroll-Through Recording
    console.log("Recording Hero Curtain sequence scrub...");
    const heroPage = await browser.newPage();
    await heroPage.setViewport({ width: 1440, height: 900 });
    await heroPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 600));

    const scrollSteps = [0, 0.25, 0.5, 0.75, 1.0];
    for (const step of scrollSteps) {
      await heroPage.evaluate((s) => {
        const maxScroll = window.innerHeight * 2.2;
        window.scrollTo(0, maxScroll * s);
      }, step);
      await new Promise((r) => setTimeout(r, 400));
      const stepPath = path.join(SCREENSHOTS_DIR, `hero-curtain-${Math.round(step * 100)}.png`);
      await heroPage.screenshot({ path: stepPath });
      console.log(`Captured curtain scrub: hero-curtain-${Math.round(step * 100)}.png`);
    }
    await heroPage.close();

    await browser.close();
    console.log("All visual verifications completed successfully!");
  } catch (err) {
    console.error("Verification error:", err);
  } finally {
    server.close();
  }
});

