import { $ } from "@/utils/common";
import rules from "@/utils/validate";
import { login } from "@/api/auth";
import toast from "@/components/notification/toast";
import storage from "@/utils/localstorage";
import router from "@/main";
import { useForm } from "@/utils/useForm";

export default function LoginPage() {
	window.handleSubmit = async function (form) {
		const data = useForm(form);
		console.log(data);
		const { accessToken, id, username } = await login(data);
		if (!accessToken || !id || !username) return;
		storage.set("accessToken", accessToken);
		storage.set("auth", { id: id, username: username });
		router.navigate("/");
	};

	return /* html */ `
		<div class="hero min-h-screen bg-base-200">
			<div class="hero-content flex-col xl:flex-row-reverse">
				<div class="text-center lg:text-left">
				
				<h1 class="py-6 text-5xl font-bold sm:text-2xl">Million of songs are free on Bass Station</h1>
				<a href="/" class="btn btn-primary">Get Started!</a>
				</div>
				<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div class="card-body">
						<form action="" id="login__form" class="min-w-full text-white" onsubmit="handleSubmit(this); return false">
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
		</div>
	`;
}
