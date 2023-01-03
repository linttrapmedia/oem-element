const esbuild = require("esbuild");

esbuild.buildSync({
  bundle: true,
  entryPoints: ["src/index.ts"],
  globalName: "OEM.Elements",
  minify: true,
  outdir: "lib",
  sourcemap: true,
  target: ["esnext"],
  write: true,
});
