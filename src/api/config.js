import axios from "axios";
// config api cho axios
const instance = axios.create({
	baseURL: "http://localhost:3001/api",
	headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	function ({ data }) {
		return data;
	},
	function (error) {
		return Promise.reject(error);
	},
);

export default instance;
