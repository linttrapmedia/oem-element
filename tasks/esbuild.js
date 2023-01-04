const esbuild = require("esbuild");
const env = process.env.NODE_ENV || "development";

esbuild.build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  globalName: "OEM.Elements",
  minify: true,
  outdir: "lib",
  sourcemap: true,
  target: ["esnext"],
  watch: env === "development",
  write: true,
});
