import { $ } from "./common";
import { toggleLoadingPageContent } from "./loading";

export const render = async (layout) => {
	const app = $("#app");
	if (app) app.innerHTML = await layout.render();
	if (layout.handleEvents) layout.handleEvents();
};

export const renderPageContent = async (page, id) => {
	const main = $("#main");
	// toggleLoadingPageContent("#main", false)
	if (main)
		main.innerHTML = await page.render(id);

	// toggleLoadingPageContent(true)
	if (page.handleEvents) page.handleEvents();
	const pageContent = $("#page-content");
	if (pageContent) pageContent.scrollIntoView();
};

export const reRenderContent = (selector, content) => {
	const contentContainer = $(selector)
	if (contentContainer)
		contentContainer.innerHTML = content;

};
