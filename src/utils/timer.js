function timer(duration) {
	// => duration tính = giây
	let hour = Math.floor(duration / 3600).toString(); // quy đổi ra giờ
	let min = Math.floor(duration / 60 - hour * 60).toString(); // quy đổi phút
	let sec = Math.floor(duration - hour * 3600 - min * 60).toString(); // => quy đổi giây

	min = min.length == 1 && hour >= 1 ? `0${min}` : min;
	sec = sec.length == 1 ? `0${sec} ` : sec;
	return hour == 0 ? `${min}:${sec}` : `${hour}:${min}:${sec}`;
}
export default timer;
