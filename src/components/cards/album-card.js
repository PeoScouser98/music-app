const albumCard = {
   render(album) {
      return /* html */ `
         <div class="bg-base-200 hover:bg-base-300 duration-300 rounded-box shadow-xl p-5 sm:p-3 flex flex-col gap-3 w-fit relative">
            <a href="/#/album/${album._id}" class="max-w-full group">
               <div class="max-w-full max-h-[224px] mask-square mx-auto relative">
                  <img src="${album.image}" alt="" class="max-w-full w-full h-full mx-auto object-cover object-center group-hover:cursor-pointer">
                  <button class="absolute bottom-1 right-1 btn btn-circle btn-primary text-xl opacity-0 duration-500 group-hover:opacity-100"><i class="bi bi-play-fill"></i></button>
               </div>
            </a>
         
            <div class="flex flex-col gap-3 group">
               <a href="/#/album/${album._id}" class="text-base truncate font-medium hover:link text-base-content sm:text-base">${album.title}</a>
               <a href="/#/artist/${album.artist._id}" class="text-sm-content/75 hover:link sm:text-sm">${album.artist.name}</a>
               <div class="swap btn btn-ghost hover:bg-transparent text-base-content text-base absolute bottom-3 sm:bottom-0 right-0 opacity-0 group-hover:opacity-100 group-hover:duration-300 ">
                  <input type="checkbox" class="toggle-like-album">
                  <div class="swap-on tooltip z-[100]" data-tip="Unlike album">
                     <span class="material-symbols-sharp text-primary">favorite</span>
                  </div>
                  <div class="swap-off tooltip z-[100]" data-tip="Like album">
                     <span class="material-symbols-outlined">favorite</span>
                  </div>
               </div>
            </div>
         </div>
      `;
   },
   handleEvents() {

   }
};

export default albumCard;
