import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [react(),
		svgr({
			svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
			include: '**/*.svg',
		})],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./styles/Global.scss";`
			},
		},
	},
	server: {
		host: "localhost",
		port: 3000,
	},
});
