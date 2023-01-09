const esbuild = require("esbuild");
const env = process.env.NODE_ENV || "development";
const pkg = require("../package.json");

esbuild.build({
  bundle: true,
  entryNames: `element`,
  entryPoints: ["src/element.ts"],
  globalName: "OEM.Elements",
  minify: true,
  outdir: "dist",
  sourcemap: true,
  target: ["esnext"],
  treeShaking: true,
  watch: env === "development",
  write: true,
});
