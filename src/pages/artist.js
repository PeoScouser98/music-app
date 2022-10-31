import instance from "../api/axios.config";
import { $ } from "../utils/common";
import albumCard from "../components/cards/album-card";
import trackCard from "../components/cards/track-card-v1";
import audioController from "../components/root/audio-controller";
import { getTracksCollection } from "../api/collection";
import { injectThemes } from "daisyui/src/colors/functions";

const artistPage = {
	async render(id) {
		const { artist, tracks, albums, followers } = await instance.get(`/artist/${id}`);
		artist.wallpaper = artist.wallpaper || "../../assets/img/default-artist-wallpaper.png";
		const tracksCollection = await getTracksCollection();
		tracks.forEach((track) => (track.isLiked = tracksCollection.tracks.find((item) => item._id === track._id) !== undefined));
		return /* html */ `
			<div class="flex flex-col gap-10 overflow-y-auto h-full scroll px-8 py-8 sm:px-4" id="page-content">
				<!-- banner -->
				<section class="w-full flex relative shadow-2xl rounded-2xl">
					<img class="w-full max-h-[28rem] object-cover object-center z-0 rounded-2xl" src="${artist.wallpaper}" alt="" />
					<div class="absolute bottom-0 left-0 p-5 w-full h-fit self-end flex items-center gap-5 bg-gradient-to-t from-zinc-900 to-transparent rounded-2xl">
						<img src="${artist.avatar}" class="max-w-full h-52 sm:h-32 rounded-full object-cover object-center" />
						<div>
							<h1 class="sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">${artist.name}</h1>
							<p class="text-white mb-5">${followers} followers</p>
							<p class="text-white text-xl sm:text-base">${artist.desc}</p>
						</div>
					</div>
				</section>
				<!-- end -->

				<div class="flex flex-col gap-20 py-10">
					<section>
						<h1 class="text-2xl font-semibold mb-3 text-white">Popular</h1>
						<div>${tracks.map((item, index) => trackCard.render(item, index)).join("")}</div>
					</section>

					<section>
						<h1 class="text-2xl font-semibold mb-3 text-white">Albums of ${artist.name}</h1>
						<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-x-5 gap-y-10">${albums.map((item) => albumCard.render(item)).join("")}</div>
					</section>
				</div>
			</div>
		`;
	},
	handleEvents() {
		audioController.start();

		trackCard.handleEvents();
	},
};

export default artistPage;
