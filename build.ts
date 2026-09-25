import tailwind from "bun-plugin-tailwind";
import { rm } from "node:fs/promises";
import path from "node:path";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });
const entrypoints = [...new Bun.Glob("src/**/*.html").scanSync()];

if (entrypoints.length === 0) {
  console.error("❌ No HTML files found in src/");
  process.exit(1);
}

console.log(`📦 Building ${entrypoints.length} entry point(s)...`);

const result = await Bun.build({
  entrypoints,
  outdir,
  plugins: [tailwind],
  minify: true,
  target: "browser",
  sourcemap: process.env.NODE_ENV === "production" ? false : "linked",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

if (!result.success) {
  console.error("❌ Build failed!");
  for (const msg of result.logs) {
    console.error(msg);
  }
  process.exit(1);
}

console.log("\n✅ Build successful!");
for (const output of result.outputs) {
  console.log(` ${path.relative(process.cwd(), output.path)}  ${(output.size / 1024).toFixed(1)} KB`);
}

console.log(`\n📁 Output directory: ${outdir}`);
