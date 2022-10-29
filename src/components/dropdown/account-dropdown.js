import { getUser, logout } from "../../api/auth"
import storage from "../../utils/localstorage"
import { $ } from "../../utils/common"
import toast from "../notification/toast";

const accountDropdown = {
	async render() {
		const user = await getUser()
		// const auth = storage.get("auth")
		return user != undefined
			? /* html */ `
						<div class="dropdown dropdown-end">
							<div class="flex items-center gap-3 p-0 text-primary-content normal-case my-2" tabindex="0">
								<img src="https://placeimg.com/192/192/people" class="max-w-[3rem] h-full rounded-full" />
							</div>
							<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-300 text-base-content rounded-box w-fit">
								<li class="hover:text-primary-content">
									<a href="/#/account">
										<span class="material-symbols-outlined">person</span>
										<div class="flex justify-between items-center">Account <span class="badge badge-primary badge-lg bg-primary border-primary text-base-content text-xs w-fit truncate">${user.username}</span></div>
									</a>
								</li>
								<li class="hover:text-primary-content" id="logout__btn">
									<a><span class="material-symbols-outlined">logout</span> Log out </a>
								</li>
							</ul>
						</div>`
			: /* html */ `
				<div class="tooltip tooltip-bottom" data-tip="Login">
					<a href="/#/login" class="btn btn-circle btn-primary">
						<span class="material-symbols-outlined">power_settings_new</span>
					</a>
				</div>
								`

	}, handleEvents() {
		if ($("#logout__btn"))
			$("#logout__btn").onclick = () => {
				logout();
				toast("success", "You've logged out!")
			};
	}
}
export default accountDropdown