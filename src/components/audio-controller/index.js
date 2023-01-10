import AudioActions from "./AudioActions";
import AudioRange from "./AudioRange";
import CurrentTrack from "./currentTrack";
import TrackActions from "./TrackActions";

export default function AudioController() {
	return /* html */ `
				<div class="w-full text-base-content flex flex-wrap xl:flex-nowrap xxl:flex-nowrap justify-between items-center xl:items-start xxl:items-start flex-grow gap-5  p-5 bg-base-200">
                    <div id="current-track">
                        ${CurrentTrack()}
                    </div>
                    <div class="flex flex-col justify-center items-center gap-5 relative order-3 xl:order-2 xxl:order-2 basis-full xl:basis-1/2 xxl:basis-1/2 ">
                        ${AudioRange()}
                        ${AudioActions()}
                    </div>
                    ${TrackActions()}
                </div>

    
    `;
}
