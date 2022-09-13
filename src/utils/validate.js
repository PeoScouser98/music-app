// get name of each field
const getFieldName = (formCtrl) => {
	return formCtrl.dataset.name;
};

// show error message
const showError = (formCtrl, message) => {
	const errorIcon = /*html */ `<i class="bi bi-x align-center"></i>`;
	const errorMessage = formCtrl.parentElement.querySelector(".error-message");
	errorMessage.innerHTML = errorIcon + message;
	formCtrl.classList.add("input-error", "border-2");
	formCtrl.classList.remove("input-success", "border-2");
};
// show success if value of the field is valid
const showSuccess = (formCtrl, message) => {
	const successMessage = formCtrl.parentElement.querySelector(".error-message");
	successMessage.innerHTML = message;
	formCtrl.classList.add("input-success", "border-2");
	formCtrl.classList.remove("input-error", "border-2");
};

/* ========= Các rule thực hiện check các trường input =============*/
const rules = {
	areRequired: (...formControls) => {
		let isntError = true;
		formControls.forEach((formCtrl) => {
			if (formCtrl.value.trim() != "") showSuccess(formCtrl, null);
			else {
				isntError = false;
				showError(formCtrl, `${getFieldName(formCtrl)} is required`);
			}
			formCtrl.oninput = () => {
				if (formCtrl.value.trim() != "") showSuccess(formCtrl, null);
				else {
					isntError = false;
					showError(formCtrl, `${getFieldName(formCtrl)} is required`);
				}
			};
			formCtrl.onblur = () => {
				if (formCtrl.value.trim() != "") showSuccess(formCtrl, null);
				else {
					isntError = false;
					showError(formCtrl, `${getFieldName(formCtrl)} is required`);
				}
			};
			formCtrl.onchange = () => {
				if (formCtrl.value.trim() != "") {
					showSuccess(formCtrl, null);
				} else {
					isntError = false;
					showError(formCtrl, `${getFieldName(formCtrl)} is required`);
				}
			};
		});
		return isntError;
	},

	isEmail: (formCtrl) => {
		let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		formCtrl.oninput = () => {
			console.log(formCtrl);
			regexEmail.test(formCtrl.value) ? showSuccess(formCtrl, null) : showError(formCtrl, "Email is invalid");
		};
		formCtrl.onblur = () => {
			console.log(formCtrl);
			regexEmail.test(formCtrl.value) ? showSuccess(formCtrl, null) : showError(formCtrl, "Email is invalid");
		};
		return regexEmail.test(formCtrl.value);
	},

	ckMatchingValue: (formCtrl1, formCtrl2) => {
		formCtrl1.oninput = () => {
			formCtrl1.value == formCtrl2.value ? showSuccess(formCtrl1, null) : showError(formCtrl1, `${getFieldName(formCtrl1)} is not matching !`);
		};
		formCtrl1.onblur = () => {
			formCtrl1.value == formCtrl2.value ? showSuccess(formCtrl1, null) : showError(formCtrl1, `${getFieldName(formCtrl1)} is not matching !`);
		};
		return formCtrl1.value == formCtrl2.value;
	},

	checkLength: (formCtrl, minLength) => {
		formCtrl.oninput = () => {
			formCtrl.value.length >= minLength ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} must have ${minLength} characters`);
		};
		formCtrl.onblur = () => {
			formCtrl.value.length >= minLength ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} must have ${minLength} characters`);
		};
		return formCtrl.value.length >= minLength;
	},

	checkMaxLength: (formCtrl, minLength) => {
		formCtrl.oninput = () => {
			formCtrl.value.length <= minLength ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} must have ${minLength} characters`);
		};
		formCtrl.onblur = () => {
			formCtrl.value.length <= minLength ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} must have ${minLength} characters`);
		};
		return formCtrl.value.length <= minLength;
	},

	isPhoneNumber: (formCtrl) => {
		formCtrl.oninput = () => {
			formCtrl.value == +formCtrl.value && formCtrl.value.length == 10 ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} is invalid`);
		};
		formCtrl.onblur = () => {
			formCtrl.value == +formCtrl.value && formCtrl.value.length == 10 ? showSuccess(formCtrl, null) : showError(formCtrl, `${getFieldName(formCtrl)} is invalid`);
		};
		return formCtrl.value == +formCtrl.value && formCtrl.value.length == 10;
	},

	allowedImgExt: /(\.png|\.jpg|\.jiff|\.webp|\.bmp|\.jpeg|\.avif)$/i,
	allowedAudioExt: /(\.mp3|\.flac|\.wav|\.ogg)$/i,

	isValidFile: (formCtrl, allowedExtensions) => {
		const filePath = formCtrl.value;
		allowedExtensions.test(filePath) ? showSuccess(formCtrl, null) : showError(formCtrl, "File's extension is not allowed");
		// Allowing file type
		formCtrl.onchange = () => {
			allowedExtensions.test(filePath) ? showSuccess(formCtrl, null) : showError(formCtrl, "File's extension is not allowed");
		};
		formCtrl.onblur = () => {
			allowedExtensions.test(filePath) ? showSuccess(formCtrl, null) : showError(formCtrl, "File's extension is not allowed");
		};
		return allowedExtensions.test(filePath);
	},
};
export default rules;
