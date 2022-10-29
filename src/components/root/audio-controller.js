import { $, $$ } from "../../utils/common";
import timer from "../../utils/timer";
import { renderPageContent, reRenderContent } from "../../utils/handle-page";
import nextUpPage from "../../pages/nextup";
import storage from "../../utils/localstorage";
import trackCard from "../cards/track-card-v1";
import * as Playlist from "../../api/playlist"
import toast from "../notification/toast";
import router from "../../main";
import playlistPage from "../../pages/playlist";
import { getTracksCollection, updateTracksCollection } from "../../api/collection";

const audioController = {

	render(track) {
		const audio = $("#audio-player")
		audio.src = track?.trackSrc;
		audio.dataset.current = track?._id;

		let isExistedInList = false
		const auth = storage.get("auth")
		if (auth?.id && track?.followers) {
			console.log(track.followers);
			isExistedInList = track.followers.find(flw => flw == auth.id) !== undefined
		}
		return /* html */ `
				<div class="w-full text-base-content flex flex-wrap xl:flex-nowrap xxl:flex-nowrap justify-between items-center xl:items-start xxl:items-start flex-grow gap-5  p-5 bg-base-200"
				style="box-shadow: 0 25px 50px 12px rgba(0,0,0,0.5)">
					<!-- track infor -->
					<div class="flex justify-start items-center gap-3 order-1 basis-1/4 sm:basis-1/2 md:basis-1/2">
						<img src="${track?.thumbnail}" class="max-w-full h-16 sm:h-12 rounded-lg" />
						<div class="max-w-full overflow-hidden flex flex-col gap-1">
							<a href="/#/track/${track?._id}" class="text-base font-semibold w-full truncate hover:link" id="playing-track__name">${track?.title}</a>
							${track?.artists?.map((artist) =>/* html */ `<a href="/#/artist/${artist._id}" class="text-base-content" >${artist?.name}</a>`).join(", ")}
						</div>
					</div>
						
			
					<!-- audio control -->

					<div class="flex flex-col justify-center items-center gap-5 relative order-3 xl:order-2 xxl:order-2 basis-full xl:basis-1/2 xxl:basis-1/2 ">
						<!-- audio progress -->
						<div class="flex justify-center items-center gap-3 min-w-full">
							<span id="current-time">${timer(audio.currentTime)}</span>
							<div class="range-container self-center">
								<div class="range-progress" id="current-progress"></div>
								<input type="range" min="0" class="my-range w-[-webkit-fill-available]" value="0" step="0.001" id="audio-player-progress" max="${track?.duration}"  />
							</div>
							<span id="track-duration">${!isNaN(track?.duration) ? timer(track?.duration) : timer(0)}</span>
						</div>
						<div class="flex justify-between item-center">
							<div class="flex justify-center items-center gap-2 text-base-content">
								<!-- toggle shuffle play -->
								<label class="swap text-base-content/50 hover:text-base-content">
									<input type="checkbox" id="shuffle-toggle" ${this.isShuffle ? "checked" : ""}>
									<div class="swap-on text-2xl text-primary"><i class="bi bi-shuffle text-xl "></i></div>
									<div class="swap-off text-2xl hover:text-primary-content"><i class="bi bi-shuffle text-xl "></i></div>
								</label>
								<!-- previous -->
								<button class="btn btn-ghost btn-circle hover:bg-transparent text-2xl text-base-content/50 hover:text-base-content change-track-btn" id="prev-btn" data-value="-1">
									<i class="bi bi-skip-backward-fill"></i>
								</button>
								<!-- toggle play -->
								<label class="swap swap-rotate group">
									<input type="checkbox" id="toggle-play" ${audio.paused ? "" : "checked"}/>
									<div class="swap-off bg-transparent text-4xl text-base-content group-hover:text-primary" id="play-btn">
										<i class="bi bi-play-circle"></i>
									</div>
									<div class="swap-on bg-transparent text-4xl text-base-content group-hover:text-primary" id="pause-btn">
										<i class="bi bi-pause-circle"></i>
									</div>
								</label>
								<!-- next button -->
								<button class="btn btn-ghost btn-circle hover:bg-transparent text-2xl text-base-content/50 hover:text-base-content change-track-btn" id="next-btn" data-value="1">
									<i class="bi bi-skip-forward-fill"></i>
								</button>
								<!-- toggle loop -->
								<label class="swap text-base-content/50 hover:text-base-content">
									<input type="checkbox" id="loop-toggle" ${this.isLoop ? "checked" : ""}/>
									<div class="swap-on text-2xl text-primary"><i class="swap-off bi bi-repeat-1"></i></div>
									<div class="swap-off text-2xl hover:text-primary-content"><i class="swap-off bi bi-repeat"></i></div>
								</label>
							</div>
						</div>
					</div>

					<!-- track actions -->
					<div class="flex justify-end items-baseline gap-5 order-2 xl:order-3 xxl:order-3 basis-1/4">
						<div class="flex justify-end items-center self-center gap-2 sm:hidden md:hidden" id="volume-controller">
							<label for="volume" class="text-xl" id="volume-btn"></label>
							<div class="range-container">
								<div class="range-progress" id="volume-range"></div>
								<input type="range" min="0" max="100" value="${this.prevVolume}"  class="my-range w-[100px]" id="volume" />
							</div>
						</div>
						<label class="swap items-center">
							<input type="checkbox" id="toggle-like" ${isExistedInList ? "checked" : ""}  data-track="${track?._id}"/>
							<div class="swap-on" id="unlike-track-btn">
								<div class="tooltip z-[100]" data-tip="Unlike">
									<span class="material-symbols-sharp text-primary">favorite</span>
								</div>
							</div>
							<div class="swap-off" id="like-track-btn">
								<div class="tooltip z-[100]" data-tip="Like">
									<span class="material-symbols-outlined">favorite</span>
								</div>
							</div>
						</label>
						<div class="tooltip z-[100]" data-tip="Next up">
							<a href="/#/nextup" tabindex="0" class="inline-flex items-center align-middle"><span class="material-symbols-outlined">queue_music</span></a>
						</div>
					</div>
				</div>
`;
	},

	defineProps() {
		/* DOM Elements */
		this.audio = $("#audio-player");
		this.audioProgress = $("#audio-player-progress");
		this.currentProgress = $("#current-progress");
		this.currentTime = $("#current-time");

		/* Volume */
		this.audioVolume = $("#volume");
		this.volumeBtn = $("#volume-btn");
		this.volumeRange = $("#volume-range");

		/* Buttons */
		this.changeTrackBtns = $$(".change-track-btn");
		this.playBtn = $("#play-btn");
		this.pauseBtn = $("#pause-btn");
		this.loopToggle = $("#loop-toggle");
		this.togglePlay = $("#toggle-play");
		this.shuffleToggle = $("#shuffle-toggle")
		this.toggleLike = $("#toggle-like")
		this.mb_toggleLike = $("#toggle-like-mb")
		this.likeTrackBtn = $("#like-track-btn")
		this.unLikeTrackBtn = $("#unlike-track-btn")


		this.currentInterval = 0;
		this.isShuffle = false
		this.isLoop = false
		this.nextUp = storage.get("nextUp")
		this.currentTrackIndex = this.nextUp.indexOf(this.nextUp.find(track => track._id === storage.get("nowPlaying")._id))
	},
	play() {
		const _this = audioController;
		_this.audio.play().then(() => {
			_this.currentInterval = setInterval(() => {
				_this.audioProgress.value += 0.001;
				_this.getCurrentDuration(_this.audio.currentTime);
			}, 1);
		})
	},

	pause() {
		const _this = audioController;
		_this.audio.pause();
		clearInterval(_this.currentInterval);
	},

	getCurrentDuration(progress) {
		const _this = audioController;
		_this.audioProgress.value = progress;
		_this.currentProgress.style.width = `${(progress / _this.audio.duration) * 100}%`;
		_this.currentTime.innerText = timer(progress);
	},

	loadCurrentTrack(data) {
		const _this = audioController;
		const track = data.track ?? data;
		const audioContainer = $("#audio-controller-container");
		if (audioContainer) {
			_this.audio.src = track.trackSrc;
			_this.audio.dataset.current = track._id;
			_this.audio.load();
			const thumbnail = track?.album?.image || track?.artists[0]?.avatar
			audioContainer.innerHTML = _this.render({ thumbnail, ...track })
			_this.start()

		}
	},

	async changeTrack(track) {
		const _this = audioController;

		// save the current song 
		storage.set("nowPlaying", track);

		// re-render if needed
		if (location.href.includes("nextup"))
			await renderPageContent(nextUpPage);
		// reset to the start
		clearInterval(_this.currentInterval);
		_this.audioProgress.value = 0;
		_this.getCurrentDuration(_this.audioProgress.value);
		// change to the next song
		_this.loadCurrentTrack(track);
		_this.play()


	},
	prevVolume: 100,
	adjustVolume() {
		const _this = audioController;

		if (_this.prevVolume == 0 || _this.prevVolume == 1)
			_this.prevVolume = _this.audioVolume.value

		_this.volumeRange.style.width = `${(_this.prevVolume / _this.audioVolume.max) * 100}%`;
		_this.audio.volume = _this.prevVolume / 100;

		if (_this.audioVolume.value == 0) _this.volumeBtn.innerHTML = /* html */ `<i class="bi bi-volume-mute"></i>`;
		else if (_this.audioVolume.value < 100) _this.volumeBtn.innerHTML = /* html */ `<i class="bi bi-volume-down"></i>`;
		else _this.volumeBtn.innerHTML = /* html */ `<i class="bi bi-volume-up"></i>`;
	},
	async toggleLikeTrack(track, isNotLiked) {
		if (isNotLiked) {
			await updateTracksCollection({ track: track })
			toast("success", "Added to your library!")
		}
		else {
			await updateTracksCollection({ track: track, action: "unfollow" })
			toast("info", "Removed from your library!")
		}
		// re-render if needed
		const currentRouter = router.current[0]
		if (currentRouter.url.includes("playlist"))
			renderPageContent(playlistPage, currentRouter.data.id)
	},
	handleEvents() {
		const _this = audioController;

		/* ::::::::::: fast backward/forward ::::::::::: */
		//#region 
		_this.audioProgress.oninput = () => {
			_this.getCurrentDuration(_this.audioProgress.value);
			_this.audio.currentTime = _this.audioProgress.value;
		};
		//#endregion


		/* :::::::::::: Toggle like track ::::::::::::::: */
		_this.toggleLike.onchange = () => {
			const track = _this.toggleLike.dataset.track
			_this.toggleLikeTrack(track, _this.toggleLike.checked)
		}


		/* ::::::::::: Play track ::::::::::: */
		//#region 
		_this.togglePlay.onchange = () => {
			if (_this.audio.paused === true)
				_this.play();
			else
				_this.pause();
		}
		//#endregion


		/* ::::::::::: Adjust volume ::::::::::: */
		//#region 
		_this.audioVolume.oninput = (e) => {
			_this.prevVolume = e.target.value;
			_this.adjustVolume();
		};

		_this.volumeBtn.addEventListener.onclick = () => {
			if (_this.audioVolume.value != 0) _this.audioVolume.value = 0;
			else _this.audioVolume.value = _this.prevVolume;
			_this.adjustVolume();
		};
		//#endregion


		/* ::::::::: Next track :::::::::: */
		//#region 
		const nextButton = $("#next-btn");
		if (nextButton)
			nextButton.onclick = () => {
				let newIndex
				// if shuffle play is turned on -> create random track index
				if (_this.isShuffle == true)
					newIndex = _this.currentTrackIndex
				// if shuffle play is turned off -> track's index will increase
				else {
					_this.currentTrackIndex++
					if (_this.currentTrackIndex == _this.nextUp.length)
						_this.currentTrackIndex = 0
					newIndex = _this.currentTrackIndex
				}

				console.log(newIndex);
				_this.changeTrack(_this.nextUp[newIndex]);
				trackCard.handleEvents()
				// _this.togglePlay.checked = !_this.audio.paused
			};
		//#endregion


		/* ::::::::: Previous track :::::::::: */
		//#region 
		const prevButton = $("#prev-btn");
		if (prevButton)
			prevButton.onclick = () => {
				_this.currentTrackIndex--
				if (_this.currentTrackIndex == -1)
					_this.currentTrackIndex = _this.nextUp.length - 1
				let newIndex = _this.currentTrackIndex

				_this.changeTrack(_this.nextUp[newIndex]);
				_this.togglePlay.checked = !_this.audio.paused
				trackCard.handleEvents()
			};
		//#endregion


		/* ::::::::::: Loop ::::::::::: */
		//#region 
		_this.loopToggle.onchange = () => {
			if (_this.loopToggle.checked) {
				_this.isLoop = true
				_this.audio.loop = _this.loopToggle.checked;
			}
		};
		//#endregion


		/* ::::::::::: Shuffle ::::::::::: */
		//#region 
		_this.shuffleToggle.onchange = () => {
			if (_this.shuffleToggle.checked) {
				_this.isShuffle = true
				let newIndex = Math.floor(Math.random() * _this.nextUp.length)
				while (_this.currentTrackIndex === newIndex)
					_this.currentTrackIndex = Math.floor(Math.random() * _this.nextUp.length)
			}
		}
		//#endregion


		/* ::::::::::: Handle audio progress after ended ::::::::::: */
		//#region 
		_this.audio.onended = () => {
			_this.nextUp.push(_this.nextUp.shift());
			storage.set("nextUp", _this.nextUp);
			_this.changeTrack(_this.nextUp[0]);

		};
		//#endregion

		_this.audio.onplay = () => {
			this.togglePlay.checked = true
			trackCard.onChange()
		}
		_this.audio.onpause = () => {
			this.togglePlay.checked = false
			trackCard.onChange()
		}
	},
	start() {
		const _this = audioController;
		/* ::::::::::: Defining properties ::::::::::: */
		_this.defineProps();

		/* ::::::::::: Adjust volume ::::::::::: */
		_this.adjustVolume();

		/* ::::::::::: Handle all events ::::::::::: */
		_this.handleEvents();
	},
};
export default audioController;
