import instance from "@/api/axios.config";
import { getNowPlayingTrack } from "@/api/track";
import AudioController from "@/components/audio-controller";
import createPlaylistModal from "@/components/modals/create-playlist-modal";
import uploadForm from "@/components/modals/upload-modal";
import loginModal from "@/components/notification/require-login-modal";
import Header from "@/components/root/Header";
import Sidebar from "@/components/root/Sidebar";
import storage from "@/utils/localstorage";

export default function Layout() {
	return /* html */ `
        	<div class="drawer drawer-mobile ">
				<input id="sidebar-toggle" type="checkbox" class="drawer-toggle" />
				<div class="drawer-content relative w-full max-h-screen flex flex-col justify-between overflow-x-auto overflow-y-auto invisible-scroll">
					<!-- header -->
					${Header()}
					<div class="flex flex-col justify-start w-full h-full gap-10 overflow-y-auto invisible-scroll bg-base-200" id="main">
						<!-- page content -->
					</div>
					<div id="audio-controller-container">${AudioController()}</div>
				</div>
				<!-- Side bar-->
				${Sidebar()}
			</div>
			<!-- toast notification here -->
			<div id="notification-container" class="fixed top-0 right-0 z-[9999] flex flex-col-reverse gap-1 p-4"></div>
			<!-- modals -->
			
			${createPlaylistModal.render()}
			${loginModal.render()}
			`;
}
