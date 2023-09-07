import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_APP_HISTOR_BASE } = loadEnv(mode, process.cwd(), "");

  return {
    base: VITE_APP_HISTOR_BASE,

    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    server: {
      cors: true,
      open: true,
      proxy: {
        "/api": {
          target: "http://localhost.com",
          changeOrigin: true,
        },
      },
    },
  };
});
