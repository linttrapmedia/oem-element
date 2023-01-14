const esbuild = require("esbuild");
const env = process.env.NODE_ENV || "development";

esbuild.build({
  bundle: true,
  entryNames: `element`,
  entryPoints: ["src/index.ts"],
  globalName: "OEM.Element",
  minify: true,
  outdir: "dist",
  sourcemap: true,
  target: ["esnext"],
  treeShaking: true,
  watch: env === "development",
  write: true,
});
