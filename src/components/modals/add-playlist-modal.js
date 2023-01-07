import { $$ } from "@/utils/common";
import * as Playlist from "@/api/playlist";
import toast from "../notification/toast";

const addPlaylistModal = {
	async render(playlists) {
		return /* html */ `
        <input type="checkbox" id="add-playlist--modal" class="modal-toggle" />
        <label for="add-playlist--modal" class="modal cursor-pointer">
            <label class="modal-box relative !z-30 bg-base-200 text-base-content" id="add-playlist--modal" for="">
                <h3 class="text-2xl font-semibold text-center">Add to Playlist</h3>
                <div class="divider before:bg-zinc-500 after:bg-zinc-500"></div>
                <ul class="menu gap-1 scroll" id="user-playlist-items">
					${
						Array.isArray(playlists)
							? playlists
									.map(
										(list) => /* html */ `
										<li>
											<a class="inline-flex justify-between items-center h-fit rounded-lg">
												<span>${list.title}</span>
												<button class="add-to-list--btn btn btn-ghost hover:btn-accent btn-sm normal-case"
														data-playlist="${list._id}">
												Add</button>
											</a>
										</li>`,
									)
									.join("")
							: ""
					}
				</ul>
            </label>
        </label>
        `;
	},
	async handleEvents() {
		const addToPlaylistBtns = $$(".add-to-list--btn");
		addToPlaylistBtns.forEach((btn) => {
			if (btn)
				btn.onclick = async () => {
					const playlistId = btn.dataset.playlist;
					const { tracks } = await Playlist.getOne(playlistId);
					if (tracks.find((item) => item._id === btn.dataset.track) != undefined)
						toast("info", "Track already existed in playlist");
					else {
						const track = { track: btn.dataset.track };
						await Playlist.update(playlistId, track);
						toast("success", "Added to playlist!");
					}
				};
		});
	},
};

export default addPlaylistModal;
