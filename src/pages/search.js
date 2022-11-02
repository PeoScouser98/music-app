import { $, $$, debounce } from "../utils/common";
import { reRenderContent } from "../utils/handle-page";
import genreSubPage from "../pages/sub-pages/genre";
import instance from "../api/axios.config";
import searchResultSubpage from "./sub-pages/search-result";

const searchPage = {
	render() {
		return /* html */ `
			<div id="result"></div>
        `;
	},
	handleEvents() {
		const searchInput = $("#keyword");
		if (searchInput) {
			if (searchInput.value === "") {
				(async () => {
					reRenderContent("#result", await genreSubPage.render());
				})();
			}
			searchInput.oninput = debounce(async () => {
				if (searchInput.value === "") reRenderContent("#result", await genreSubPage.render());
				else {
					const data = await instance.post("/search", { keyword: searchInput.value });
					reRenderContent("#result", searchResultSubpage.render(data));
					searchResultSubpage.handleEvents(data);
				}
			}, 1000);
		}
	},
};
export default searchPage;
