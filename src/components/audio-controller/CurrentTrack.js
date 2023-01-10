import store from "@/redux/store";

export default function CurrentTrack() {
	let { currentTrack } = store.getState().audio;

	return /* html */ `
        	<div class="flex justify-start items-center gap-3 order-1 basis-1/4 sm:basis-1/2 md:basis-1/2">
                  <img src="${currentTrack?.thumbnail}" class="max-w-full h-16 sm:h-12 rounded-lg" />
                <div class="max-w-full overflow-hidden flex flex-col gap-1">
                    <a href="/#/track/${currentTrack?._id}" 
                    class="text-base font-semibold w-full truncate hover:link" 
                    id="playing-track__name">
                        ${currentTrack?.title}
                    </a>
                    ${
											Array.isArray(currentTrack?.artists)
												? currentTrack?.artists
														.map(
															(artist) =>
																/* html */ `<a href="/#/artist/${artist._id}" class="text-base-content" >${artist?.name}</a>`,
														)
														.join(", ")
												: ""
										}
                </div>
            </div>
    `;
}
