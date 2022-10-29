import { $ } from "../../utils/common";
import toast from "../notification/toast";
import { create } from "../../api/playlist";
import instance from "../../api/axios.config";
import storage from "../../utils/localstorage";

const createPlaylistModal = {
	render() {
		const auth = storage.get("auth")

		return auth != undefined
			? /* html */ `
					<input type="checkbox" id="toggle-create-playlist--modal" class="modal-toggle" />
					<div class="modal !z-30 w-[-webkit-fill-available]">
						<div class="modal-box relative bg-base-200 text-base-content">
							<h3 class="text-xl font-semibold text-center mb-10">Create new playlist</h3>
							<label for="toggle-create-playlist--modal" class="btn btn-ghost btn-sm btn-circle absolute top-1 right-1">✕</label>
							<form enctype="multipart/form-data" id="create-playlist__form" class="relative flex flex-col gap-5">
								<div class="flex flex-col gap-1">
									<label class="text-base font-medium after:[content:'*'] after:text-error after:mx-1 after:text-xl">Playlist's title</label>
									<input type="text" name="playlist-title" data-name="Track's name" class="input input-bordered bg-transparent" required />
									<small class="error-message text-error font-medium"></small>
								</div>
								<button type="submit" class="btn btn-primary self-end w-24 normal-case">Save</button>
							</form>
						</div>
					</div>
			  `
			: "";
	},
	handleEvents() {
		const createPlaylistForm = $("#create-playlist__form");
		if (createPlaylistForm)
			createPlaylistForm.addEventListener("submit", async (event) => {
				event.preventDefault();
				try {
					const playlistTitle = createPlaylistForm["playlist-title"];
					const newPlaylist = await create({ title: playlistTitle.value });
					if (newPlaylist) {
						const userPlaylist = await instance.get("/playlist");
						toast("success", "Created new playlist!");

						/* re-render playlist */
						$("#user-playlist").innerHTML = userPlaylist
							.map((list) => /* html */ `
								<li>
									<a href="/#/playlist/${list._id}">${list.title}</a>
								</li>
							`
							)
							.join("");

						$("#toggle-create-playlist--modal").checked = false;
					}
				} catch (error) {
					console.log(error);
				}
			});
	},
};
export default createPlaylistModal;
