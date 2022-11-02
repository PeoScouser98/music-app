import generateRandomColor from "../../utils/random-color";

const genreCard = {
	render(genre) {
		let color = generateRandomColor();
		return /* html */ `
            <div class="bg-base-200 glass max-w-[300px] h-fit rounded-box shadow-lg flex flex-col gap-8 p-5">
                <a href="/#/genre/${genre._id}" class="text-2xl font-medium text-base-content truncate hover:link">${genre.name}</a>
                <i class="bi bi-vinyl-fill text-transparent bg-clip-text bg-gradient-to-tr from-zinc-900 via-zinc-700 to-zinc-900 text-8xl"></i>
            </div>
        `;
	},
};
export default genreCard;
