import "./index.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

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
import notFoundPage from "./pages/404";
import searchPage from "./pages/search";

const router = new Navigo("/", { hash: true });

document.addEventListener("DOMContentLoaded", async () => {
	await render(mainLayout);

	router.hooks({
		before: (done) => {
			const nextUp = storage.get("nextUp");
			if (!nextUp) storage.set("nextUp", []);
			done();
		},
	});

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
			renderPageContent(libraryPage);
		},
		"/artist/:id": ({ data }) => {
			const { id } = data;
			renderPageContent(artistPage, id);
		},
		"album/:id": ({ data }) => {
			const { id } = data;
			renderPageContent(albumPage, id);
		},
		"/nextup": () => {
			renderPageContent(nextUpPage);
		},
		"/liked-tracks": () => {
			renderPageContent(playlistPage);
		},
		"/playlist/:id": ({ data }) => {
			const { id } = data;
			renderPageContent(playlistPage, id);
		},
		"/search": () => {
			renderPageContent(searchPage);
		},
	});

	router.notFound(
		() => {
			render(notFoundPage);
		},
		{
			leave: (done) => {
				location.reload();
				done();
			},
		},
	);

	router.resolve();
});

export default router;
