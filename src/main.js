import Navigo from "navigo";
import { $ } from "./utils/common";
import instance from "./api/config";
const router = new Navigo("/", { hash: true });

// import pages
import homePage from "./pages/home";
import loginPage from "./pages/login";
import registerPage from "./pages/register";
import forgotPasswordPage from "./pages/forgot-password";
import resetPasswordPage from "./pages/reset-password";
// async function
document.addEventListener("DOMContentLoaded", () => {
	const renderPage = async (page, id) => {
		const app = $("#app");
		if (app) app.innerHTML = await page.render(id);
		if (page.afterRender) await page.afterRender();
	};
	router.on({
		"/": async () => {
			await renderPage(homePage);
		},
		"/home": async () => {
			await renderPage(homePage);
		},
		"/login": () => {
			renderPage(loginPage);
		},
		"/register": () => {
			renderPage(registerPage);
		},
		"/forgot-password": () => {
			renderPage(forgotPasswordPage);
		},
		"/reset-password": () => {
			renderPage(resetPasswordPage);
		},
	});

	router.resolve();
});
