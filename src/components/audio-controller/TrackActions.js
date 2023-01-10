import storage from "@/utils/localstorage";

export default function TrackActions() {
	const auth = storage.get("auth");

	return /* html */ `
        			<div class="flex justify-end items-baseline gap-5 order-2 xl:order-3 xxl:order-3 basis-1/4">
						<div class="flex justify-end items-center self-center gap-2 sm:hidden md:hidden" id="volume-controller">
							<label for="volume" class="text-xl" id="volume-btn"></label>
							<div class="range-container">
								<div class="range-progress" id="volume-range"></div>
								<input type="range" min="0" max="100" value=""  class="my-range w-[100px]" id="volume" />
							</div>
						</div>
						<label class="swap items-center" for="${!auth?.id ? "require-login-modal" : "toggle-like"}">
							<input type="checkbox" id="toggle-like" data-track=""/>
							<div class="swap-on" id="unlike-track-btn">
								<div class="tooltip z-[100]" data-tip="Unlike">
									<span class="material-symbols-sharp text-accent">favorite</span>
								</div>
							</div>
							<div class="swap-off" id="like-track-btn">
								<div class="tooltip z-[100]" data-tip="Like">
									<span class="material-symbols-outlined">favorite</span>
								</div>
							</div>
						</label>
						<div class="tooltip z-[100]" data-tip="Next up">
							<a href="/#/nextup" tabindex="0" class="inline-flex items-center align-middle"><span class="material-symbols-outlined">queue_music</span></a>
						</div>
					</div>
    `;
}
