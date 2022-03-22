import {baseUrl} from "@/common/config.js";

// export function topList(){
// 	uni.request({
// 		url: baseUrl+"/toplist/detail",
// 		header:{
// 			"content-type":"application/json"
// 		},
// 		method: "GET",
// 		data: {},
// 		success: res => {
// 			console.log(res);
// 		},
// 		fail: () => {},
// 		complete: () => {}
// 	});
// }

export function songUrl(songId){
	return uni.request({
		url: baseUrl+"/song/url?id="+songId,
		method: "GET"
	});
}