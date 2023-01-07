// get name of each field

/* ========= Các rule thực hiện check các trường input =============*/
const validation = {
	getFieldName(formCtrl) {
		return formCtrl.dataset.name;
	},
	showMessage(formCtrl, message, style) {
		const successMessage = formCtrl.parentElement.querySelector(".error-message");
		successMessage.innerHTML = message;
	},
	areRequired(...formControls) {
		let isntError = true;
		formControls.forEach((formCtrl) => {
			if (formCtrl.value.trim() != "") this.showMessage(formCtrl, null, "success");
			else {
				isntError = false;
				this.showMessage(formCtrl, `${this.getFieldName(formCtrl)} is required`, "error");
			}
			formCtrl.oninput = () => {
				if (formCtrl.value.trim() != "") this.showMessage(formCtrl, null, "success");
				else {
					isntError = false;
					this.showMessage(formCtrl, `${this.getFieldName(formCtrl)} is required`, "error");
				}
			};

			formCtrl.onchange = () => {
				if (formCtrl.value.trim() != "") {
					this.showMessage(formCtrl, null, "success");
				} else {
					isntError = false;
					this.showMessage(formCtrl, `${this.showMessage(formCtrl)} is required`, "error");
				}
			};
		});
		return isntError;
	},

	isEmail(formCtrl) {
		let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		formCtrl.oninput = () => {
			console.log(formCtrl);
			regexEmail.test(formCtrl.value)
				? this.showMessage(formCtrl, null, "success")
				: this.showMessage(formCtrl, "Email is invalid", "error");
		};
		formCtrl.onblur = () => {
			console.log(formCtrl);
			regexEmail.test(formCtrl.value)
				? this.showMessage(formCtrl, null, "success")
				: this.showMessage(formCtrl, "Email is invalid", "error");
		};
		return regexEmail.test(formCtrl.value);
	},

	ckMatchingValue(formCtrl1, formCtrl2) {
		formCtrl1.oninput = () => {
			formCtrl1.value == formCtrl2.value
				? this.showMessage(formCtrl1, null)
				: this.showMessage(formCtrl1, `${getFieldName(formCtrl1)} is not matching !`, "error");
		};

		return formCtrl1.value == formCtrl2.value;
	},

	checkLength(formCtrl, minLength) {
		formCtrl.oninput = () => {
			formCtrl.value.length >= minLength
				? this.showMessage(formCtrl, null, "success")
				: this.showMessage(formCtrl, `${getFieldName(formCtrl)} must have ${minLength} characters`, "error");
		};

		return formCtrl.value.length >= minLength;
	},

	checkMaxLength(formCtrl, minLength) {
		formCtrl.oninput = () => {
			formCtrl.value.length <= minLength
				? this.showMessage(formCtrl, null, "success")
				: this.showMessage(formCtrl, `${getFieldName(formCtrl)} must have ${minLength} characters`, "error");
		};

		return formCtrl.value.length <= minLength;
	},

	isPhoneNumber(formCtrl) {
		formCtrl.oninput = () => {
			formCtrl.value == +formCtrl.value && formCtrl.value.length == 10
				? this.showMessage(formCtrl, null, "success")
				: this.showMessage(formCtrl, `${getFieldName(formCtrl)} is invalid`, "error");
		};

		return formCtrl.value == +formCtrl.value && formCtrl.value.length == 10;
	},

	allowedImgExt: /(\.png|\.jpg|\.jiff|\.webp|\.bmp|\.jpeg|\.avif)$/i,
	allowedAudioExt: /(\.mp3|\.flac|\.wav|\.ogg)$/i,

	isValidFile(formCtrl, allowedExtensions) {
		const filePath = formCtrl.value;
		allowedExtensions.test(filePath)
			? this.showMessage(formCtrl, null, "success")
			: this.showMessage(formCtrl, "File's extension is not allowed", "error");
		// Allowing file type
		formCtrl.onchange = () => {
			allowedExtensions.test(filePath)
				? this.showMessage(formCtrl, null, "success")
				: this.showMessage(formCtrl, "File's extension is not allowed", "error");
		};

		return allowedExtensions.test(filePath);
	},
};
export default validation;
