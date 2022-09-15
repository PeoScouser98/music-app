import { $ } from "../utils/common";
import rules from "../utils/validate";
import { login } from "../api/auth";
import toast from "../components/toast";
import instance from "../api/config";

const loginPage = {
	render() {
		return /* html */ `
		<div class="min-h-screen w-full bg-zinc-700 flex justify-center items-center text-white">
			<a href="/#/home" class="fixed top-5 left-5 z-10 text-zinc-300 hover:text-white"><i class="bi bi-arrow-left-short"></i> Back to dashboard</a>
			<div class="min-w-[320px] bg-zinc-600 sm:p-5 md:p-5 lg:p-10 xl:p-10 flex flex-col justify-center items-center rounded-box sm:rounded-none sm:min-h-screen sm:w-full">
				<img src="./assets/img/logo.png" alt="" class="max-w-full h-40 object-cover object-center" />
				<form action="" id="login__form" class="min-w-full">
					<div class="form-control gap-1 mb-5">
						<label for="" class="text-zinc-300">Email</label>
						<input type="email" name="email" data-name="Email" class="input" />
						<small class="error-message text-error"></small>
					</div>
					<div class="form-control gap-1 mb-5">
						<label for="" class="text-zinc-300">Password</label>
						<input type="password" name="password" data-name="Password" class="input" />
						<small class="error-message text-error"></small>
					</div>
					<div class="flex justify-between items-baseline gap-2 mb-5 text-sm sm:flex-col">
						<a href="/#/forgot-password" class="hover:link text-white">Forgot password</a>
						<span class="text-zinc-400">Do not have account? <a href="/#/register" class="hover:link text-white">Register</a></span>
					</div>
				
					<div class="form-control gap-1 mb-5">
						<button type="submit" class="btn btn-primary normal-case btn-lg">Login</button>
					</div>
				</form>
			</div>
		</div> `;
	},
	afterRender() {
		const loginForm = $("#login__form");
		if (loginForm) {
			loginForm.addEventListener("submit", async (event) => {
				event.preventDefault();
				const email = loginForm["email"];
				const password = loginForm["password"];

				if (rules.areRequired(email, password) == false) return;
				if (rules.isEmail(email) == false) return;

				const data = {
					email: email.value,
					password: password.value,
				};
				try {
					const res = await login(data);
					if (res) {
						const { accessToken, expiresIn, id } = res;
						localStorage.setItem("accessToken", JSON.stringify({ accessToken, expiresIn }));
						localStorage.setItem("id", id);
						window.location.href = "/#/";
						toast("success", "Login successfully!");
					}
				} catch (error) {
					toast("error", error.response.data.message);
				}
			});
		}
	},
};
export default loginPage;
