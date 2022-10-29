import storage from "../utils/localstorage";
import instance from "./axios.config";

export const getTracksCollection = async () => {
    try {
        const tracksCollection = await instance.get("/collection/tracks")
        const creator = storage.get("auth")
        return {
            title: "Liked Tracks",
            image: "../../assets/img/liked-tracks-playlist.png",
            creator: creator.username,
            tracks: tracksCollection,
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAlbumsCollection = async () => {
    try {
        return await instance.get("/collection/albums")
    } catch (error) {
        console.log(error);
    }
}

export const getArtistsCollection = async () => {
    try {
        return await instance.get("/collection/artists")
    } catch (error) {
        console.log(error);
    }
}

export const updateTracksCollection = async ({ track, action }) => {
    try {
        console.log(action);
        const url = action != undefined ? `/collection/tracks/${track}?action=${action}` : `/collection/tracks/${track}`
        return await instance.patch(url)
    } catch (error) {
        console.log(error)
    }
}
export const updateAlbumsCollection = async ({ album, action }) => {
    try {
        const url = action != undefined ? `/collection/albums/${album}?action=${action}` : `/collection/albums/${album}`
        return await instance.patch(url)
    } catch (error) {
        console.log(error)
    }
}
export const updateArtistsCollection = async ({ artist, action }) => {
    try {
        const url = action != undefined ? `/collection/artists/${artist}?action=${action}` : `/collection/artists/${artist}`
        return await instance.patch(url)
    } catch (error) {
        console.log(error)
    }
}