import { $$ } from "../../utils/common";
import { updateArtistsCollection } from "../../api/collection";
import toast from "../notification/toast";
import storage from "../../utils/localstorage";
import router from "../../main";
import { renderPageContent, reRenderContent } from "../../utils/handle-page";
import artistSubPage from "../../pages/sub-pages/artist";

const artistCard = {
   render(artist) {
      let isFollowed = false
      const auth = storage.get("auth")
      if (auth?.id)
         isFollowed = artist.followers.find(flw => flw == auth?.id) != undefined

      const toggleFollowBtn = auth?.id ? /* html */ `
          <label class="swap">
            <input type="checkbox" class="toggle-follow-artist" ${isFollowed ? "checked" : ""} data-id="${artist._id}" data-name="${artist.name}">
            <div class="swap-off tooltip tooltip-open tooltip-primary text-2xl" data-tip="Follow this Artist">
               <i class="bi bi-person-check"></i>
            </div>
            <div class="swap-on tooltip tooltip-open tooltip-primary text-2xl" data-tip="Unfollow this Artist">
               <i class="bi bi-person-x"></i>
            </div>
         </label>
      `: /* html */ `
         <div class="tooltip tooltip-primary" data-tip="Follow this Artist">
            <label for="require-login-modal" class="text-2xl"><i class="bi bi-person-check"></i></label>
         </div>
         `

      return /* html */ `
         <div class="relative overflow-hidden flex flex-col justify-between items-stretch gap-3 p-5 max-w-fit max-h-[500px] bg-base-200 hover:bg-base-300 duration-300 rounded-box shadow-xl gradient-border hover:cursor-grab">
            <div class="relative group z-20 self-center">
               <div class="absolute top-0 right-0 left-0 bottom-0 w-full h-full rounded-full bg-black/50 flex justify-center items-center opacity-0 duration-300 group-hover:opacity-100">
                  <!-- toggle follow/unfollow -->
                 ${toggleFollowBtn}
               </div>
               <!-- artist image -->
               <img src="${artist.avatar}" alt="" class="max-w-full h-full sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 xxl:w-52 xxl:h-48 rounded-full object-cover object-center">
            </div>
            <div class="flex flex-col gap-3">
               <a href="/#/artist/${artist._id}" class="text-base-content self-start font-medium text-lg sm:text-base hover:link truncate">${artist.name}</a>
               <p class="text-base-content/75 self-start text-base sm:text-sm">${artist.desc ?? "Artist"}</p>
            </div>
         </div>
      `;
   },
   handleEvents() {
      const followArtistTogglers = $$(".toggle-follow-artist")

      followArtistTogglers.forEach(toggle => toggle.onchange = async () => {

         const artistId = toggle.dataset.id;
         const artistName = toggle.dataset.name
         if (toggle.checked) {
            await updateArtistsCollection({ artist: artistId });
            toast("success", `You've followed ${artistName}`)
         }
         else {
            await updateArtistsCollection({ artist: artistId, action: "unfollow" });
            toast("info", `You've unfollowed ${artistName}`)
            if (location.href.includes("library"))
               reRenderContent("#sub-page-content", await artistSubPage.render())
         }
      })

   },
};

export default artistCard;
