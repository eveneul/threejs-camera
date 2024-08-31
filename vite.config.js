import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/threejs-camera/",
  alias: {
    three: path.resolve("./node_modules/three"),
  },
});
