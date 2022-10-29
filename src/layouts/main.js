import header from "../components/root/header";
import asideMenu from "../components/root/menu-sidebar";
import createPlaylistModal from "../components/modals/create-playlist-modal";
import uploadForm from "../components/modals/upload-modal";
import audioController from "../components/root/audio-controller";
import addPlaylistModal from "../components/modals/add-playlist-modal";
import { getNowPlayingTrack } from "../api/track";
import loginModal from "../components/notification/require-login-modal";

const mainLayout = {
	async render() {
		await uploadForm.defineProps();
		const _header = header.render()
		const _audioController = audioController.render()
		const _asideMenu = asideMenu.render()
		const _addPlaylistModal = addPlaylistModal.render()
		const _uploadForm = uploadForm.render()

		const [html_header,
			html_audioController,
			html_asideMenu,
			html_addPlaylistModal,
			html_uploadform] = await Promise.all(
				[
					_header,
					_audioController,
					_asideMenu,
					_addPlaylistModal,
					_uploadForm
				]
			)
		return /* html */ `
        	<div class="drawer drawer-mobile ">
				<input id="sidebar-toggle" type="checkbox" class="drawer-toggle" />
				<div class="drawer-content relative w-full max-h-screen flex flex-col justify-between overflow-x-auto overflow-y-auto invisible-scroll">
					<!-- header -->
					${html_header}
					<div class="flex flex-col justify-start w-full h-full gap-10 overflow-y-auto invisible-scroll" id="main">
						<!-- page content -->
					</div>
					<div id="audio-controller-container">${html_audioController}</div>
				</div>
				<!-- Side bar-->
				${html_asideMenu}
			</div>
			<!-- toast notification here -->
			<div id="notification-container" class="fixed top-0 right-0 z-[9999] flex flex-col-reverse gap-1 p-4">
			</div>
			<!-- modals -->
			${html_addPlaylistModal}
			${html_uploadform}
			${createPlaylistModal.render()}
			${loginModal.render()}
			`;
	},
	async handleEvents() {
		header.handleEvents();
		asideMenu.handleEvents()
		createPlaylistModal.handleEvents();
		uploadForm.handleEvents();
		audioController.start()
		getNowPlayingTrack();
	},
};

export default mainLayout;
