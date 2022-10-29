import { getUser } from "../../api/auth";
import instance from "../../api/axios.config";
import { getTracksCollection } from "../../api/collection";
import { getAll } from "../../api/playlist";
import { $, $$ } from "../../utils/common";
import storage from "../../utils/localstorage";
import createPlaylistModal from "../modals/create-playlist-modal";
import toast from "../notification/toast";

const asideMenu = {
	async render() {
		const auth = await getUser()
		const _userPlaylists = auth != undefined ? getAll() : new Promise(resolve => resolve([]));
		const _tracksCollection = auth != undefined ? getTracksCollection() : new Promise(resolve => resolve([]));
		const [userPlaylists, tracksCollection] = await Promise.all([_userPlaylists, _tracksCollection])
		return /* html */ `
			<aside class="drawer-side">
				<label for="sidebar-toggle" class="drawer-overlay"></label>
				<div class="menu invisible-scroll p-5 overflow-y-auto w-80 bg-base-300 text-base-content text-lg relative">
					<!-- Sidebar content here -->
					<a href="/#/" class="text-left">
						<img src="./assets/img/logo.png" alt="" class="max-w-[16rem] object-center object-cover -translate-x-4" />
					</a>
					<form action="" class="sm:block md:block lg:hidden xl:hidden mb-10">
						<div class="flex justify-start items-center px-5 border border-zinc-600 rounded-full ">
							<span class="material-symbols-outlined">search</span>
							<input type="text" class="input input-md bg-transparent text-base-100" name="" id="" placeholder="Find a track ..." />
							<button class="hidden" type="submit">search</button>
						</div>
					</form>
					<ul class="menu gap-1 text-base xxl:text-lg">
						<li class="menu-item">
							<a href="/#/home"><span class="material-symbols-outlined">home</span> Home</a>
						</li>
						<li class="menu-item">
							${auth != undefined ?
							/* html */ `<a href="/#/playlist/0"><span class="material-symbols-outlined">favorite</span>${tracksCollection.title}</a> ` :
							/* html */ `<label for="require-login-modal"><span class="material-symbols-outlined">favorite</span>Liked tracks</label>`
			}
							
						</li>
						<li class="menu-item">
							${auth != undefined ?
								/* html */ `<a href="/#/library" class="inline-grid grid-cols-[10%,90%]"><span class="material-symbols-outlined">library_music</span> Library</a>` :
								/* html */ `<label for="require-login-modal"><span class="material-symbols-outlined">library_music</span> Library</label>`
			}
							
						</li>
						<li class="menu-item">
							<label for="${auth != undefined ? "upload-modal-toggle" : "require-login-modal"}" class="inline-grid grid-cols-[10%,90%]" id="upload-btn">
								<span class="material-symbols-outlined">cloud_upload</span> Upload
							</label>
						</li>
						<li class="menu-item">
							<label for="${auth != undefined ? "toggle-create-playlist--modal" : "require-login-modal"}" class="modal-button inline-grid grid-cols-[10%,90%]" id="create-playlist__btn">
								<i class="bi bi-plus-lg"></i> Create playlist
							</label>
						</li>
						<div class="divider before:bg-zinc-500 after:bg-zinc-500"></div>
					</ul>
					<ul class="menu overflow-y-auto h-full scroll text-base xxl:text-lg" id="user-playlist">
						${userPlaylists
				.map((list) => {
					return /* html */ `
							<li class="menu-item">
								<a href="/#/playlist/${list._id}">${list.title}</a>
							</li>`;
				})
				.join("")}
					</ul>
				</div>
			</aside>
					`;
	},
	handleEvents() {
		const sidebar = $(".drawer-side")
		if (sidebar) {
			const linkItems = sidebar.querySelectorAll("a")
			const sidebarToggle = $("#sidebar-toggle")
			linkItems.forEach(item => item.onclick = () => {
				sidebarToggle.checked = false
			})
		}

		const menuItems = $$(".menu-item")
		menuItems.forEach(item => item.onclick = () => {
			menuItems.forEach(item => item.classList.remove("menu-item-active"))
			item.classList.add("menu-item-active")
		})


	}
};
export default asideMenu;
