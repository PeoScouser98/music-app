import axios from "axios";
import toast from "../components/toast";
import { refreshToken } from "./auth";
// config api cho axios
const instance = axios.create({
	baseURL: "http://localhost:3001/api",
	headers: { "Content-Type": "application/json" },
});
/* ============== Xử  trước khi gửi request xuống server ============== */
instance.interceptors.request.use(
	async (config) => {
		if (
			config.url.indexOf("/login") >= 0 ||
			config.url.indexOf("/register") >= 0 ||
			config.url.indexOf("/refresh-token") >= 0 ||
			config.url.indexOf("/forgot-password") >= 0 ||
			config.url.indexOf("/reset-password") >= 0
		)
			return config;

		// Trước khi request xuống server gửi luôn access token trong headers để check
		console.log("Before send request::::", config);
		if (instance.getAccessToken() != null) {
			const { accessToken } = await instance.getAccessToken();
			config.headers.token = accessToken;
			console.log(config.headers);
			return config;
		}
	},
	(error) => {
		return Promise.reject(error);
	},
);

/* ============== Xử lý data sau khi nhận response ============== */
instance.interceptors.response.use(
	async (response) => {
		const config = response.config;
		if (config.url.indexOf("/login") >= 0 || config.url.indexOf("/register") >= 0 || config.url.indexOf("/refresh-token") >= 0) return response.data;

		console.log("After response :::", response.data);
		const { statusCode } = response.data;
		if (statusCode && statusCode === 401) {
			console.log("Token has been expired!", response.data);
			const newAccessToken = await refreshToken();
			await instance.setAccessToken(newAccessToken);
			return response.data;
		}
		return response.data;
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
