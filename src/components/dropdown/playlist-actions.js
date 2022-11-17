const playlistActionDropdown = {
	render(playlist) {
		return /* html */ `
            <div class="dropdown dropdown-right tooltip" data-tip="More action for ${playlist.title}">
                <label tabindex="0" class="btn btn-ghost hover:bg-transparent m-1 font-medium text-2xl"><i class="bi bi-three-dots"></i></label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64">
                    <li><label for="edit-playlist-modal"><i class="bi bi-pencil"></i> Edit this playlist</label></li>
                    <li><label for="confirm-remove-playlist-alert" class="text-error"><i class="bi bi-trash"></i> Delete this playlist</label></li>
                </ul>
            </div>`;
	},
	handleEvents() {},
};

export default playlistActionDropdown;
