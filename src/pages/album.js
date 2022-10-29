import { itMatchesOne } from "daisyui/src/lib/postcss-prefixer/utils"
import instance from "../api/axios.config"
import audioController from "../components/root/audio-controller"
import trackCard from "../components/cards/track-card-v1"

const albumPage = {
    async render(id) {
        const { tracks, album } = await instance.get(`/album/${id}`)
        console.log(tracks);
        const tracksHTML = Array.isArray(tracks) && tracks.length != 0 ?
            await (await Promise.all(tracks.map(async (item, index) => {
                item.artists = [album.artist];
                item.thumbnail = album.image
                item.album = album.title
                console.log(item.thumbnail)
                return await trackCard.render(item, index)
            }))).join("")
            : ""
        return /* html */`
        <div class="p-5 flex flex-col gap-10">
            <section class="flex justify-between p-10 bg-gradient-to-r from-white/20 to-transparent rounded-box shadow-2xl">
                <div class="flex items-center gap-5 text-white self-center">
                    <img src="${album.image}" alt="" class="max-w-[200px] h-[200px] object-cover object-center rounded-xl shadow-2xl">
                    <div class="flex flex-col gap-2 text-base-content">
                        <h1 class="text-6xl font-bold mb-3">${album.title}</h1>
                        <a href="/#/artist/${album.artist._id}" class="font-medium text-2xl hover:link">${album.artist.name}</a>
                        <span class="text-zinc-400 text-xl">${tracks.length} tracks</span>
                    </div>
                </div>
                <div class="self-end flex items-center gap-5">
                    <div class="tooltip " data-tip="Play this album">
                        <button class="btn btn-circle btn-primary text-2xl"><i class="bi bi-play-fill"></i></button>
                    </div>
                     <div class="tooltip " data-tip="Like">
                        <button class="btn btn-primary btn-circle text-xl"><i class="bi bi-suit-heart-fill"></i></button>
                    </div>
                </div>
            </section>

            <section>
                <div>${tracksHTML}</div>
            </section>

        </div>
        `
    },
    handleEvents() {
        trackCard.handleEvents()
        audioController.start()

    }
}


export default albumPage