const playlistCard = {
   render(playlist) {
      const createDate = new Date(playlist.createAt).toLocaleDateString()
      return /* html */ `
         <div class="bg-base-200 hover:bg-base-300 duration-300 rounded-box shadow-xl p-5 sm:p-3 flex flex-col gap-3 w-full relative">
            <a href="/#/playlist/${playlist._id}" class="max-w-full relative group">
               <div class="max-w-full h-[224px] mask-square mx-auto">
                  <img src="${playlist?.image ? playlist.image : "../../assets/img/default-thumbnail.png"}" alt="" class="max-w-full max-h-full mx-auto object-cover object-center group-hover:cursor-pointer">
               </div>
               <button class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 btn btn-circle btn-primary text-xl opacity-0 duration-500 group-hover:opacity-100"><i class="bi bi-play-fill"></i></button>
            </a>
            <div class="flex flex-col gap-3 group">
               <a href="/#/playlist/${playlist._id}" class="text-xl truncate font-medium hover:link text-base-content sm:text-base">${playlist.title}</a>
               <a class="text-base-content/75 hover:link sm:text-sm">Created at: <span class="text-base-content">${createDate}</span></a>
            </div>
         </div>
      `;
   }
}

export default playlistCard