import { getArtistsCollection } from "../../api/collection"
import artistCard from "../../components/cards/artist-card"

const artistSubPage = {
    async render() {
        const followedArtists = await getArtistsCollection()
        return /* html */ `
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-10 xxl:gap-12">
            ${Array.isArray(followedArtists) ? followedArtists.map(artist => artistCard.render(artist)).join("") : ""}
        </div>
        `
    }
}

export default artistSubPage