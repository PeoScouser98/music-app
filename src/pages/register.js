import { $ } from "../utils/common";
import { register } from "../api/auth";
import rules from "../utils/validate";
import toast from "../components/notification/toast";
import { toggleLoadingBtn } from "../utils/loading";
const registerPage = {
	render() {
		return /* html */ `
			<div class="bg-base-100 flex justify-center items-center min-h-screen">
				<form action="" id="register__form" class="bg-base-200 glass text-base-content min-w-[768px] p-10">
					<img src="./assets/img/logo.png" alt="" class="block sm:max-w-full max-w-sm mx-auto" />

					<h1 class="text-center text-3xl mb-14 heading-text max-w-[50%]"><span class="bg-transparent">Signup</span></h1>
					<div class="grid grid-cols-2 gap-x-10 sm:grid-cols-1">
						<div class="form-control gap-1 mb-5">
							<label for="">Email</label>
							<input type="email" id="email" data-name="Email" class="input border input-block border-zinc-500 bg-transparent" placeholder="example@gmail.com" />
							<small class="error-message text-error font-medium"></small>
						</div>
						<div class="form-control gap-1 mb-5">
							<label for="">Password</label>
							<input type="password" id="password" data-name="Password" class="input border input-block border-zinc-500 bg-transparent min-w-[200px]" placeholder="" />
							<small class="error-message text-error font-medium"></small>
						</div>
						<div class="form-control gap-1 mb-5">
							<label for="">Confirm password</label>
							<input type="password" id="cfm__password" data-name="Confirm password" class="input border input-block border-zinc-500 bg-transparent min-w-[200px]" />
							<small class="error-message text-error font-medium"></small>
						</div>
						<div class="form-control gap-1 mb-5">
							<label for="">What should we call you?</label>
							<input type="text" id="username" data-name="User's name" class="input border input-block border-zinc-500 bg-transparent min-w-[200px]" />
							<small class="error-message text-error font-medium"></small>
						</div>
						<div class="form-control gap-1 mb-5">
							<label for="">Address</label>
							<input type="text" id="address" data-name="Address" class="input border input-block border-zinc-500 bg-transparent min-w-[200px]" />
							<small class="error-message text-error font-medium"></small>
						</div>
						<div class="form-control gap-1 mb-5">
							<label for="">Phone</label>
							<input type="text" id="phone" data-name="Phone" class="input border input-block border-zinc-500 bg-transparent min-w-[200px]" />
							<small class="error-message text-error font-medium"></small>
						</div>
					</div>
					<div class="form-control gap-1 mb-5 w-full flex-row justify-center mt-10">
						<button type="submit" id="register-submit-btn" class="btn btn-primary btn-lg sm:btn-md w-fit">Create new account</button>
					</div>
				</form>
			</div>
		`;
	},
	handleEvents() {
		const registerForm = $("#register__form");
		if (registerForm) {
			registerForm.addEventListener("submit", async (event) => {
				event.preventDefault();
				const email = $("#email");
				const password = $("#password");
				const username = $("#username");
				const confirmPassword = $("#cfm__password");
				const address = $("#address");
				const phone = $("#phone");

				/* catching invalid form data */
				if (rules.areRequired(email, password, username, confirmPassword, address, phone) == false) return;
				if (rules.checkLength(password, 8) == false) return;
				if (rules.ckMatchingValue(password, confirmPassword) == false) return;
				if (rules.isPhoneNumber(phone) == false) return;

				/* after passing check valid form data => send register request */
				const user = {
					email: email.value,
					password: password.value,
					username: username.value,
					address: address.value,
					phone: phone.value,
				};
				console.log(user);
				try {
					toggleLoadingBtn({ selector: "#register-submit-btn", isDone: false })
					const response = await register(user);

					if (response) {
						toggleLoadingBtn({ selector: "#register-submit-btn", isDone: true })
						toast("success", "Successfully.");
						await setTimeout(() => {
							toast("info", "Check your email to get activation link.");
						}, 2000);
						window.location.href = "/#/login";
					}
				} catch (error) {
					toast("error", error.response.data.message);
				}
			});
		}
	},
};
export default registerPage;
