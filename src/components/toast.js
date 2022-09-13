import { $ } from "../utils/common";

const alert = {
	success: {
		style: "alert-success",
		icon: "bi bi-check-circle",
	},
	error: {
		style: "alert-error",
		icon: "bi bi-x-lg",
	},
	info: {
		style: "alert-info",
		icon: "bi bi-info-circle",
	},
	warning: {
		style: "alert-warning",
		icon: "bi bi-exclamation-triangle",
	},
};

const toast = (status, message) => {
	/* Create notification */
	const { style, icon } = alert[status];
	const toastNotification = document.createElement("div");
	toastNotification.classList.add("toast", "toast-top", "toast-end", "animate-fadeInOut");
	toastNotification.innerHTML = /* html */ `
					<div class="alert text-white ${style}">
						<div>
							<i class="${icon}"></i>
							<span>${message}</span>
						</div>
					</div>
				`;

	/* Toggle message */
	document.body.appendChild(toastNotification);
	setTimeout(() => {
		document.body.removeChild(toastNotification);
	}, 1500);
};

export default toast;
