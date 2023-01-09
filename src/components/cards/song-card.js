// import trackCardDropdown from "../dropdown/track-card-dropdown";

import storage from "@/utils/localstorage";

export default function SongCard(track, index) {
	track.thumbnail = track.album?.image ?? track.artists[0]?.avatar ?? "../../assets/img/default-thumbnail.png";
	const nowPlaying = storage.get("nowPlaying");
	const iPlayingTrack = nowPlaying._id === track._id;
	return /* html */ ` 
		<div class="track-card group" data-track="${track._id}">
			<div class="track-card-action">
				<div class="track-card-index group-hover:hidden">${index + 1}</div>
				<div class="sound-wave group-hover:hidden ">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<label
					class="swap swap-rotate swap-btn hidden btn btn-ghost btn-circle text-xl sm:text-base sm:btn-sm sm:w-10 sm:h-10 sm:rounded-full hover:btn-accent sm:btn-ghost group-hover:inline-grid group-hover:items-center">
					<input type="checkbox" class="toggle-play" />
						<div class="swap-on play-track-btn" data-track="${track._id}">
							<i class="bi bi-pause-fill"></i>
						</div>
						<div class="swap-off pause-track-btn">
							<i class="bi bi-play-fill swap-off"></i>
						</div>
				
				</label>
			</div>
		
			<div class="track-card-body">
				<div>
					<img src="${track.thumbnail}" class="sm:max-w-[40px] " />
					<div>
						<h4 class="track-title sm:max-w-[180px] w-full">${track.title}</h4>
						${track.artists
							.map(
								(artist) => /* html */ `
							<a href="/#/artist/${artist?._id}" class="track-artist font-[450]">${artist?.name}</a>`,
							)
							.join(", ")}
					</div>
				</div>
				<div><a href="/#/album/${track?.album?._id}" class="hover:link"> ${track?.album?.title ?? track?.album ?? ""}</a></div>
				<div>${formatNumber(track.listen)}</div>
				<div class="flex items-center gap-2"><i class="bi bi-clock"></i>${timer(track.duration)}</div>
			</div>
		
			<!-- <div class="track-card-dropdown">
				${trackCardDropdown.render(track)}
			</div> -->
		</div>`;
}
