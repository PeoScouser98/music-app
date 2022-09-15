import uploadModal from "./upload-modal";
import dropdown from "./account-dropdown";
import toast from "./toast";
import { $ } from "../utils/common";
import { getUser } from "../api/auth";

const header = {
	async render() {
		return /* html */ `
        <nav class="navbar justify-between py-5" id="header">
			<label for="my-drawer-2" class="drawer-button sm:inline-flex md:inline-flex lg:hidden xl:hidden btn btn-circle text-xl btn-ghost hover:btn-primary text-white"><i class="bi bi-list"></i></label>
			<form action="" class="sm:hidden">
				<div class="flex justify-start items-center px-5 border border-zinc-600 rounded-full text-zinc-400">
					<i class="bi bi-search"></i>
					<input type="text" class="input input-md bg-transparent text-white" name="" id="" placeholder="Find a track ..." />
					<button class="hidden" type="submit">search</button>
				</div>
			</form>
			<div class="flex items-center gap-5" id="header__user-control">
				<label for="upload-modal" id="upload-btn" class="btn gap-2 btn-ghost rounded-full hover:bg-zinc-400/20 hover:btn-primary modal-button text-zinc-400 !font-normal normal-case text-lg"><i class="bi bi-cloud-upload"></i> Upload</label>
				${await dropdown.render()}
			</div>
		</nav>
        `;
	},
	async afterRender() {
		const user = await getUser();
		if (user) {
			$("#app").innerHTML += await uploadModal.render(user); // append upload modal
			dropdown.afterRender(); // logout
		}

		//without upload modal
		if (!$("#upload-form")) {
			const uploadBtn = $("#upload-btn");
			if (uploadBtn)
				uploadBtn.addEventListener("click", () => {
					toast("error", "You haven't login yet!");
				});
		} else await uploadModal.afterRender();
	},
};
export default header;
