import fs from "fs";
import path from "path";

const FORBIDDEN_HEXES = [
  "#0B1F3A",
  "#02163B",
  "#102541",
  "#E0A933",
  "#F3E3B3",
  "#FBF7EC",
  "#FFFDF8",
  "#FDF1EE",
  "#9B2C2C",
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
  if (fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".ico")) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    // Check if line contains any forbidden hex
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
  console.error("❌ Palette Check Failed! Found forbidden old navy/gold hex codes in source:");
  violations.forEach((v) => {
    console.error(`  ${v.file}:${v.line} -> Found ${v.hex}: "${v.snippet}"`);
  });
  process.exit(1);
} else {
  console.log("✅ Palette Check Passed! No forbidden navy/gold hex codes found in src/ or content/.");
  process.exit(0);
}

