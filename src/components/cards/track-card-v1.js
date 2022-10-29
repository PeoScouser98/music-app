import { $, $$ } from "../../utils/common";
import formatNumber from "../../utils/format-number";
import audioController from "../root/audio-controller";
import timer from "../../utils/timer";
import storage from "../../utils/localstorage";
// features
import * as Track from "../../api/track";
import trackCardDropdown from "../dropdown/track-card-dropdown";

const trackCard = {
	render(track, index) {
		if (track)
			track.thumbnail =
				track?.thumbnail ??
				track?.album?.image ??
				track?.artists[0]?.avatar
		else
			track.thumbnail = "../../assets/img/default-thumbnail.png"
		return /* html */` 
		<div class="track-card group" data-track="${track._id}">
			<div class="track-card-action">
				<div class="track-card-index group-hover:hidden">${index + 1}</div>
				<div class="sound-wave group-hover:hidden">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<label
					class="swap swap-rotate swap-btn hidden btn btn-ghost btn-circle text-xl sm:text-base sm:btn-sm sm:w-10 sm:h-10 sm:rounded-full hover:btn-primary sm:btn-ghost group-hover:inline-grid group-hover:items-center">
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
						${track.artists.map((artist) =>  /* html */ `
							<a href="/#/artist/${artist?._id}" class="track-artist font-[450]">${artist?.name}</a>`).join(", ")}
					</div>
				</div>
				<div><a href="/#/album/${track?.album?._id}" class="hover:link"> ${track?.album?.title ?? track?.album ?? ""}</a></div>
				<div>${formatNumber(track.listen)}</div>
				<div class="flex items-center gap-2"><i class="bi bi-clock"></i>${timer(track.duration)}</div>
			</div>
		
			<div class="track-card-dropdown">
				${trackCardDropdown.render(track)}
			</div>
		</div>`;
	},

	onDefault() {
		// reset all by default and just highlight the selected one
		$$(".sound-wave").forEach((sw) => sw.classList.add("hidden"));
		$$(".track-card-index").forEach((id) => id.classList.remove("hidden", "text-primary"));
		$$(".track-title").forEach((name) => name.classList.remove("text-primary"));
		$$(".swap-btn").forEach((item) => item.classList.add("hidden", "group-hover:inline-grid"));
		$$(".toggle-play").forEach(input => input.checked = false)
	},

	onSelected(trackElement) {
		// reset all by default

		this.onDefault();
		const trackIndex = trackElement.querySelector(".track-card-index");
		const trackTitle = trackElement.querySelector(".track-title");
		if (trackIndex && trackTitle) {
			trackIndex.classList.add("text-primary");
			trackTitle.classList.add("text-primary");
		}

	},

	onActive(trackElement) {
		const playBtn = trackElement.querySelector(".swap-btn");
		const soundWave = trackElement.querySelector(".sound-wave");
		const trackIndex = trackElement.querySelector(".track-card-index");
		const togglePlay = trackElement.querySelector(".toggle-play")
		if (soundWave && playBtn && trackIndex) {
			soundWave.classList.toggle("hidden");
			soundWave.classList.add("group-hover:hidden");
			playBtn.classList.toggle("hidden", "group-hover:inline-grid");
			trackIndex.classList.toggle("hidden");
			togglePlay.checked = true
		}
	},

	onChange() {
		// const trackCards = $$(".track-card");
		const audio = $("#audio-player");
		const selectedTrack = $(`[data-track = "${audio.dataset.current}"]`)
		if (selectedTrack) {
			this.onSelected(selectedTrack);
			if (!audio.paused) this.onActive(selectedTrack);
		} else this.onDefault()

	},

	handleEvents() {
		trackCardDropdown.handleEvents()
		/* ::::::::::::::: Highlight current track ::::::::::::::::  */
		this.onChange()

		/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
		/* ::::::::::::::::::::::: Play track ::::::::::::::::::::: */
		/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
		//#region 
		const audio = $("#audio-player");
		const playBtns = $$(".play-track-btn");
		const audioPlayerProgress = $("#audio-player-progress");
		const pauseTrackBtns = $$(".pause-track-btn");
		const { getCurrentDuration, play, pause, changeTrack } = audioController;
		if (playBtns && audio && audioPlayerProgress && pauseTrackBtns)
			playBtns.forEach((btn) => {
				btn.onclick = async () => {
					this.onChange();
					const track = btn.dataset.track != audio.dataset.current ?
						(await Track.getOne(btn.dataset.track)).track :
						storage.get("nowPlaying")
					if (track.comments)
						delete track.comments
					// if change to the other song -> reset range to default
					if (btn.dataset.track != audio.dataset.current) {
						const nextUp = storage.get("nextUp")
						const afterSelect = nextUp.filter((item) => item._id != track._id);

						// change index of song
						afterSelect.push(afterSelect.shift());
						afterSelect.unshift(track);

						// save next up list to storage after changing
						storage.set("nowPlaying", track);
						storage.set("nextUp", afterSelect);
						changeTrack(track);
					}
					else {
						// continue to play the song in current time
						getCurrentDuration(audio.currentTime);
						audioPlayerProgress.value = audio.currentTime;
						play()
					}
				}

				/* ::::::::::: Pause track ::::::::::: */
				pauseTrackBtns.forEach((btn) =>
					btn.onclick = () => {
						console.log(1);
						pause();
					}
				);
			});
		//#endregion
	},
};
export default trackCard;
