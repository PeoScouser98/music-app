import { $ } from "../utils/common";
import toast from "./toast";
import { uploadTrack } from "../api/features";
import rules from "../utils/validate";
import instance from "../api/config";
import loadingScreen from "./loading-screen";
import { getUser } from "../api/auth";

const uploadForm = {
	async render() {
		const user = await getUser();
		return user != undefined
			? /* html */ `
            <input type="checkbox" id="upload-modal" class="modal-toggle" />
            <div class="modal w-[-webkit-fill-available]">
                <div class="modal-box relative bg-zinc-300">
                    <h3 class="text-xl font-medium text-center mb-10">Upload new track</h3>
                    <label for="upload-modal" class="btn btn-ghost btn-sm btn-circle absolute top-1 right-1">✕</label>
                    <form enctype="multipart/form-data" id="upload-form" class="relative flex flex-col gap-5">
                        <div class="flex flex-col gap-1 mb-5">
							<label>Track's name</label>
							<input type="text" name="track-name" data-name="Track's name" class="input input-bordered bg-transparent" placeholder="Track's name"/>
							<small class="error-message text-error font-medium"></small>
                        </div>
						<div class="flex flex-col gap-1 mb-5">
							<label>Artist</label>
							<select name="artist" id="artist" class="select select-bordered bg-transparent">
								<option>Select</option>
							</select>
						</div>
						<div class="flex flex-col gap-1 mb-5">
							<label>Genre</label>
							<select name="genre" id="genre" class="select select-bordered bg-transparent">
								<option>Select</option>
							</select>
						</div>
						<div class="flex flex-col gap-1 mb-5">
							<input type="file" name="file" data-name="File" class="file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:btn-primary file:text-white"/>
							<small class="error-message"></small>
						</div>
						<button type="submit" class="btn btn-primary">Upload</button>
                    </form>
                </div>
            </div>
        `
			: "";
	},
	afterRender() {
		(async () => {
			const artists = await instance.get("/artist");
			$("#artist").innerHTML +=
				artists
					.map((artist) => {
						return /* html */ `<option value=${artist._id}>${artist.name}</option>`;
					})
					.join("") + /* html */ `<option value="">Other</option>`;

			const genres = await instance.get("/genre");
			$("#genre").innerHTML +=
				genres
					.map((genre) => {
						return /* html */ `<option value=${genre._id}>${genre.name}</option>`;
					})
					.join("") + /* html */ `<option value="">Other</option>`;
		})();

		const uploadForm = $("#upload-form");
		if (uploadForm) {
			uploadForm.addEventListener("submit", async (event) => {
				try {
					event.preventDefault();
					const trackName = uploadForm["track-name"];
					const artist = uploadForm["artist"];
					const genre = uploadForm["genre"];
					const file = uploadForm["file"].files[0];

					if (rules.areRequired(trackName) === false) return;
					if (rules.isValidFile(file, rules.allowedAudioExt) === false) return;

					const formData = new FormData();
					formData.append("trackSrc", file);
					loadingScreen.show();
					const fileId = await uploadTrack(formData);
					if (fileId && typeof fileId === "string") {
						const uploadFile = await instance.post("/track", {
							name: trackName.value,
							artist: artist.value,
							genre: genre.value,
							fileId: fileId,
						});
						toast("success", "Upload file successfully!");
						loadingScreen.hidden();
						console.log(uploadFile);
					}
				} catch (error) {
					loadingScreen.hidden();
					const { response } = error;
					if (response && response.name === "TokenExpiredError") toast("error", "You haven't login yet!");
				}
			});
		}
	},
};
export default uploadForm;
