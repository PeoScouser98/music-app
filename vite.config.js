import { defineConfig } from "vite";

import alias from "@rollup/plugin-alias";

import path, { resolve } from "path";
const rootDir = resolve(__dirname);
export default defineConfig({
	plugins: [
		alias({
			entries: [
				{
					find: "@",
					replacement: resolve(rootDir, "src"),
				},
			],
		}),
	],
	resolve: {
		alias: {
			"@/*": path.resolve(__dirname, "./src/"),
		},
	},

	server: {
		port: 5000,
		hmr: { overlay: false },
	},
});
