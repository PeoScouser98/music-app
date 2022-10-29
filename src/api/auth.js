import storage from "../utils/localstorage";
import instance from "./axios.config";

export const login = async (user) => {
	return await instance.post("/login", user);
};

export const register = async (user) => {
	return await instance.post("/register", user);
};

export const getUser = async () => {
	try {
		const auth = storage.get("auth")
		if (!auth)
			return
		const response = await instance.get(`/user`);
		return response.error && response.error.name === "TokenExpiredError" ? await instance.get("/user") : response;
	} catch (error) {
		console.log(error);
	}
};

export const getResetPassword = async (email) => {
	try {
		return await instance.post("/forgot-password", email);
	} catch (error) {
		console.log(error);
	}
};

export const refreshToken = async () => {
	try {
		const auth = storage.get("auth");
		if (auth)
			return await instance.get("/refresh-token/" + auth.id);
	} catch (error) {
		console.log(error);
	}
};

export const resetPassword = async (data) => {
	try {
		return await instance.post("/reset-password", data);
	} catch (error) {
		console.log(error);
	}
};

export const logout = () => {
	storage.remove("auth")
	storage.remove("accessToken") // 
	location.reload();
}
