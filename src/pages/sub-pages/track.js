import trackCard from "../../components/cards/track-card";
import { getByUploader } from "../../api/track";
import audioController from "../../components/root/audio-controller";

const tracksSubpage = {
	async render() {
		const tracks = await getByUploader(10);
		const html_tracks = await Promise.all(tracks.map((track, index) => trackCard.render(track, index)));
		return /* html */ `
            <div class="flex flex-col sm:gap-1">
                ${html_tracks.join("")}
            </div>
            <label class="swap hover:link w-full flex justify-center items-center my-10 font-medium">
                 <input type="checkbox" />
                <span class="swap-on">See less</span>
                <span class="swap-off">See more</span>
            </label>
        `;
	},
	handleEvents() {
		audioController.start();
		trackCard.handleEvents();
	},
};

export default tracksSubpage;
