import axios from "axios";
import { refreshToken } from "./auth";

// config api cho axios
const instance = axios.create({
	baseURL: "http://localhost:3001/api",
	// headers: { "Content-Type": "application/json" },
});
/* ============== Xử  trước khi gửi request xuống server ============== */
instance.interceptors.request.use(
	async (config) => {
		/* Bỏ qua check access token với các routes nay */
		const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password", "/reset-password"];
		if (skippingCheckTokenRoutes.indexOf(config.url) >= 0) return config;

		/* Trước khi request xuống server gửi luôn access token trong headers để check */
		const token = await instance.getAccessToken();
		if (token != null) {
			config.headers.token = token.accessToken;
			return config;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

/* ============== Xử lý data sau khi nhận response ============== */
instance.interceptors.response.use(
	async (response) => {
		const { data, config } = response;
		const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password", "/reset-password"];
		if (skippingCheckTokenRoutes.indexOf(config.url) >= 0) return data;

		if (data.hasOwnProperty("statusCode") && data.statusCode === 401) {
			console.log("Access token has been expired !");
			const newAccessToken = await refreshToken(); // create new access token
			console.log("New access token: ", newAccessToken);
			await instance.setAccessToken(newAccessToken);
			return data;
		}
		return data;
	},
	(error) => {
		return Promise.reject(error);
	},
);

/* ============= Save access token in localstorage =========== */
instance.setAccessToken = async ({ accessToken, expiresIn }) => {
	localStorage.setItem("accessToken", JSON.stringify({ accessToken, expiresIn }));
};

/* ============= Get access token from localstorage ================ */
instance.getAccessToken = async () => {
	return JSON.parse(localStorage.getItem("accessToken"));
};

export default instance;
