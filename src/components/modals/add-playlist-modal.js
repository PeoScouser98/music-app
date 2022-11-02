import instance from "../../api/axios.config";
import { $ } from "../../utils/common";
import storage from "../../utils/localstorage";

const addPlaylistModal = {
	async render() {
		const userPlaylists = await instance.get("/playlist");
		return /* html */ `
        <input type="checkbox" id="add-playlist--modal" class="modal-toggle" />
        <label for="add-playlist--modal" class="modal cursor-pointer">
            <label class="modal-box relative !z-30 bg-base-200 text-base-content" id="add-playlist--modal" for="">
                <h3 class="text-2xl font-semibold text-center">Add to Playlist</h3>
                <div class="divider before:bg-zinc-500 after:bg-zinc-500"></div>
                <ul class="menu gap-1 scroll" id="user-playlist-items">
				${
					Array.isArray(userPlaylists)
						? userPlaylists
								.map((list) => {
									if (list.title !== "Liked Tracks")
										return /* html */ `
								<li >
									<a class="inline-flex justify-between items-center h-fit rounded-lg">
										<span>${list.title}</span>
										<button class="add-to-list--btn btn btn-ghost hover:btn-accent btn-sm normal-case" data-playlist="${list._id}">Add</button>
									</a>
								</li>`;
								})
								.join("")
						: ""
				}
				</ul>
            </label>
        </label>
        `;
	},
	async handleEvents() {
		const auth = storage.get("auth");
		if (auth != null) {
			$("#app").innerHTML += addPlaylistModal.render();
			const userPlaylist = await instance.get("/playlist");
			$("#user-playlist-items").innerHTML = userPlaylist
				.map((playlist) => {
					return /* html */ `<li><a>${playlist.title}</a></li>`;
				})
				.join("");
		}
	},
};

export default addPlaylistModal;
