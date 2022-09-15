import instance from "./config";

export const uploadTrack = async (formData, data) => {
	try {
		const { id } = await instance.post("/track-upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
		return id;
	} catch (error) {
		console.log(error);
	}
};

export const createPlaylist = async () => {
	try {
	} catch (error) {}
};

export const addToAlbum = async () => {
	try {
	} catch (error) {}
};

export const addToLikedTracks = async () => {
	try {
	} catch (error) {}
};
