import { getAlbumsCollection } from "../../api/collection";
import albumCard from "../../components/cards/album-card";

const albumSubPage = {
	async render() {
		const albumsCollection = await getAlbumsCollection();

		return /* html */ `
           <div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10 xxl:grid-cols-5 xxl:gap-12">
                ${albumsCollection
									.map((album) => {
										album.isLiked = true;
										return albumCard.render(album);
									})
									.join("")}
           </div> 
        `;
	},
	handleEvents() {
		albumCard.handleEvents();
	},
};

export default albumSubPage;
