import { $ } from "../../utils/common";
import createElement from "../../utils/html-parser";

const toast = (status, message) => {
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
	/* Create notification */
	const { style, icon } = alert[status];
	const toastNotification = createElement(`
		<div class="toast toast-top toast-end animate-fadeInOut z-[9999] relative !m-0 !p-0">
			<div class="alert text-zinc-800 ${style}">
				<div>
					<i class="${icon}"></i>
					<span>${message}</span>
				</div>
			</div>
		</div>
	`
	);
	/* Toggle message */
	const notificationContainer = $("#notification-container");
	if (notificationContainer && toastNotification) {
		notificationContainer.appendChild(toastNotification);
		setTimeout(() => {
			notificationContainer.removeChild(toastNotification);
		}, 2000);
	}
};

export default toast;
