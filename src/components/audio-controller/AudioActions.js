export default function AudioActions() {
	return /* html */ `
        <div class="flex justify-between item-center">
							<div class="flex justify-center items-center gap-2 text-base-content">
								<!-- toggle shuffle play -->
								<label class="swap text-base-content/50 hover:text-base-content">
									<input type="checkbox" id="shuffle-toggle" >
									<div class="swap-on text-2xl text-accent"><i class="bi bi-shuffle text-xl "></i></div>
									<div class="swap-off text-2xl hover:text-accent-content"><i class="bi bi-shuffle text-xl "></i></div>
								</label>
								<!-- previous -->
								<button class="btn btn-ghost btn-circle hover:bg-transparent text-2xl text-base-content/50 hover:text-base-content change-track-btn" id="prev-btn" data-value="-1">
									<i class="bi bi-skip-backward-fill"></i>
								</button>
								<!-- toggle play -->
								<label class="swap swap-rotate group">
									<input type="checkbox" id="toggle-play" />
									<div class="swap-off bg-transparent text-4xl text-base-content group-hover:text-accent" id="play-btn">
										<i class="bi bi-play-circle"></i>
									</div>
									<div class="swap-on bg-transparent text-4xl text-base-content group-hover:text-accent" id="pause-btn">
										<i class="bi bi-pause-circle"></i>
									</div>
								</label>
								<!-- next button -->
								<button class="btn btn-ghost btn-circle hover:bg-transparent text-2xl text-base-content/50 hover:text-base-content change-track-btn" id="next-btn" data-value="1">
									<i class="bi bi-skip-forward-fill"></i>
								</button>
								<!-- toggle loop -->
								<label class="swap text-base-content/50 hover:text-base-content">
									<input type="checkbox" id="loop-toggle"/>
									<div class="swap-on text-2xl text-accent"><i class="swap-off bi bi-repeat-1"></i></div>
									<div class="swap-off text-2xl hover:text-accent-content"><i class="swap-off bi bi-repeat"></i></div>
								</label>
							</div>
						</div>
    
    `;
}
