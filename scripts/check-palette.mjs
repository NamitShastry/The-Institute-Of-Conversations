import fs from "fs";
import path from "path";

// Revision 3 Palette Rules:
// Reject all old navy, gold, Revision 2 sand/peach/old-orange/rust/old-ink/old-cream hexes.
const FORBIDDEN_HEXES = [
  // Old Navy & Gold (Rev 1)
  "#0B1F3A",
  "#02163B",
  "#102541",
  "#E0A933",
  "#F3E3B3",
  "#FBF7EC",
  "#FFFDF8",
  "#FDF1EE",
  "#9B2C2C",
  // Old Sand & Peach (Rev 2)
  "#D9C3A5",
  "#E6D8C3",
  "#C5AB89",
  "#F7B58A",
  "#FCD8C1",
  // Old Orange & Rust (Rev 2)
  "#F26A1B",
  "#D85A12",
  "#B8470F",
  "#7A2E12",
  // Old Ink & Cream (Rev 2)
  "#1C1713",
  "#5E5349",
  "#8C8075",
  "#F3ECE0",
  "#FAF6F0",
  "#EADDCB",
].map((h) => h.toLowerCase());

const DIRS_TO_CHECK = ["src", "content"];

const EXCLUDED_FILES = [
  "ioc-logo-transparent.png",
  "ioc-logo.png",
  "org-chart-handwritten.jpg",
  "director.jpg",
];

let violations = [];

function checkFile(filePath) {
  const fileName = path.basename(filePath);
  if (EXCLUDED_FILES.includes(fileName)) return;
  if (
    fileName.endsWith(".png") ||
    fileName.endsWith(".jpg") ||
    fileName.endsWith(".jpeg") ||
    fileName.endsWith(".ico") ||
    fileName.endsWith(".docx") ||
    fileName.endsWith(".pdf")
  ) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const lowerLine = line.toLowerCase();
    FORBIDDEN_HEXES.forEach((hex) => {
      if (lowerLine.includes(hex)) {
        violations.push({
          file: filePath,
          line: index + 1,
          hex,
          snippet: line.trim(),
        });
      }
    });
  });
}

function traverseDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverseDir(fullPath);
    } else if (entry.isFile()) {
      checkFile(fullPath);
    }
  }
}

for (const dir of DIRS_TO_CHECK) {
  traverseDir(path.resolve(process.cwd(), dir));
}

if (violations.length > 0) {
  console.error("❌ Palette Check Failed! Found forbidden old navy/gold/sand/orange hex codes in source:");
  violations.forEach((v) => {
    console.error(`  ${v.file}:${v.line} -> Found ${v.hex}: "${v.snippet}"`);
  });
  process.exit(1);
} else {
  console.log("✅ Palette Check Passed! Strictly using Revision 3 palette (Cream #F3EEE3 · Ink #111111 · Burnt Orange #D9541E).");
  process.exit(0);
}
