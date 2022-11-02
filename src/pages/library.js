import { $$ } from "../utils/common";
import { reRenderContent } from "../utils/handle-page";
// import { toggleLoadingPageContent } from "../utils/loading";
import playlistSubPage from "./sub-pages/playlist";
import tracksSubpage from "./sub-pages/track";
import artistSubPage from "./sub-pages/artist";
import artistCard from "../components/cards/artist-card";
import albumSubPage from "./sub-pages/album";
import { getArtistsCollection } from "../api/collection";
// import
const libraryPage = {
	render() {
		return /* html */ `
        <div class="h-full my-10 px-5 sm:px-3" id="page-content">
            <section class="flex justify-between items-center gap-10 flex-wrap mb-16 bg-base-200 rounded-lg px-3 sm:flex-row-reverse">
                <div class="tabs flex-grow max-w-2xl sm:hidden">
                    <a class="tab tab-bordered library-menu-item text-base" data-subpage="playlist">Playlists</a> 
                    <a class="tab tab-bordered library-menu-item text-base" data-subpage="artist">Followed Aritsts</a> 
                    <a class="tab tab-bordered library-menu-item text-base" data-subpage="upload">Uploaded</a>
                    <a class="tab tab-bordered library-menu-item text-base" data-subpage="album">Favorite Albums</a>
                </div>
            <div class="hidden sm:block dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost hover:bg-transparent m-1"><i class="bi bi-three-dots"></i></label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li class="library-menu-item" data-subpage="playlist"><a>Playlists</a></li>
                    <li class="library-menu-item" data-subpage="artist"><a>Followed Aritsts</a></li>
                    <li class="library-menu-item" data-subpage="upload"><a>Uploaded</a></li>
                    <li class="library-menu-item" data-subpage="album"><a>Favorite Albums</a></li>
                </ul>
            </div>
                <div class="flex items-center gap-3">
                    <label for="sort" class="inline-flex items-center gap-1 text-base-content/70"><i class="bi bi-funnel"></i> Filter</label>
                    <select name="" id="sort" class="select select-sm select-bordered">
                        <option value="">Recently Added</option>
                        <option value="">Alphabetical</option>
                    </select>
                </div>
            </section>
            <section id="sub-page-content" class="h-full px-5 sm:px-3">
                <!-- sub-page content here -->
            </section>
        </div>
        `;
	},
	handleEvents() {
		(async () => {
			reRenderContent("#sub-page-content", await playlistSubPage.render());
		})();

		const tabs = $$(".library-menu-item");
		tabs.forEach((tab, index) => {
			tab.classList.remove("tab-active");
			if (index == 0) tab.classList.add("tab-active");
			tab.onclick = async (e) => {
				tabs.forEach((tab) => tab.classList.remove("tab-active"));
				e.target.classList.add("tab-active");
				switch (tab.dataset.subpage) {
					case "playlist":
						reRenderContent("#sub-page-content", await playlistSubPage.render());
						break;
					case "artist":
						const followedArtists = await getArtistsCollection();
						reRenderContent("#sub-page-content", await artistSubPage.render(followedArtists));
						artistSubPage.handleEvents();
						break;
					case "upload":
						const uploadedTrack = await reRenderContent("#sub-page-content", await tracksSubpage.render());
						tracksSubpage.handleEvents();
						break;
					case "album":
						reRenderContent("#sub-page-content", await albumSubPage.render());
						albumSubPage.handleEvents();
						break;
				}
			};
		});
	},
};
export default libraryPage;
