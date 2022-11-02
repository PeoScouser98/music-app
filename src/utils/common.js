export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const debounce = (callback, timeout) => {
	timeout = timeout || 0;
	let timerId;
	return () => {
		if (timerId) {
			clearTimeout(timerId);
			timerId = null;
		}
		timerId = setTimeout(() => {
			callback();
		}, timeout);
	};
};
