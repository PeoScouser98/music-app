import instance from "../../api/axios.config";
import { $, $$ } from "../../utils/common";
import { addToPlaylist } from "../../api/features";
import formatNumber from "../../utils/format-number";
import toast from "../toast";
import audioController from "../audio-controller";
import { addToNextUp } from "../../api/features";
import timer from "../../utils/timer";
import storage from "../../utils/localstorage";

const trackCard_v2 = {
    render() {
        return /* html */ `
            <div></div>
        `
    }
}