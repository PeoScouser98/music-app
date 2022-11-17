import { getAll, update } from "../../api/playlist";
import { reRenderContent } from "../../utils/handle-page";
import storage from "../../utils/localstorage";
import toast from "../notification/toast";
import { $ } from "../../utils/common";

const editPlaylistModal = {
	render(playlist) {
		const auth = storage.get("auth");

		return auth != undefined
			? /* html */ `
					<input type="checkbox" id="edit-playlist-modal" class="modal-toggle" />
					<div class="modal !z-30 w-[-webkit-fill-available]">
						<div class="modal-box relative bg-base-200 text-base-content">
							<h3 class="text-xl font-semibold text-center mb-10">Rename playlist</h3>
							<label for="edit-playlist-modal" class="btn btn-ghost btn-sm btn-circle absolute top-1 right-1">✕</label>
							<form enctype="multipart/form-data" id="edit-playlist-form" class="relative flex flex-col gap-5" data-playlist="${playlist._id}">
								<div class="flex flex-col gap-1">
									<label class="text-base font-medium after:[content:'*'] after:text-error after:mx-1 after:text-xl">Playlist's title</label>
									<input type="text" name="title" data-name="Track's name" class="input input-bordered bg-transparent" value="${playlist.title}" required />
									<small class="error-message text-error font-medium"></small>
								</div>
								<button type="submit" class="btn btn-accent self-end w-24 normal-case">Save</button>
							</form>
						</div>
					</div>
			  `
			: "";
	},
	handleEvents() {
		const editPlaylistForm = $("#edit-playlist-form");
		if (editPlaylistForm)
			editPlaylistForm.onsubmit = async (event) => {
				event.preventDefault();
				console.log("aihihih");
				try {
					const playlistTitle = editPlaylistForm["title"];
					const playlistId = editPlaylistForm.dataset.playlist;
					const afterUpdated = await update(playlistId, { title: playlistTitle.value });
					console.log("after update :>> ", afterUpdated);
					reRenderContent("#playlist-title", afterUpdated.title);
					const userPlaylist = await getAll();
					reRenderContent(
						"#user-playlist",
						userPlaylist
							.map(
								(list) => `<li class="menu-item" id="${list._id}">
											<a href="/#/playlist/${list._id}">${list.title}</a>
										</li>`,
							)
							.join(""),
					);
					$("#edit-playlist-modal").checked = false;
					toast("success", "Renamed this playlist!");
				} catch (error) {
					console.warn(error.message);
				}
			};
	},
};
export default editPlaylistModal;
