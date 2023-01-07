import instance from "@/api/axios.config";
import genreCard from "@/components/cards/genre-card";

const genreSubPage = {
	async render() {
		const genres = await instance.get("/genre");
		return /* html */ `
		<div class="p-5">
			<h1 class="text-2xl font-medium text-base-content mb-6">Browse All</h1>
            <div class="grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4  xl:gap-12 xxl:grid-cols-5 xxl:gap-12 ">
                ${
									Array.isArray(genres) && genres.length != 0
										? genres.map((genre) => genreCard.render(genre)).join("")
										: ""
								}
            </div>
		</div>
        `;
	},
};
export default genreSubPage;
