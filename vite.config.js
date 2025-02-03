import { defineConfig } from "vite";
import externalize from "vite-plugin-externalize-dependencies";

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: "src/main.ts",
      fileName: "main",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["@icmc-ide/core"],
    },
    sourcemap: "inline",
    minify: true,
    cssMinify: true,
    target: "es2023",
  },
  worker: {
    format: "es",
  },
  plugins: [
    // Externalize dependencies on dev mode
    externalize({
      external: ["@icmc/core"],
    }),
    {
      name: "rollup-plugin-html-template",
      enforce: "pre",
      async transform(code, id) {
        if (id.endsWith(".html?template")) {
          const html = code.replaceAll(/>\s+</g, "><");
          return `
            const template = document.createElement("template");
            template.innerHTML = ${JSON.stringify(html)};
            export default template;
          `;
        }
      },
    },
  ],
});
