import audioController from "../components/root/audio-controller";
import trackCard from "../components/cards/track-card";
import { $ } from "../utils/common";
import storage from "../utils/localstorage";

const nextUpPage = {
	async render() {
		const nextUp = storage.get("nextUp");
		const currentTrack = storage.get("nowPlaying");
		const inQueue = nextUp.filter((item) => item._id != currentTrack._id);
		console.log(inQueue);
		const inQueueHTML =
			Array.isArray(inQueue) && inQueue.length > 0
				? (await Promise.all(inQueue.map((item, index) => trackCard.render(item, index + 1)))).join("")
				: /* html */ `<div class="flex justify-center items-center h-[inherit]"></div>`;

		return /* html */ ` <div class="px-5 my-10">
			<!-- now playing -->
			<section>
				<h1 class="text-2xl font-semibold text-base-content mb-5 p-5">Now Playing</h1>
				<div id="now-playing">${await trackCard.render(currentTrack, 0)}</div>
			</section>

			<!-- in queue -->
			<section class="h-full">
				<h1 class="text-2xl font-semibold text-base-content mb-5 p-5">Next up</h1>
				<div id="queue">
					${inQueueHTML}
				</div>
			</section>
		</div>`;
	},

	handleEvents() {
		audioController.start();

		trackCard.handleEvents();
	},
};
export default nextUpPage;
