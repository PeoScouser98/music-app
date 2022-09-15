const asideMenu = {
	render() {
		return /* html */ `
			<div class="drawer-side">
				<label for="my-drawer-2" class="drawer-overlay"></label>
				<div class="menu scrollbar-hidden p-5 overflow-y-auto w-80 bg-zinc-900 text-zinc-400 text-lg relative">
					<!-- Sidebar content here -->
					<a href="/#/" class="text-left">
						<img src="./assets/img/logo.png" alt="" class="max-w-[16rem] object-center object-cover" />
					</a>
					<form action="" class="sm:block md:hidden lg:hidden xl:hidden mb-10">
						<div class="flex justify-start items-center px-5 border border-zinc-600 rounded-full ">
							<i class="bi bi-search"></i>
							<input type="text" class="input input-md bg-transparent text-white" name="" id="" placeholder="Find a track ..." />
							<button class="hidden" type="submit">search</button>
						</div>
					</form>
					<ul class="menu">
						<li>
							<a href="/#/home"><i class="bi bi-house"></i> Home</a>
						</li>
						<li>
							<a href="/#/trending"><i class="bi bi-graph-up-arrow"></i> Trending</a>
						</li>
						<li>
							<a href="/#/liked-track"><i class="bi bi-heart"></i> Liked tracks</a>
						</li>
						<li>
							<a href="/#/uploaded"><i class="bi bi-cloud-arrow-up"></i> Uploaded tracks</a>
						</li>
						<li>
							<a href="/#/fav-album"><i class="bi bi-music-note-list"></i> Favourite albums</a>
						</li>
						<li>
							<a href="/#/recent-listen"><i class="bi bi-clock-history"></i> Recent</a>
						</li>
						<div class="divider before:bg-zinc-500 after:bg-zinc-500"></div>
						<li>
							<span><i class="bi bi-plus-square-dotted"></i> Create playlist</span>
						</li>
					</ul>
				</div>
			</div>
        `;
	},
};
export default asideMenu;
