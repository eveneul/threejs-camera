import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";

export default defineConfig({
  base: "/threejs-camera/",
  plugins: [
    alias({
      entries: [
        {
          find: "three",
          replacement: "node_modules/three/build/three.module.js",
        },
      ],
    }),
  ],
});
