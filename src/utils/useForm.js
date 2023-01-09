import validator from "./validate";

export const useForm = (form) => {
	const data = {};
	[...form.elements].forEach((item) => {
		if (item.name != "") {
			data[item.name] = item.value;
			if (validator.areRequired(item)) return;
		}
	});

	return data;
};
