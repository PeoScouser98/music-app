import { $ } from "@/utils/common";
import accountDropdown from "../dropdown/account-dropdown";
import router from "@/main";
import store from "@/redux/store";
import { fetchUserThunkAction } from "@/redux/slices/user.slice";
import AccountDropdown from "../dropdown/account-dropdown";

export default function Header() {
	return /* html */ ` 
			<nav class="navbar justify-between items-center p-5 bg-base-200" id="header">
				<label for="sidebar-toggle" class="drawer-button sm:inline-flex md:inline-flex hidden btn btn-circle btn-ghost text-sm hover:bg-transparent text-base-content/50 hover:text-base-content">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="current" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</label>
				<div class="flex items-center gap-5">
					<div class="flex items-center gap-3 sm:hidden">
						<div class="tooltip tooltip-bottom" data-tip="Go back">
							<button class="text-base-content/50 hover:text-base-content text-2xl" onclick="history.go(-1)"><i class="bi bi-arrow-left-short"></i></button>
						</div>
						<div class="tooltip tooltip-bottom" data-tip="Go forward">
							<button class="text-base-content/50 hover:text-base-content text-2xl" onclick="history.go(1)"><i class="bi bi-arrow-right-short"></i></button>
						</div>	
					</div>
					<form action="" class="sm:hidden md:hidden">
						<div class="flex justify-start items-center px-3 py-1 border border-base-content/50 rounded-full text-base-content  w-[-webkit-fill-available] min-w-[24rem]">
							<label for=""><i class="bi bi-search"></i></label>
							<input type="text" class="input input-sm bg-transparent focus:outline-none w-[-webkit-fill-available] text-base-content" name="" id="keyword" placeholder="Find a track, artist, album . . ." />
							<button class="hidden" type="submit">search</button>
						</div>
					</form>
				</div>
				<div class="flex items-center gap-5" id="header-user-control">
					<div class="tooltip tooltip-bottom z-[100]" data-tip="Change theme">
						<label class="swap swap-rotate btn btn-circle">
							<input type="checkbox" id="swap-theme" />
							<i class="swap-off bi bi-moon"></i>
							<i class="bi bi-sun swap-on"></i>
						</label>
					</div>
					<div id="account-dropdown">
						${AccountDropdown()}
					</div>
				</div>
			</nav>`;

	// accountDropdown.handleEvents();

	// const swapTheme = $("#swap-theme");
	// if (swapTheme)
	// 	swapTheme.onchange = () => {
	// 		const document = $("html");
	// 		document.dataset.theme = swapTheme.checked ? "light" : "dark";
	// 	};

	// const keywordInput = $("#keyword");
	// if (keywordInput)
	// 	keywordInput.onfocus = () => {
	// 		router.navigate("/search");
	// 	};
}
