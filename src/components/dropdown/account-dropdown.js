import { getUser, logout } from "../../api/auth";
import storage from "../../utils/localstorage";
import { $ } from "../../utils/common";
import toast from "../notification/toast";
import store from "@/redux/store";
import { fetchUserThunkAction } from "@/redux/slices/user.slice";

export default function AccountDropdown() {
	const user = store.getState().user;

	store.subscribe(() => {
		$("#account-dropdown").innerHTML = AccountDropdown();
	});

	return /* html */ `
				<div class="dropdown dropdown-end">
					<div class="flex items-center gap-3 p-0 text-primary-content normal-case my-2" tabindex="0">
						<img src="https://placeimg.com/192/192/people" class="max-w-[3rem] h-full rounded-full" />
					</div>
					<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-300 text-base-content rounded-box w-fit">
						<li>
							<a href="/#/account">
								<span class="material-symbols-outlined">person</span>
								<div class="flex justify-between items-center gap-5">Account <span class="badge badge-primary badge-lg bg-primary border-primary text-base-content text-xs w-fit truncate">${user?.username}</span></div>
							</a>
						</li>
						<li id="logout__btn">
							<a><span class="material-symbols-outlined">logout</span> Log out </a>
						</li>
					</ul>
				</div>`;
}
