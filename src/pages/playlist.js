import * as Playlist from "../api/playlist";
import audioController from "../components/root/audio-controller";
import trackCard from "../components/cards/track-card-v1";
import header from "../components/root/header";
import storage from "../utils/localstorage";
import { getTracksCollection } from "../api/collection";
import { $ } from "../utils/common";

const playlistPage = {
	async render(id) {
		let playlist = !id ? await getTracksCollection() : await Playlist.getOne(id);
		const { tracks, creator } = playlist;
		if (Array.isArray(tracks)) tracks.forEach((track) => (track.isLiked = tracks.find((item) => item._id === track._id) !== undefined));
		return /* html */ `
        <div class="flex flex-col gap-10 overflow-y-auto h-full scroll px-8 py-8 sm:px-2" id="page-content">
				<!-- banner -->
				<section class="w-full flex relative shadow-2xl rounded-2xl">
					<div class="relative p-5 sm:p-3 sm:text-sm w-full h-fit self-end flex items-center gap-5 bg-gradient-to-r from-base-content/10 to-transparent rounded-2xl">
						<img src="${playlist?.image ?? "../../assets/img/default-thumbnail.png"}" class="max-w-full h-56 sm:h-32 rounded-xl object-cover object-center" />
						<div class="flex flex-col justify-center gap-3 sm:gap-2 text-base-content">
							<span>${creator?.role == 1 ? "Public playlist" : "Private playlist"}</span>
							<h1 class="sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-base-content mb-3">${playlist?.title}</h1>
							<span class="text-base-content text-xl sm:text-base">${tracks?.length} tracks</span>
							<span class="text-base-content/50">Created by <span class="font-medium text-base-content">${creator?.username ?? ""}</span></span>
						</div>
						<label class="swap swap-rotate absolute bottom-5 right-10 sm:right-3 btn btn-primary btn-circle text-2xl">
							<input type="checkbox"  id="toggle-play-playlist">
							<div class="swap-on"><i class="bi bi-play-fill"></i></div>
							<div class="swap-off"><i class="bi bi-pause-fill"></i></div>
						</label>
					</div>
				</section>
				<!-- end -->

				<div class="flex flex-col gap-20 py-10">
					<section>
						<div id="track-list">${Array.isArray(tracks) ? tracks.map((item, index) => trackCard.render(item, index)).join("") : ""}</div>
					</section>
				</div>
			</div>
`;
	},
	handleEvents() {
		header.handleEvents();
		trackCard.handleEvents();
		audioController.start();

		const togglePlayPlaylist = $("#toggle-play-playlist");
		if (togglePlayPlaylist) togglePlayPlaylist.onchange = () => {};
	},
};

export default playlistPage;
