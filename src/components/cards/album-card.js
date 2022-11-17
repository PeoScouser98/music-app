import storage from "../../utils/localstorage";
import { $$ } from "../../utils/common";
import { updateAlbumsCollection } from "../../api/collection";
import toast from "../notification/toast";
import { reRenderContent } from "../../utils/handle-page";
import albumSubPage from "../../pages/sub-pages/album";
const albumCard = {
	render(album) {
		const auth = storage.get("auth");
		return /* html */ `
         <div class="bg-base-200 hover:bg-base-300 duration-300 rounded-box shadow-lg p-5 sm:p-3 flex flex-col gap-3 w-fit relative">
            <div class="max-w-full group">
               <div class="max-w-full max-h-[224px] mask-square mx-auto relative">
                  <a href="/#/album/${album._id}">
                     <img src="${
												album.image
											}" alt="" class="max-w-full w-full h-full mx-auto object-cover object-center group-hover:cursor-pointer">
                  </a>
                  <label class="swap swap-rotate absolute bottom-1 right-1 btn btn-circle btn-accent text-xl opacity-0 duration-500 group-hover:opacity-100">
                     <input type="checkbox" data-playlist="${album._id}">
                     <div class="swap-off"><i class="bi bi-play-fill"></i></div>
                     <div class="swap-on"><i class="bi bi-pause-fill"></i></div>
                  </label>
               </div>
            </div>
         
            <div class="flex flex-col gap-3 group">
               <a href="/#/album/${
									album._id
								}" class="text-base truncate font-medium hover:link text-base-content sm:text-base">${album.title}</a>
               <a href="/#/artist/${album.artist._id}" class="text-sm-content/75 hover:link sm:text-sm">${
			album.artist.name
		}</a>
               <label class="swap btn btn-ghost hover:bg-transparent text-base-content text-base absolute bottom-3 sm:bottom-0 right-0 opacity-0 group-hover:opacity-100 group-hover:duration-300"
                     ${!auth?.id ? 'for="require-login-modal"' : ""}
               >
                  <input type="checkbox" class="toggle-like-album" ${album.isLiked ? "checked" : ""} data-album="${
			album?._id
		}">
                  <div class="swap-on tooltip z-[100]" data-tip="Unlike album">
                     <span class="material-symbols-sharp text-accent">favorite</span>
                  </div>
                  <div class="swap-off">
                     <div class="tooltip z-[100]" data-tip="Like album">
                        <span class="material-symbols-outlined">favorite</span>
                     </div>
                  </div>
               </label>
            </div>
         </div>
      `;
	},
	handleEvents() {
		const likeAlbumTogglers = $$(".toggle-like-album");
		likeAlbumTogglers.forEach((toggle) => {
			if (toggle)
				toggle.onchange = async () => {
					const albumId = toggle.dataset.album;
					await updateAlbumsCollection({ album: albumId });
					toggle.checked
						? toast("success", "Add album to your library!")
						: toast("info", "Removed album from your library");
					if (location.href.includes("library")) reRenderContent("#sub-page-content", await albumSubPage.render());
				};
		});

		// const playAlbumBtns = $$(".");
	},
};

export default albumCard;
