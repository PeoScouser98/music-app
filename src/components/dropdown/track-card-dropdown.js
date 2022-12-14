import { getTracksCollection, updateTracksCollection } from "../../api/collection";
import * as Playlist from "../../api/playlist";
import * as Track from "../../api/track";
import router from "../../main";
import nextUpPage from "../../pages/nextup";
import { $, $$ } from "../../utils/common";
import { renderPageContent, reRenderContent } from "../../utils/handle-page";
import storage from "../../utils/localstorage";
import trackCard from "../cards/track-card";
import toast from "../notification/toast";

const trackCardDropdown = {
	render(track) {
		const auth = storage.get("auth");
		// toggle like
		const toggleLikeBtn = /* html */ `
        <li>
            <label class="swap place-content-start w-full">
                <input type="checkbox" class="dropdown-like-toggle" data-track="${track._id}" ${
			track.isLiked ? "checked" : ""
		}/>
                <span class="swap-on flex justify-start items-center gap-3"><span class="material-symbols-sharp md-20">favorite</span> Remove from library</span>
                <span class="swap-off flex justify-start items-center gap-3"><span class="material-symbols-outlined md-20">favorite</span> Save to library</span>
            </label>
        </li>`;

		// remove from playlist buttons
		const playlistId = router.current[0].url.includes("playlist") ? router.current[0].data.id : null;
		const removeFromPlaylistBtn =
			playlistId !== null
				? /* html */ `
							<li data-playlist="${playlistId}" data-track="${track._id}" class="remove-from-playlist--btn">
								<label><span class="material-symbols-outlined md-20">playlist_remove</span> Remove from Playlist</li></label>
							<li>`
				: "";

		// toggle add to next up
		const nextUp = storage.get("nextUp");
		let isExistedInQueue = nextUp.find((item) => item._id == track._id) !== undefined;
		const toggleAddNextUpBtn = /* html */ `
						<li >
                            <label class="swap place-content-start">
                                <input type="checkbox" class="toggle-add-nextup" 
										${isExistedInQueue ? "" : "checked"} 
										data-track="${track._id}">
                                <span class="swap-off flex items-center gap-3"><span class="material-symbols-outlined md-20">remove</span> Remove from Next up</span>
                                <span class="swap-on flex items-center gap-3"><span class="material-symbols-outlined md-20">queue_music</span> Add to Next up</span>
                            </label>
                        </li>`;

		// Add playlist button
		const addPlaylistLabels = /* html */ `
                        <li>
                            <label for="${
															auth != null ? "add-playlist--modal" : "require-login-modal"
														}" class="add-playlist-label" data-track="${track._id}">
                                <span class="material-symbols-outlined md-20">playlist_add</span> Add to Playlist
                            </label>
                        </li>`;

		return /* html */ `
            <div class="dropdown dropdown-end" >
					<label tabindex="0" class="btn btn-ghost btn-circle hover:bg-transparent group-hover:text-base-content"><i class="bi bi-three-dots"></i></label>
					<ul tabindex="0" class="dropdown-content menu bg-base-200 text-base-content/50 p-2 shadow rounded-xl w-64">
                        ${toggleLikeBtn}
						${addPlaylistLabels}
                        ${removeFromPlaylistBtn}
						${toggleAddNextUpBtn}
                        <li><a href="${track.downloadUrl}"><span class="material-symbols-outlined md-20">download</span> Download</a></li>
					</ul>
            </div>
    `;
	},
	handleEvents() {
		/* :::::::::: Toggle like/unlike track ::::::::: */
		//#region
		const likeToggleInput = $$(".dropdown-like-toggle");
		const audio = $("#audio-player");
		const toggleLike = $("#toggle-like");

		likeToggleInput.forEach(
			(toggle) =>
				(toggle.onchange = async () => {
					if (toggle) {
						if (toggle.dataset.track == audio.dataset.current) toggleLike.checked = !toggleLike.checked;

						if (toggle.checked === true) {
							await updateTracksCollection({ track: toggle.dataset.track });
							toast("success", "Added to your library!");
						} else {
							await updateTracksCollection({ track: toggle.dataset.track, action: "unfollow" });
							toast("info", "Removed from your library!");
						}

						const currentRouter = router.current[0];

						if (currentRouter.url.includes("liked-tracks")) {
							const { tracks } = getTracksCollection();
							const content = Array.isArray(tracks)
								? tracks.map((track, index) => trackCard.render(track, index)).join("")
								: "";
							reRenderContent("#track-list", content);
						}
					}
				}),
		);
		//#endregion

		/* ::::::::::::::: Add to next up :::::::::::::: */
		//#region
		const addNextupTogglers = $$(".toggle-add-nextup");
		addNextupTogglers.forEach((toggle) => {
			toggle.onchange = async () => {
				if (!toggle.checked) {
					const { track } = await Track.getOne(toggle.dataset.track);
					Track.addToNextUp(track);
					toast("success", "Added to Next up");
				} else {
					const nextUp = storage.get("nextUp");
					const afterRemove = nextUp.filter((item) => item._id != toggle.dataset.track);
					toast("info", "Removed from Next up!");
					localStorage.setItem("nextUp", JSON.stringify(afterRemove));
					if (location.href.includes("nextup")) renderPageContent(nextUpPage);
				}
			};
		});
		//#endregion

		/* ::::::::::::::::: Add to playlist :::::::::::::::::::: */
		//#region
		const addPlaylistLabel = $$(".add-playlist-label");
		const addPlaylistBtns = $$(".add-to-list--btn");
		addPlaylistLabel.forEach((label) => {
			if (label)
				label.onclick = () =>
					addPlaylistBtns.forEach((btn) => {
						btn.dataset.track = label.dataset.track;
					});
		});
		//#endregion

		/* ::::::::::::::: Remove from playlist ::::::::::::::::::: */
		const removeFromPlaylistBtns = $$(".remove-from-playlist--btn");
		removeFromPlaylistBtns.forEach((btn) => {
			if (btn)
				btn.onclick = async () => {
					try {
						const playlistId = btn.dataset.playlist;
						const track = { track: btn.dataset.track };
						const { tracks } = await Playlist.update(playlistId, track);
						toast("info", "Removed from playlist!");

						if (router.current[0].url.includes("playlist")) {
							const afterRemoved =
								Array.isArray(tracks) && tracks.length > 0
									? tracks.map((item, index) => trackCard.render(item, index)).join("")
									: "";
							console.log(afterRemoved);
							console.log("After removed", afterRemoved);
							reRenderContent("#track-list", afterRemoved);
						}
					} catch (error) {
						console.warn(error);
					}
				};
		});
	},
};
export default trackCardDropdown;
