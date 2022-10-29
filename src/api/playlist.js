import storage from "../utils/localstorage";
import instance from "./axios.config";

export const getAll = async () => {
    try {
        const auth = storage.get("auth")
        return auth != null ? await instance.get("/playlist") : [];

    } catch (error) {
        console.log(error)
    }
}

export const create = async (data) => {
    try {
        return await instance.post("/playlist", data);
    } catch (error) {
        console.log(error);
    }
};

export const getLikedTracksList = async () => {
    try {
        const auth = storage.get("auth")
        const userPlaylists = auth != null ? await instance.get("/playlist?") : [];
        if (userPlaylists.length > 0) {
            const likedTracksList = userPlaylists.find(list => /^liked.tracks$/g.test(list.title.trim().toLowerCase()))
            return likedTracksList != undefined ? await getOne(likedTracksList._id) : {}
        }
    } catch (error) {
        console.log(error)
    }
}


export const getOne = async (id) => {
    try {
        return await instance.get(`/playlist/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export const update = async (id, data, action) => {
    try {
        if (action)
            return await instance.patch(`playlist/${id}?action=${action}`, data)
        return await instance.patch(`/playlist/${id}`, data)

    } catch (error) {
        console.log(error)
    }
}


export const del = async (id) => {
    try {
        return await instance.delete(`/playlist/${id}`)
    } catch (error) {
        console.log(error)
    }
}