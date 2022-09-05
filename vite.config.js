import { defineConfig } from "vite";
import dns from "dns";
import "dotenv/config";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
	server: {
		port: process.env.PORT,
	},
});
