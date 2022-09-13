import instance from "./config";

export const login = async (user) => {
	return await instance.post("/login", user);
};

export const register = async (user) => {
	return await instance.post("/register", user);
};

export const getUser = async () => {
	try {
		return await instance.get("/user");
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
		const id = localStorage.getItem("id");
		const newAccessToken = await instance.get("/refresh-token/" + id);
		await instance.setAccessToken(newAccessToken);
		return newAccessToken;
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

export function logout() {
	localStorage.clear();
	window.location.href = "/#/login";
}
