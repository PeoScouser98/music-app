import loadingScreen from "../components/loading-screen";
import { $ } from "../utils/common";
import { register } from "../api/auth";
import rules from "../utils/validate";
import toast from "../components/toast";

const registerPage = {
	render() {
		return /* html */ `
        <div class="bg-zinc-700 flex justify-center items-center min-h-screen">
			<form action="" id="register__form" class="bg-zinc-600 text-white max-w-lg p-10">
				<img src="./assets/img/logo.png" alt="" class="block sm:max-w-full max-w-sm mx-auto" />
				
				<h1 class="text-center text-3xl mb-10 heading-text"><span class="bg-transparent">Signup</span></h1>
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
				<div class="form-control gap-1 mb-5">
					<button type="submit" class="btn btn-primary">Create new account</button>
				</div>
			</form>
		</div>
        `;
	},
	afterRender() {
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
					loadingScreen.show();
					const response = await register(user);
					loadingScreen.hidden();
					if (response) {
						toast("success", "Successfully.");
						await setTimeout(() => {
							toast("info", "Check your email to get activation link.");
						}, 2000);
						window.location.href = "http://localhost:3000/#/login";
					}
				} catch (error) {
					toast("error", error.response.data.message);
				}
			});
		}
	},
};
export default registerPage;
