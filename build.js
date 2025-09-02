const esbuild = require("esbuild");
const fs = require("fs/promises");
const path = require("path");

async function copyDir(src, dest) {
  // Create destination directory
  await fs.mkdir(dest, { recursive: true });

  // Read source directory
  const entries = await fs.readdir(src, { withFileTypes: true });

  // Copy each entry
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function build({ watch = false } = {}) {
  // Create dist directory
  const distDir = path.join(__dirname, "./dist/admin");
  await fs.mkdir(distDir, { recursive: true });

  const buildOptions = {
    entryPoints: ["src/sw.js"],
    bundle: true,
    outfile: path.join(distDir, "sw.js"),
    format: "esm",
    minify: !watch,
    sourcemap: true,
    sourceRoot: "/src",
    metafile: true,
  };

  if (watch) {
    const context = await esbuild.context(buildOptions);
    await context.watch();
    console.log("Watching for changes...");
  } else {
    // Single build
    const result = await esbuild.build(buildOptions);

    if (result.metafile) {
      console.log("Javascript build complete! Source maps generated.");
      // Uncomment to see detailed build info:
      // console.log(await esbuild.analyzeMetafile(result.metafile));
    }
  }

  // Copy static files
  console.log(
    "copying index.html.tmpl to dist (it will be used as a template) by github action",
  );
  await fs.copyFile(
    path.join(__dirname, "src/index.html.tmpl"),
    path.join(distDir, "index.html.tmpl"),
  );

  console.log("copying the entire vendor directory");
  // Copy entire vendor directory
  const srcVendorDir = path.join(__dirname, "src/vendor");
  const destVendorDir = path.join(distDir, "vendor");
  await copyDir(srcVendorDir, destVendorDir);

  if (!watch) {
    console.log("Build complete! Your admin panel is ready in dist/admin/");
  }
}

// Check if --watch flag is passed
const watch = process.argv.includes("--watch");
build({ watch }).catch(console.error);
