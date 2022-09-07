import instance from "./config";

export const login = (user) => {
	return instance.post("/signin", user);
};

export const register = (user) => {
	return instance.post("/signup", user);
};
