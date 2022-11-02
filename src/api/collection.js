import storage from "../utils/localstorage";
import instance from "./axios.config";

export const getTracksCollection = async () => {
	try {
		const creator = storage.get("auth");
		if (creator) {
			const tracksCollection = await instance.get("/collection/tracks");
			return {
				title: "Liked Tracks",
				image: "../../assets/img/liked-tracks-playlist.png",
				creator: creator,
				tracks: tracksCollection,
			};
		}
	} catch (error) {
		console.log(error);
	}
};

export const getAlbumsCollection = async () => {
	try {
		const auth = storage.get("auth");
		if (auth) return await instance.get("/collection/albums");
	} catch (error) {
		console.log(error);
	}
};

export const getArtistsCollection = async () => {
	try {
		const auth = storage.get("auth");
		if (auth) return await instance.get("/collection/artists");
	} catch (error) {
		console.log(error);
	}
};

export const updateTracksCollection = async (track) => {
	try {
		return await instance.patch("/collection/tracks", track);
	} catch (error) {
		console.log(error);
	}
};
export const updateAlbumsCollection = async (album) => {
	try {
		console.log(album);
		return await instance.patch("/collection/albums", album);
	} catch (error) {
		console.log(error);
	}
};
export const updateArtistsCollection = async (artist) => {
	try {
		return await instance.patch("/collection/artists", artist);
	} catch (error) {
		console.log(error);
	}
};
