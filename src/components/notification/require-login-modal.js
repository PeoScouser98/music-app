import storage from "../../utils/localstorage"

const loginModal = {
    render() {
        const auth = storage.get("auth")
        return auth == null ? /* html */ `
            <input type="checkbox" id="require-login-modal" class="modal-toggle" />
            <label for="require-login-modal" class="modal cursor-pointer">
                <label class="modal-box relative" for="">
                <h1 class="text-2xl font-semibold mb-3">Login to use this feature!</h1>
                <p class="text-base">Sign in now</p>
                <div class="modal-action flex justify-end items-center gap-2">
                        <label for="require-login-modal" class="text-lg btn btn-ghost capitalize">Later</label>
                        <a href="/#/login" class="btn btn-primary capitalize text-lg">Login</a>
                    </div>
                </label>
            </label>
        `: ""
    },

}

export default loginModal