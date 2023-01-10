import "./index.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

import Navigo from "navigo";
import { render, renderPageContent } from "./utils/handle-page";
import { getNowPlayingTrack } from "./api/track";
import { $ } from "./utils/common";

// import layout
import mainLayout from "./layouts/main";

// import pages
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPasswordPage from "./pages/reset-password";
import ArtistPage from "./pages/artist";
import NextUpPage from "./pages/nextup";
import AlbumPage from "./pages/album";
import PlaylistPage from "./pages/playlist";
import storage from "./utils/localstorage";
import LibraryPage from "./pages/library";
import NotFoundPage from "./pages/404";
import SearchPage from "./pages/search";
import loadingPage from "./pages/loading";
import store from "./redux/store";

const router = new Navigo("/", { hash: true });

console.log(store);
document.addEventListener("DOMContentLoaded", async () => {
	await render(mainLayout);

	router.hooks({
		before: (done) => {
			const nextUp = storage.get("nextUp");
			if (!nextUp) storage.set("nextUp", []);
			renderPageContent(loadingPage);

			done();
		},
	});
	router.on("/login", () => {
		$("#app").innerHTML = LoginPage();
	});
	router.on({
		"/": async () => {
			await render(mainLayout);
			renderPageContent(HomePage);
		},
		"/home": () => {
			renderPageContent(HomePage);
		},
		// "/login": () => {
		// 	render(LoginPage);
		// },
		"/register": () => {
			render(RegisterPage);
		},
		"/forgot-password": () => {
			render(ForgotPasswordPage);
		},
		"/reset-password": () => {
			render(ResetPasswordPage);
		},
		"/library": () => {
			renderPageContent(LibraryPage);
		},
		"/artist/:id": ({ data }) => {
			const { id } = data;
			renderPageContent(ArtistPage, id);
		},
		"album/:id": ({ data }) => {
			const { id } = data;
			renderPageContent(AlbumPage, id);
		},
		"/nextup": () => {
			renderPageContent(NextUpPage);
		},
		"/liked-tracks": () => {
			renderPageContent(PlaylistPage);
		},
		"/playlist/:id": ({ data }) => {
			const { id } = data;
			renderPageContent(PlaylistPage, id);
		},
		"/search": () => {
			renderPageContent(SearchPage);
		},
	});

	router.notFound(
		() => {
			render(NotFoundPage);
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
