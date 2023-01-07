import validator from "./validate";

export const useForm = () => {
	const handleSubmit = (form) => {
		form.preventDefault();
		const data = {};
		[...form.elements].forEach((item) => {
			if (item.name != "") {
				data[item.name] = item.value;
				if (validator.areRequired(item)) return;
			}
		});

		return data;
	};
	return handleSubmit;
};
