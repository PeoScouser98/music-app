import { $, $$ } from "../../utils/common";
import instance from "../../api/axios.config";
import { uploadTrack } from "../../api/track";
import toast from "../notification/toast";
import { RadioSelect, CheckboxSelect } from "../dropdown/custom-select";
import { toggleLoadingBtn } from "../loading/loading";
import storage from "../../utils/localstorage";

const uploadForm = {
	async defineProps() {
		const genres = await instance.get("/genre");
		this.radioSelect = new RadioSelect("genre", genres);
		const artists = await instance.get("/artist");
		this.checkboxSelect = new CheckboxSelect("artist", artists);
	},

	render() {
		const auth = storage.get("auth");
		return auth != null
			? /* html */ `
					<input type="checkbox" class="modal-toggle" id="upload-modal-toggle" />
					<div class="modal w-[-webkit-fill-available] !z-30">
						<div class="modal-box relative bg-base-200 text-base-content overflow-visible invisible-scroll">
							<h3 class="text-2xl font-medium text-center mb-10">Upload a track</h3>
							<label for="upload-modal-toggle" class="btn btn-ghost btn-sm btn-circle absolute top-1 right-1">✕</label>
							<form enctype="multipart/form-data" id="upload-form" class="relative flex flex-col gap-5">
								<div class="form-control gap-1">
									<label>Track's name</label>
									<input type="text" name="track-name" data-name="Track's name" class="input input-bordered bg-transparent" required />
									<small class="error-message text-error font-medium"></small>
								</div>

								<div class="form-control gap-1">
									<label>Artist</label>
									${this.checkboxSelect.render()}
								</div>

								<div class="form-control gap-1">
									<label>Genre</label>
									${this.radioSelect.render()}
								</div>

								<div class="form-control gap-1">
									<input
										type="file"
										name="file"
										data-name="File"
										id="file"
										class="file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:btn-accent"
									/>
									<small class="error-message"></small>
								</div>

								<button type="submit" class="btn btn-accent" id="upload-submit-btn">Upload</button>
							</form>
						</div>
					</div>
			  `
			: "";
	},

	reset() {
		const uploadForm = $("#upload-form");
		uploadForm.reset();
		this.radioSelect.reset();
		this.checkboxSelect.reset();
	},
	handleEvents() {
		this.radioSelect.onChange();
		this.checkboxSelect.onChange();

		const getDuration = async (file) => {
			const url = URL.createObjectURL(file);
			const audio = document.createElement("audio");
			audio.src = url; //--> blob URL
			audio.preload = "metadata";
			return new Promise((resolve) => {
				audio.addEventListener("loadedmetadata", () => {
					resolve(audio.duration);
				});
			});
		};

		const fileInput = $("#file");
		let trackDuration;
		if (fileInput)
			fileInput.onchange = async (event) => {
				const regex = /\.(mp3|flac|mpeg|ogg)$/g;
				const file = event.target.files[0];
				if (regex.test(file.name)) {
					trackDuration = await getDuration(file);
					console.log("Duration::::", trackDuration);
				}
			};

		const uploadForm = $("#upload-form");
		if (uploadForm) {
			uploadForm.addEventListener("submit", async (event) => {
				try {
					event.preventDefault();
					const trackName = uploadForm["track-name"];
					const file = uploadForm["file"].files[0];
					const formData = new FormData();
					formData.append("trackSrc", file);

					toggleLoadingBtn({
						selector: "#upload-submit-btn",
						isDone: false,
					});
					const fileId = await uploadTrack(formData);
					if (fileId) {
						const data = {
							title: trackName.value,
							artists: this.checkboxSelect.value,
							genre: this.radioSelect.value,
							fileId: fileId,
							duration: trackDuration,
						};

						const res = await instance.post("/track", data);
						this.reset();

						toast("success", "Upload file successfully!");
						console.log(res);

						toggleLoadingBtn({
							selector: "#upload-submit-btn",
							isDone: true,
						});
					}
				} catch (error) {
					console.log(error);
				}
			});
		}
	},
};
export default uploadForm;
