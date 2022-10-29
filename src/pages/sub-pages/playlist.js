import playlistCard from "../../components/cards/playlist-card"
import { getAll } from "../../api/playlist"
const playlistSubPage = {
    async render() {
        console.log("playlist library");
        const userPlaylist = await getAll()
        return /* html  */ `
            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-10 xxl:gap-12">
                ${userPlaylist.map(list => playlistCard.render(list)).join("")}
            </div>    
        `
    }
}
export default playlistSubPage