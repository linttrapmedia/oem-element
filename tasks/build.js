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

// rename types module
const fs = require("fs");
const path = require("path");
const typesPath = path.join(__dirname, "../src/element.d.ts");
const types = fs.readFileSync(typesPath, "utf8");
fs.writeFileSync(
  typesPath,
  types.replace(
    `declare module "element"`,
    `declare module "@linttrapmedia/element"`
  )
);
