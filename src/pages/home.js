import { $ } from "../utils/common";
import audioController from "../components/root/audio-controller";

import trackCard from "../components/cards/track-card-v1";
import instance from "../api/axios.config";
import albumCard from "../components/cards/album-card";
import artistCard from "../components/cards/artist-card";

import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import storage from "../utils/localstorage";

const homePage = {
	async render() {
		const auth = storage.get("auth")

		const _tracks = instance.get("/track?limit=5");
		const _albums = instance.get("/album");
		const _artists = instance.get("/artist");
		const [tracks, albums, artists] = await Promise.all([_tracks, _albums, _artists])
		return /* html */`
			<div class="flex flex-col gap-10 py-8 px-8 sm:px-3 overflow-y-auto h-full invisible-scroll" id="page-content">
				<section class="relative">
					<div class="relative z-10">
						<h1 class="text-2xl sm:text-xl font-semibold mb-5 text-base-content">Most Popular</h1>
						<div class="flex flex-col sm:gap-3">${Array.isArray(tracks) ? tracks.map((item, index) => trackCard.render(item, index)).join("") : ""}</div>
						<a class="text-right font-medium text-base-content block mt-5 hover:link">See more</a>
					</div>
				</section>
				<section>
					<h1 class="text-2xl  sm:text-xl font-semibold mb-5 text-base-content">Artists you also like</h1>
					<div class="swiper artist-slider">
						<div class="swiper-wrapper pb-10 container">
							${artists.map((item) => {
			if (!item.followers.includes(auth?.id))
				return /* html */ `<div class="swiper-slide">${artistCard.render(item)}</div>
							`}).join("")}
						</div>
						<div class="swiper-button-next right-5"><i class="bi bi-arrow-right-short"></i></div>
						<div class="swiper-button-prev left-4"><i class="bi bi-arrow-left-short"></i></div>
					</div>
			
					<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-5"></div>
				</section>
			
				<section>
					<h1 class="text-2xl font-semibold mb-5 text-base-content sm:text-xl">New albums</h1>
					<div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4  xl:gap-12 xxl:grid-cols-5 xxl:gap-12 ">
						${albums.map((item) => albumCard.render(item)).join("")}</div>
				</section>
			</div>
		`;
	},
	handleEvents() {
		const swiper = new Swiper(".artist-slider", {
			modules: [Navigation, Pagination],
			loop: true,
			// loopFillGroupWithBlank: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				375: {
					slidesPerView: 2,
					spaceBetween: 20,
					slidesPerGroup: 2,
				},
				600: {
					slidesPerView: 3,
					spaceBetween: 18,
					slidesPerGroup: 3,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 36,
					slidesPerGroup: 3,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 48,
					slidesPerGroup: 3,
				},
				1366: {
					slidesPerView: 4,
					spaceBetween: 48,
					slidesPerGroup: 5,
				},
				1920: {
					slidesPerView: 5,
					spaceBetween: 48,
					slidesPerGroup: 5,
				}
			},
		});
		audioController.start()
		trackCard.handleEvents();
		artistCard.handleEvents()
	},
};
export default homePage;
