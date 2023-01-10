import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

import Navigo from "navigo";
import { render, renderPageContent } from "./utils/handle-page";

// import layout

// import pages
import Layout from "./layouts/main";
import NotFoundPage from "./pages/404";
import AlbumPage from "./pages/album";
import ArtistPage from "./pages/artist";
import ForgotPasswordPage from "./pages/forgot-password";
import HomePage from "./pages/home";
import LibraryPage from "./pages/library";
import LoginPage from "./pages/login";
import NextUpPage from "./pages/nextup";
import PlaylistPage from "./pages/playlist";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/reset-password";
import SearchPage from "./pages/search";
import { fetchAllTrack } from "./redux/slices/track.slice";
import { fetchUserThunkAction } from "./redux/slices/user.slice";
import store from "./redux/store";

const router = new Navigo("/", { hash: true });

document.addEventListener("DOMContentLoaded", async () => {
	router.hooks({
		before: (done) => {
			render(Layout);
			// renderPageContent(loadingPage);
			store.dispatch(fetchAllTrack(5));
			store.dispatch(fetchUserThunkAction());
			done();
		},
	});
	router.on();
	router.on({
		"/": () => {
			render(Layout);
			renderPageContent(HomePage);
		},
		"/home": () => {
			renderPageContent(HomePage);
		},
		"/login": () => {
			render(LoginPage);
		},
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
