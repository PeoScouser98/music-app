import { $ } from "../utils/common";
const audioController = {
	render() {
		return /* html */ `
		<div class="w-full text-white grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[1fr,2fr,1fr] gap-5 items-start py-5">
			<!-- track infor -->
			<div class="flex justify-between items-start">
				<div class="flex justify-start item-center gap-5">
					<img src="../../assets/img/default-thumbnail.png" alt="" class="max-w-full h-14 object-cover object-center rounded-lg" />
					<div class="flex flex-col justify-center gap-2">
						<span class="text-lg font-semibold" id="playing-track__name">Track's name</span>
						<span id="playing-track__artist">Artist</span>
					</div>
				</div>
				<div class="sm:flex md:flex lg:flex xl:hidden items-center gap-5" >
					<button id="add-fav-list__btn" class="text-lg"><i class="bi bi-heart"></i></button>
					<button id="add-to-playlist__btn" class="text-lg"><i class="bi bi-music-note-list"></i></button>
				</div>
			</div>
			<!-- audio control -->

			<div class="flex flex-col justify-center items-center gap-5 relative">
				<div class="flex justify-center items-center gap-3 min-w-full">
					<span id="current-duration">0:00</span>
					<div class="range-container self-center">
						<div class="range-progress" id="track__process__range"></div>
						<input type="range" min="0" value="0" id="track-progress" class="" />
					</div>
					<span id="track-duration">0:00</span>
				</div>
				<div class="flex justify-between item-center">
					<div class="flex justify-center items-center gap-6 text-zinc-400">
						<i class="bi bi-shuffle text-xl hover:text-white"></i>
						<i class="bi bi-skip-backward-fill text-2xl hover:text-white"></i>
						<label class="swap swap-rotate">
							<!-- this hidden checkbox controls the state -->
							<input type="checkbox" id="toggle-play" />
							<span class="swap-on" id="play-track__btn"><i class="bi bi-pause-circle fill-current text-white text-4xl"></i></span>
							<span class="swap-off" id="pause-track__btn"><i class="bi bi-play-circle fill-current text-white text-4xl"></i></span>
						</label>
						<i class="bi bi-skip-forward-fill text-2xl hover:text-white"></i>
						<label class="swap text-xl hover:text-white">
							<!-- this hidden checkbox controls the state -->
							<input type="checkbox" />
							<i class="swap-off bi bi-repeat"></i>
							<i class="swap-on bi bi-repeat-1"></i>
						</label>
					</div>
				</div>
			</div>

			<!-- track actions -->
			<div class="sm:hidden md:hidden lg:hidden xl:flex justify-end items-center gap-5">
				<div class="flex justify-end items-center gap-2" id="volume-controller">
					<label for="volume" class="text-2xl"></label>
					<div class="range-container">
						<div class="range-progress"></div>
						<input type="range" min="0" max="100" id="volume" class="w-[100px]" />
					</div>
				</div>
				<button id="add-fav-list__btn" class="text-lg"><i class="bi bi-heart"></i></button>
				<button id="add-to-playlist__btn" class="text-lg"><i class="bi bi-music-note-list"></i></button>
			</div>
		</div>
        `;
	},
	control() {
		class Duration {
			constructor(duration, target) {
				// => duration tính = giây
				this.hour = Math.floor(duration / 3600).toString(); // quy đổi ra giờ
				this.min = Math.floor(duration / 60 - this.hour * 60).toString(); // quy đổi phút
				this.sec = Math.floor(duration - this.hour * 3600 - this.min * 60).toString(); // => quy đổi giây
				this.showDuration = () => {
					if (this.hour == 0) {
						if (this.sec.toString().length == 1) target.innerText = `${this.min}:0${this.sec}`;
						else target.innerText = `${this.min}:${this.sec}`;
					} else {
						if (this.min.toString().length == 1 && this.min.toString().length == 1) target.innerText = `${this.hour}:0${this.min}:0${this.sec}`;
						else target.innerText = `${this.hour}:${this.min}:0${this.sec}`;
					}
				};
			}
		}
		const audioElem = $("#audio-player");
		const playTrackBtn = $("#play-track__btn");
		const pauseTrackBtn = $("#pause-track__btn");
		const trackDuration = $("#track-duration");
		const trackProgress = $("#track-progress");
		const currentDuration = $("#current-duration");
		const volumeController = $("#volume-controller");
		const volumeRange = volumeController.querySelector("#volume");

		/* ========= Load track in the first time ========= */
		const loadAudioData = () => {
			trackProgress.max = audioElem.duration;
			const duration = new Duration(audioElem.duration, trackDuration);
			const { showDuration } = duration;
			showDuration();
		};
		window.onload = () => {
			loadAudioData();
		};
		audioElem.addEventListener("loadeddata", () => {
			loadAudioData();
		});

		/* ========== show current duration ============ */
		const getCurrentDuration = (progress) => {
			const current = new Duration(progress, currentDuration);
			current.showDuration.call(current);
			trackProgress.parentElement.querySelector(".range-progress").style.width = `${(progress / audioElem.duration) * 100}%`;
		};

		/* =========== Fast foward/backward ============ */
		trackProgress.oninput = () => {
			getCurrentDuration(trackProgress.value);
			audioElem.currentTime = trackProgress.value;
		};

		/* =========== Play track =========== */
		let currentInterval;
		playTrackBtn.onclick = async function () {
			loadAudioData();
			await audioElem.play();
			currentInterval = setInterval(() => {
				trackProgress.value++;
				getCurrentDuration(trackProgress.value);
			}, 1000);
			if (trackProgress.value === trackProgress.max) $("#toggle-play").checked = false;
		};

		/* ========== Pause track =========== */
		pauseTrackBtn.onclick = function () {
			audioElem.pause();
			clearInterval(currentInterval);
		};

		/* ========= Adjust volume ========== */
		let beforeVol;
		function adjustVolume() {
			const range = volumeController.querySelector(".range-progress");
			const icon = volumeController.querySelector("label");

			range.style.width = `${(volumeRange.value / volumeRange.max) * 100}%`;
			audioElem.volume = volumeRange.value / 100;

			//  * Change volume icon after adjusting volume
			if (volumeRange.value == 0) icon.innerHTML = /* html */ `<i class="bi bi-volume-mute text-zinc-400"></i>`;
			else if (volumeRange.value < 100) icon.innerHTML = /* html */ `<i class="bi bi-volume-down text-zinc-300"></i>`;
			else icon.innerHTML = /* html */ `<i class="bi bi-volume-up"></i>`;

			// * Toggle mute/make sound
			icon.onclick = () => {
				volumeRange.value = volumeRange.value == 0 ? beforeVol : 0;
				adjustVolume();
			};
		}

		adjustVolume();
		volumeRange.oninput = () => {
			beforeVol = volumeRange.value;
			adjustVolume();
		};
	},
};
export default audioController;
