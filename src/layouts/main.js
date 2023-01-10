import header from "@/components/root/header";
import asideMenu from "@/components/root/menu-sidebar";
import createPlaylistModal from "@/components/modals/create-playlist-modal";
import uploadForm from "@/components/modals/upload-modal";
import audioController from "@/components/root/audio-controller";
import addPlaylistModal from "@/components/modals/add-playlist-modal";
import { getNowPlayingTrack } from "@/api/track";
import loginModal from "@/components/notification/require-login-modal";
import storage from "@/utils/localstorage";
import instance from "@/api/axios.config";

const mainLayout = {
	async render() {
		await uploadForm.defineProps();
		const playlists = await instance.get("/playlist");

		const _header = header.render();
		const _audioController = audioController.render();
		const _asideMenu = asideMenu.render(playlists);
		const _addPlaylistModal = addPlaylistModal.render(playlists);
		const _uploadForm = uploadForm.render();

		const [
			headerComponent,
			audioControllerComponent,
			sidebarComponent,
			addPlaylistModalComponent,
			uploadformComponent,
		] = await Promise.all([_header, _audioController, _asideMenu, _addPlaylistModal, _uploadForm]);
		return /* html */ `
        	<div class="drawer drawer-mobile ">
				<input id="sidebar-toggle" type="checkbox" class="drawer-toggle" />
				<div class="drawer-content relative w-full max-h-screen flex flex-col justify-between overflow-x-auto overflow-y-auto invisible-scroll" id="main-screen">
					<!-- header -->
					${headerComponent}
					<div class="flex flex-col justify-start w-full h-full gap-10 overflow-y-auto invisible-scroll bg-base-200" id="main">
						<!-- page content -->
					</div>
					<div id="audio-controller-container">${audioControllerComponent}</div>
				</div>
				<!-- Side bar-->
				${sidebarComponent}
			</div>
			<!-- toast notification here -->
			<div id="notification-container" class="fixed top-0 right-0 z-[9999] flex flex-col-reverse gap-1 p-4"></div>
			<!-- modals -->
			${addPlaylistModalComponent}
			${uploadformComponent}
			${createPlaylistModal.render()}
			${loginModal.render()}
			`;
	},
	async handleEvents() {
		header.handleEvents();
		asideMenu.handleEvents();
		createPlaylistModal.handleEvents();
		addPlaylistModal.handleEvents();
		uploadForm.handleEvents();
		audioController.start();

		const nextUp = storage.get("nextUp") ?? [];
		getNowPlayingTrack(nextUp);
	},
};

export default mainLayout;
