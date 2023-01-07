import { $ } from "@/utils/common";
import rules from "@/utils/validate";
import { login } from "@/api/auth";
import toast from "@/components/notification/toast";
import storage from "@/utils/localstorage";
import router from "@/main";

const loginPage = {
	render() {
		return /* html */ `
			<div class="min-h-screen w-full flex justify-center items-center gap-8 text-base-content flex-grow bg-base-100">
				<a href="/#/" class="fixed top-5 left-5 z-[100] text-base-content hover:text-base-content"><i class="bi bi-arrow-left-short"></i> Back to dashboard</a>
				<div class="w-full h-screen hidden xl:flex xxl:flex flex-col justify-center items-start fixed top-0 right-0 left-0 bg-[url('./img/login-bg.jpg')] bg-center bg-cover bg-no-repeat">
				</div>
				<div class="flex justify-center items-center gap-16 relative z-10">
					<div class="hidden xl:block xxl:block">
						<h1 class="text-7xl font-bold text-white align middle leading-[84px] mb-16">Millions of songs<br> Free on Bass Station</h1>
						<a href="/#/" class="btn btn-outline btn-lg">Get Started</a>
					</div>
					<div class="min-w-[480px] max-w-full bg-base-200 sm:p-5 md:p-5 lg:p-8 xl:p-6 xxl:p-10 flex flex-col justify-center items-center gap-6 h-fit rounded-box sm:rounded-none sm:min-h-screen sm:w-screen">
						<img src="./img/logo.png" alt="" class="max-w-full max-h-[140px] xxl:max-h-[180px] object-cover object-center saturate-100" />
						<div class="flex flex-col gap-2 w-full">
							<a href="" class="btn bg-[#1976D2] hover:bg-[#0F6CC8] hover:border-[#1976D2] border-[#1976D2] text-base-content btn-block gap-1"><img src="./img/facebook.svg" alt=""> Sign in with Facebook account</a>
							<a href="" class="btn text-base-content btn-block gap-2"><img src="../img/google.svg" alt=""> Sign in with Google account</a>
						</div>
							<div class="divider">OR</div>
						<form action="" id="login__form" class="min-w-full text-white">
							<div class="form-control gap-1 mb-5">
								<label for="" class="text-base-content font-medium">Email</label>
								<input type="email" name="email" data-name="Email" class="input text-base-content" placeholder="example@email.com"/>
								<small class="error-message text-error"></small>
							</div>
							<div class="form-control gap-1 mb-5">
								<label for="" class="text-base-content font-medium">Password</label>
								<input type="password" name="password" data-name="Password" class="input text-base-content" placeholder="*******"/>
								<small class="error-message text-error"></small>
							</div>
						
							<div class="flex justify-between items-center w-full gap-2 text-sm mb-6">
								<span class="text-base-content/60">Do not have account? <a href="/#/register" class="hover:link text-base-content">Register</a></span>
								<a href="/#/forgot-password" class="hover:link text-base-content">Forgot password</a>
							</div>
	
							<div class="form-control gap-1">
								<button type="submit" class="btn btn-primary normal-case btn-lg">Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<!-- toast notification here -->
			<div id="notification-container" class="fixed top-0 right-0 z-[9999] flex flex-col-reverse gap-1 p-4"></div>

		`;
	},
	handleEvents() {
		const loginForm = $("#login__form");
		if (loginForm) {
			loginForm.addEventListener("submit", async (event) => {
				event.preventDefault();
				const email = loginForm["email"];
				const password = loginForm["password"];

				if (!rules.areRequired(email, password)) return;
				if (!rules.isEmail(email)) return;

				const data = {
					email: email.value,
					password: password.value,
				};
				try {
					const res = await login(data);
					if (res) {
						const { accessToken, id, username } = res;
						storage.set("accessToken", accessToken);
						storage.set("auth", { id: id, username: username });
						router.navigate("/");
					}
				} catch (error) {
					console.log(error);
				}
			});
		}
	},
};
export default loginPage;
