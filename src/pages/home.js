import asideMenu from "../components/menu-sidebar";
import audioController from "../components/audio-controller";
import header from "../components/header";
import trackCard from "../components/track-card";
import { getUser } from "../api/auth";

const homePage = {
	async render() {
		const tracks = await (await fetch("http://localhost:3001/api/track")).json();
		return /* html */ `
        	<div class="drawer drawer-mobile bg-zinc-800">
			<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content relative w-full max-h-screen overflow-y-auto px-5">
				<div class="flex flex-col justify-start w-full h-screen">
					<!-- header -->
					${await header.render()}
					<!-- audio control -->
					<div class="flex flex-col gap-5 h-full hidden-scroll">
						${trackCard.render(tracks)}
					</div>
					${audioController.render()}
				</div>
			</div>
            ${asideMenu.render()}
		</div>
        `;
	},
	async afterRender() {
		try {
			await header.afterRender();
			trackCard.afterRender();
			audioController.control();
		} catch (error) {
			console.log(error);
		}
	},
};
export default homePage;
