import { itMatchesOne } from "daisyui/src/lib/postcss-prefixer/utils";
import instance from "../api/axios.config";
import audioController from "../components/root/audio-controller";
import trackCard from "../components/cards/track-card";
import { $ } from "../utils/common";
import { getAlbumsCollection, updateAlbumsCollection } from "../api/collection";
import toast from "../components/notification/toast";

const albumPage = {
	async render(id) {
		const { tracks, album } = await instance.get(`/album/${id}`);
		const albumsCollection = await getAlbumsCollection();
		let isLikedAlbum = albumsCollection.find((album) => album._id === id) !== undefined;
		return /* html */ `
        <div class="p-5 flex flex-col gap-10">
            <section class="flex justify-between p-10 bg-gradient-to-r from-white/20 to-transparent rounded-box shadow-2xl">
                <div class="flex items-center gap-5 text-white self-center">
                    <img src="${album.image}" alt="" class="max-w-[200px] h-[200px] object-cover object-center rounded-xl shadow-2xl">
                    <div class="flex flex-col gap-2 text-base-content">
                        <h1 class="text-6xl font-bold mb-3">${album.title}</h1>
                        <a href="/#/artist/${album.artist._id}" class="font-medium text-2xl hover:link">${album.artist.name}</a>
                        <span class="text-zinc-400 text-xl">${tracks.length} tracks</span>
                    </div>
                </div>
                <label class="self-end flex items-center gap-5">
                    <div class="tooltip " data-tip="Play this album">
                        <button class="btn btn-circle btn-primary text-2xl"><i class="bi bi-play-fill"></i></button>
                    </div>
                    <label class="swap btn btn-primary btn-circle text-xl">
                        <input type="checkbox" id="toggle-like-album" data-album="${album._id}" ${isLikedAlbum ? "checked" : ""}>
                        <div class="swap-off">
                            <div class="tooltip" data-tip="Like">
                                <i class="bi bi-suit-heart"></i>
                            </div>
                       </div>
                        <div class="swap-on">
                            <div class="tooltip" data-tip="UnLike">
                                <i class="bi bi-suit-heart-fill"></i>
                            </div>
                       </div>
                        
                    </label>
                </label>
            </section>

            <section>
                <div>
                ${Array.isArray(tracks) && tracks.length != 0 ? tracks.map((item, index) => trackCard.render(item, index)).join("") : ""}
                </div>
            </section>

        </div>
        `;
	},
	handleEvents() {
		trackCard.handleEvents();
		audioController.start();
		const toggleLikeAlbum = $("#toggle-like-album");
		if (toggleLikeAlbum)
			toggleLikeAlbum.onchange = async (e) => {
				await updateAlbumsCollection({ album: e.target.dataset.album });
				e.target.checked ? toast("success", "Added this album to your library!") : toast("info", "Removed this album from your library!");
			};
	},
};

export default albumPage;
