import { getUser, logout } from "../api/auth";
import { $ } from "../utils/common";

const dropdown = {
	async render() {
		const user = await getUser();
		return user.statusCode === 200
			? /* html */ `
        <div class="dropdown dropdown-end">
			<div class="avatar online" tabindex="0">
				<div class="w-12 rounded-full">
					<img src="https://placeimg.com/192/192/people" />
				</div>
			</div>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-zinc-700 text-zinc-400 rounded-box w-52">
                <li class="hover:text-white"><a href="/#/account">Account <span class="badge badge-primary badge-md text-xs">${user.username}</span></a></li>
                <li class="hover:text-white" id="logout__btn"><a>Log out</a></li>
            </ul>
        </div>
        `
			: /* html */ `
        <a href="/#/login" class="btn btn-ghost gap-2 hover:bg-zinc-400/20 rounded-full hover:btn-primary text-lg text-zinc-400 !font-normal normal-case">
            <i class="bi bi-power"></i> Login
        </a>
        `;
	},
	afterRender() {
		const logoutBtn = $("#logout__btn");
		if (logoutBtn) {
			logoutBtn.addEventListener("click", () => {
				logout();
			});
		}
	},
};
export default dropdown;
