import { defineConfig } from "vite";

export default defineConfig({
  base: "/threejs-camera/",
  alias: {
    three: path.resolve("./node_modules/three"),
  },
});
