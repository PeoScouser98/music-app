import { $ } from "../utils/common";
import { $$ } from "../utils/common";
const trackCard = {
	render(tracks) {
		return tracks
			.map((track) => {
				return /* html */ `
								<div class="flex justify-start items-center gap-5 w-full">
									<button class="btn btn-ghost text-zinc-400 hover:btn-primary btn-circle text-3xl play-track__btn"><i class="bi bi-play-fill"></i></button>
									<img src="../../assets/img/default-thumbnail.png" class="max-w-full h-24 rounded-lg object-cover object-center" />
									<input type="hidden" value="${track.trackSrc}"/>
									<div class="text-white">
										<h2 class="text-xl">${track.name}</h2>
										<p class="text-lg">${track.artist.name}</p>
									</div>
								</div>
							`;
			})
			.join("");
	},
	afterRender() {
		// const playTrackBtns = $$(".play-track__btn");
		// playTrackBtns.forEach((btn) => {
		// 	const audio = $("audio");
		// 	audio.src = btn.parentElement.querySelector("input").value;
		// });
	},
};
export default trackCard;
