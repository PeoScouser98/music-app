const notFoundPage = {
	render() {
		return /* html */ `
        <div class="relative overflow-hidden h-screen flex justify-center items-center">
            <img src="../../assets/img/picture.webp" class="absolute h-full w-full object-cover saturate-50 blur-[4px]"/>
      
            <div class="container mx-auto relative z-10">
                <div class="font-mono flex flex-col items-center relative z-10 max-w-fit mx-auto p-5 rounded-box ">
                    <h1 class="font-extrabold text-6xl text-center text-base-content leading-tight mt-4 drop-shadow-xl">You're alone here</h1>
                    <p class="font-extrabold text-8xl text-white">404</p>
                </div>
            </div>
        </div>
        `;
	},
};

export default notFoundPage;
