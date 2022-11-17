import * as Playlist from "../api/playlist";
import audioController from "../components/root/audio-controller";
import trackCard from "../components/cards/track-card";
import header from "../components/root/header";
import storage from "../utils/localstorage";
import { getTracksCollection } from "../api/collection";
import { $ } from "../utils/common";
import editPlaylistModal from "../components/modals/edit-playlist-modal";
import playlistActionDropdown from "../components/dropdown/playlist-actions";
import router from "../main";

const playlistPage = {
	async render(id) {
		const playlist = !id ? await getTracksCollection() : await Playlist.getOne(id);
		const { tracks, creator } = playlist;
		if (Array.isArray(tracks))
			tracks.forEach((track) => (track.isLiked = tracks.find((item) => item._id === track._id) !== undefined));
		return /* html */ `
        <div class="flex flex-col gap-10 sm:gap-5 overflow-y-auto h-full scroll px-8 py-8 sm:px-2" id="page-content">
				<!-- banner -->
				<section class="w-full flex relative shadow-2xl rounded-2xl">
					<div class="relative p-5 sm:p-3 sm:text-sm w-full h-fit self-end flex items-center gap-5 bg-gradient-to-r from-base-content/10 to-transparent rounded-2xl">
						<img src="./img/default-thumbnail.png" class="max-w-full h-56 sm:h-32 rounded-xl object-cover object-center" />
						<div class="flex flex-col justify-center gap-3 sm:gap-2 text-base-content">
							<span>${creator?.role == 1 ? "Public playlist" : "Private playlist"}</span>
							<h1 class="sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-base-content mb-3" id="playlist-title">${
								playlist?.title
							}</h1>
							<span class="text-base-content text-xl sm:text-base">${tracks?.length} tracks</span>
							<span class="text-base-content/70">Created by <span class="font-medium text-base-content">${
								creator?.username ?? ""
							}</span></span>
						</div>
					</div>
				</section>
				<!-- end -->
				<section id="playlist-action" class="flex justify-between items-center p-5 rounded-box bg-base-300">
					<div class="flex items-center gap-5">
						<label class="swap swap-rotate btn btn-accent btn-circle text-2xl">
							<input type="checkbox"  id="toggle-play-playlist" data-playlist="${id ?? "tracks-collection"}">
							<div class="swap-off"><i class="bi bi-play-fill"></i></div>
							<div class="swap-on"><i class="bi bi-pause-fill"></i></div>
						</label>

						${!id ? "" : playlistActionDropdown.render(playlist)}
					</div>
					<div class="inline-flex items-center gap-3">
						<label class="text-lg select-none font-medium">Title</label>
						<label class="swap btn btn-outline hover:btn-accent text-3xl w-20">
							<input type="checkbox" name="" id="sort-track-title">
							<div class="swap-on"><i class="bi bi-sort-alpha-down"></i> </div>
							<div class="swap-off"><i class="bi bi-sort-alpha-down-alt"></i> </div>
						</label>
					</div>
				</section>

				<div class="flex flex-col gap-10 py-5">
					<section id="track-list">${
						Array.isArray(tracks) ? tracks.map((item, index) => trackCard.render(item, index)).join("") : ""
					}</section>
					<section id="recommended-track">
						<!--  -->
					</section>
				</div>
			</div>
			${editPlaylistModal.render(playlist)}
`;
	},
	handleEvents() {
		header.handleEvents();
		trackCard.handleEvents();
		audioController.start();
		editPlaylistModal.handleEvents();

		const togglePlayPlaylist = $("#toggle-play-playlist");
		if (togglePlayPlaylist) {
			const playlistId = togglePlayPlaylist.dataset.playlist;
			if (storage.get("nowPlayingPlaylist") === playlistId) togglePlayPlaylist.checked = !audioController.audio.paused;
			audioController.togglePlay.addEventListener("change", () => {
				if (storage.get("nowPlayingPlaylist") === playlistId)
					togglePlayPlaylist.checked = !audioController.audio.paused;
			});

			togglePlayPlaylist.onchange = async () => {
				try {
					const { tracks } = !router.current[0].url.includes("playlist")
						? await getTracksCollection()
						: await Playlist.getOne(router.current[0].data.id);

					// play playlist
					if (togglePlayPlaylist.checked) {
						if (playlistId !== storage.get("nowPlayingPlaylist")) audioController.changeTrack(tracks[0]);
						else audioController.play();

						// save state of playlist
						storage.set("nextUp", tracks);
						storage.set(
							"nowPlaying",
							tracks.find((item) => item._id === audioController.audio.dataset.current),
						);
						storage.set("nowPlayingPlaylist", playlistId);
					}
					// pause playlist
					else audioController.pause();
				} catch (error) {
					console.log(error);
				}
			};
		}
	},
};

export default playlistPage;
