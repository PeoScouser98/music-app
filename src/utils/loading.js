import { $ } from "./common";
import createElement from "./html-parser";

export const toggleLoadingBtn = ({ selector, isDone }) => {
	console.log(selector);
	const element = $(selector);
	if (element) {
		element.innerHTML = isDone ? element.innerText : /* html */ `<div class="loader-md"></div>`;
	}
};

export const toggleLoadingPageContent = (selector, isDone) => {
	const container = $(selector)
	if (container) {
		if (isDone == false)
			container.innerHTML = /* html */`<div class="w-full h-full flex justify-center items-center" id="content-loader"><div class="loader-lg"></div></div>`
		else {
			const loader = $("#content-loader")
			if (loader)
				loader.remove()
		}
	}
}