import "./index.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
// import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"

import Navigo from "navigo";
import { render, renderPageContent } from "./utils/handle-page";
import { getNowPlayingTrack } from "./api/track";
import { $ } from "./utils/common";

// import layout
import mainLayout from "./layouts/main";

// import pages
import homePage from "./pages/home";
import loginPage from "./pages/login";
import registerPage from "./pages/register";
import forgotPasswordPage from "./pages/forgot-password";
import resetPasswordPage from "./pages/reset-password";
import artistPage from "./pages/artist";
import nextUpPage from "./pages/nextup";
import albumPage from "./pages/album";
import playlistPage from "./pages/playlist";
import storage from "./utils/localstorage";
import libraryPage from "./pages/library";


const router = new Navigo("/", { hash: true });

document.addEventListener("DOMContentLoaded", async () => {
	router.hooks({
		before: async (done) => {
			const nextUp = storage.get("nextUp")
			if (nextUp === null || nextUp.length == 0)
				getNowPlayingTrack()
			done();
		},
	});

	await render(mainLayout);

	router.on({
		"/": async () => {
			await render(mainLayout);
			renderPageContent(homePage);
		},
		"/home": () => {
			renderPageContent(homePage);
		},
		"/login": () => {
			render(loginPage);
		},
		"/register": () => {
			render(registerPage);
		},
		"/forgot-password": () => {
			render(forgotPasswordPage);
		},
		"/reset-password": () => {
			render(resetPasswordPage);
		},
		"/library": () => {
			renderPageContent(libraryPage)
		},
		"/artist/:id": ({ data }) => {
			const { id } = data;
			renderPageContent(artistPage, id);
		},
		"album/:id": ({ data }) => {
			const { id } = data
			renderPageContent(albumPage, id)
		},
		"/nextup": () => {
			renderPageContent(nextUpPage);
		},
		"/playlist/:id": async ({ data }) => {
			const { id } = data;
			await renderPageContent(playlistPage, id);
		},
	});

	router.notFound(
		() => {
			$("#app").innerHTML = /* html */ `<h1>404! Not found</h1>`;
		},
		{
			leave: (done) => {
				location.reload();
				done();
			},
		},
	);

	router.resolve();
})





export default router;
