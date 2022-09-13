import { $ } from "../utils/common";
import rules from "../utils/validate";
import { resetPassword } from "../api/auth";
import instance from "../api/config";
import toast from "../components/toast";

const resetPasswordPage = {
	render() {
		return /* html */ `
		<div class="min-h-screen w-full bg-zinc-700 flex justify-center items-center text-white">
			<a href="/#/home" class="fixed top-5 left-5 z-10 text-zinc-300 hover:text-white"><i class="bi bi-arrow-left-short"></i> Back to dashboard</a>
			<div class="min-w-[320px] bg-zinc-600 sm:p-5 md:p-5 lg:p-10 xl:p-10 flex flex-col justify-center items-center rounded-box sm:rounded-none sm:min-h-screen sm:w-full">
				<img src="./assets/img/logo.png" alt="" class="max-w-full h-40 object-cover object-center" />
				<form action="" class="min-w-full">
                    <div class="form-control gap-1 mb-5">
						<label for="" class="text-zinc-300">Verify code</label>
						<input type="text" name="verifyCode" data-name="Email" class="input" />
						<small class="error-message text-error"></small>
					</div>
					<div class="form-control gap-1 mb-5">
						<label for="" class="text-zinc-300">New password</label>
						<input type="password" name="password" data-name="Password" class="input" />
						<small class="error-message text-error"></small>
					</div>
                    <div class="form-control gap-1 mb-5">
                        <label for="" class="text-zinc-300">Confirm new password</label>
                        <input type="password" name="confirm-password" data-name="Confirm password" class="input" />
                        <small class="error-message text-error"></small>
                    </div>
					<div class="form-control gap-1 mb-5">
						<button type="submit" class="btn btn-primary normal-case btn-lg">Reset password</button>
					</div>
				</form>
			</div>
		</div> `;
	},
	afterRender() {
		const form = $("form");
		form.addEventListener("submit", async (event) => {
			try {
				event.preventDefault();
				const verifyCode = form["verifyCode"];
				const password = form["password"];
				const confirmPassword = form["confirm-password"];
				const email = sessionStorage.getItem("email");
				if (rules.areRequired(verifyCode, password, confirmPassword) === false) return;
				if (rules.checkLength(password, 8) === false) return;
				if (rules.ckMatchingValue(password, confirmPassword) === false) return;

				const data = {
					verifyCode: verifyCode.value,
					password: password.value,
					email: email,
				};
				console.log("thông tin gửi đi::::", data);
				const response = await instance.post("/reset-password", data);
				if (response) {
					window.location.href = "/#/login";
					toast("success", response.message);
				}
			} catch (error) {
				if (error) {
					const { response } = error;
					console.log(response.data);
					if (response.data.name === "TokenExpiredError") {
						toast("error", "Verify code has been expired!");
						setTimeout(() => {
							window.location.href = "/#/forgot-password";
						}, 1500);
					}
				}
			}
		});
	},
};
export default resetPasswordPage;
