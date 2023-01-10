import store from "@/redux/store";

export default function AudioRange() {
	let audioState = store.getState().audio;
	store.subscribe(() => {});
	return /* html */ `
        		<div class="flex justify-center items-center gap-3 min-w-full">
							<span id="current-time"></span>
							<div class="range-container self-center">
								<div class="range-progress" id="current-progress"></div>
								<input type="range" min="0" class="my-range w-[-webkit-fill-available]" value="0" step="0.001" id="audio-player-progress" onchange="" max=""  />
							</div>
							<span id="track-duration"></span>
						</div>
    `;
}
