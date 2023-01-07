import albumCard from "@/components/cards/album-card";
import artistCard from "@/components/cards/artist-card";
import playlistCard from "@/components/cards/playlist-card";
import trackCard from "@/components/cards/track-card";
import notFoundMessage from "@/components/notification/empty-message";
import { $$ } from "@/utils/common";
import { reRenderContent } from "@/utils/handle-page";
const searchResultSubpage = {
	render(data) {
		const { tracks, playlists, artists, albums } = data;
		const tracksResult =
			Array.isArray(tracks) && tracks.length > 0
				? /* html */ `
                    <div>
                        <h1 class="font-medium text-2xl text-base-content mb-5">Tracks</h1>
                        <div>
                            ${tracks.map((track, index) => trackCard.render(track, index)).join("")} 
                        </div>
                    </div>`
				: "";
		const playlistResult =
			Array.isArray(playlists) && playlists.length > 0
				? /* html */ `
                    <div>
                        <h1 class="font-medium text-2xl text-base-content mb-5">Playlists</h1>
                        <div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4  xl:gap-12 xxl:grid-cols-5 xxl:gap-12 ">
                            ${playlists.map((playlist) => playlistCard.render(playlist)).join("")} 
                        </div>
                    </div>`
				: "";
		const aritstResult =
			Array.isArray(artists) && artists.length > 0
				? /* html */ `
                    <div>
                        <h1 class="font-medium text-2xl text-base-content mb-5">Artists</h1>
                        <div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4  xl:gap-12 xxl:grid-cols-5 xxl:gap-12 ">
                            ${artists.map((artist) => artistCard.render(artist)).join("")} 
                        </div>
                    </div>`
				: "";
		const albumsResult =
			Array.isArray(albums) && albums.length > 0
				? /* html */ `
                    <div>
                        <h1 class="font-medium text-2xl text-base-content mb-5">Albums</h1>
                        <div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4  xl:gap-12 xxl:grid-cols-5 xxl:gap-12 ">
                            ${albums.map((album) => albumCard.render(album)).join("")} 
                        </div>
                    </div>`
				: "";
		let hasValidResult = tracks.length != 0 || artists.length != 0 || playlists.length != 0 || albums.length != 0;
		return hasValidResult
			? /* html */ `
            <div class="p-5 flex flex-col gap-10">
                <section class="mb-5">
                    <div class="tabs flex-grow max-w-3xl flex-nowrap sm:hidden">
                        <a class="tab tab-lifted search-filter-item text-base" data-filter="all">All</a> 
                        <a class="tab tab-lifted search-filter-item text-base" data-filter="tracks">Tracks</a> 
                        <a class="tab tab-lifted search-filter-item text-base" data-filter="artists">Artists</a>
                        <a class="tab tab-lifted search-filter-item text-base" data-filter="playlists">Playlists</a>
                        <a class="tab tab-lifted search-filter-item text-base" data-filter="albums">Albums</a>
                   </div>

                   <div class="hidden sm:block dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost hover:bg-transparent m-1"><i class="bi bi-three-dots"></i></label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li class="search-filter-item" data-filter="all"><a>Playlists</a></li>
                            <li class="search-filter-item" data-filter="tracks"><a>Followed Aritsts</a></li>
                            <li class="search-filter-item" data-filter="artists"><a>Favorite Albums</a></li>
                            <li class="search-filter-item" data-filter="playlists"><a>Uploaded</a></li>
                            <li class="search-filter-item" data-filter="albums"><a>Favorite Albums</a></li>
                        </ul>
                    </div>
                </section>
                <section id="typography" class="flex flex-col gap-10">
                    ${aritstResult}
                    ${tracksResult}
                    ${playlistResult}
                    ${albumsResult}
                </section>
            </div>
        `
			: notFoundMessage;
	},
	handleEvents(data) {
		trackCard.handleEvents();
		artistCard.handleEvents();
		playlistCard.handleEvents();
		albumCard.handleEvents();

		const { tracks, playlists, artists, albums } = data;

		const tabs = $$(".search-filter-item");

		tabs.forEach((tab, index) => {
			tab.classList.remove("tab-active");
			if (index == 0) tab.classList.add("tab-active");
			tab.onclick = async () => {
				tabs.forEach((tab) => tab.classList.remove("tab-active"));
				tab.classList.add("tab-active");
				switch (tab.dataset.filter) {
					case "all":
						reRenderContent("#result", this.render(data));
						this.handleEvents(data);

						break;
					case "playlists":
						const playlistResult =
							Array.isArray(playlists) && playlists.length > 0
								? /* html */ `
                                    <div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4  xl:gap-12 xxl:grid-cols-5 xxl:gap-12 ">
                                        ${playlists.map((playlist) => playlistCard.render(playlist)).join("")} 
                                    </div>`
								: notFoundMessage;
						reRenderContent("#typography", playlistResult);
						this.handleEvents();

						break;
					case "artists":
						const aritstResult =
							Array.isArray(artists) && artists.length > 0
								? /* html */ `
                                    <div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4  xl:gap-12 xxl:grid-cols-5 xxl:gap-12 ">
                                        ${artists.map((artist) => artistCard.render(artist)).join("")} 
                                    </div>`
								: notFoundMessage;
						reRenderContent("#typography", aritstResult);
						this.handleEvents();

						break;
					case "tracks":
						const tracksResult =
							Array.isArray(tracks) && tracks.length > 0
								? /* html */ `
                                        <div>
                                            ${tracks.map((track, index) => trackCard.render(track, index)).join("")} 
                                        </div>`
								: notFoundMessage;
						reRenderContent("#typography", tracksResult);
						this.handleEvents();

						break;
					case "albums":
						const albumsResult =
							Array.isArray(albums) && albums.length > 0
								? /* html */ `
                                    <div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4  xl:gap-12 xxl:grid-cols-5 xxl:gap-12 ">
                                        ${albums.map((album) => albumCard.render(album)).join("")} 
                                    </div>`
								: notFoundMessage;
						reRenderContent("#typography", albumsResult);
						this.handleEvents();
						break;
				}
			};
		});
	},
};
export default searchResultSubpage;
