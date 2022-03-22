<template>
	<view class="index">
		<musichead :title="navtitle" :style="tohidde?'display:none;':''"></musichead>
		<view :class="tohidde?'container2':'container1'">
			<scroll-view scroll-y="true">
				<view class="background">
					<view class="news">
						<view class="first">
							<view class="first-title">
								<view class="title-content">
									<text>功垂祖国</text>
								</view>
								<view class="title-content">
									<view class="title-margin"></view>
									<view>
										<text>泽被长淮</text>
									</view>
								</view>
							</view>
							<img src="@/static/images/2-1.png" alt="">
						</view>
						<view class="second">
							<img src="@/static/images/2-2.png" alt="">
							<view class="second-text">
								<text>
									彭雪枫将军的一生，是革命的一生、战斗的一生、辉煌的一生。他在中国人民解放史、中华民族反侵略史和反法西斯战争史上，都写下了光辉的一页。在他短暂而光辉的一生中，表现出了一位共产党员为国家、为人民忠贞不渝的革命精神和崇高的思想品德。“中华民族英雄”“共产党人好榜样”——毛泽东、朱德等党和国家领导人的挽联，是对彭雪枫将军光辉一生的高度评价和准确概括。
								</text>
							</view>
						</view>
						<view class="third">
							<view class="third-text">
								<text>
									天地英雄气，浩然壮国魂。彭雪枫将军的不朽功绩和英勇抗战的伟大精神，在皖东北、在江淮，乃至全国人民心中，树起了一座永远的丰碑，激励着一代又一代中华儿女砥砺前行。
								</text>
							</view>
							<img src="@/static/images/2-3.png" alt="">
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="botter">
			<view class="min-player-container">
				<!-- 播放按键 -->
				<view class='control'>
					<text class="iconfont" @tap="musicPlay" :class="isPlay"></text>
				</view>
				<!-- 进度条组件 -->
				<view class='music-control'>
					<!-- <playback></playback> -->
					<view class="playback-box">
						<text class='text'>{{currentTime}}</text>
							<slider 
							class="slider"
							block-size="16"
							activeColor="#F0AD4E"
							min = 0
							max = 100
							:value= "sliderValue"
							@change = "sliderChange"/>
						<text class='text'>{{durationTime}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import"@/common/iconfont.css"
	import musichead from "@/components/musichead/musichead.vue"
	import { songUrl } from "@/common/api.js"
	let _durationTimeNum = 74;
	let status = false;
	export default {
		data() {
			return {
				isPlay: "icon-bofang",
				sliderValue: 0,
				currentTime: "00:00",
				durationTime: "00:00",
				tohidde: false,
				navtitle:'丰 碑 篇',
			}
		},
		components: {
			musichead,
			// playback
		},
		onLaunch:function(){
			plus.screen.lockOrientation('portrait-primary');
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.navtitle
			});
			// let info = uni.createSelectorQuery().select(".head");
			// info.boundingClientRect(function(data){
			// 	console.log(data.style);
			// }).exec();
	// 		info.boundingClientRect(function(data) { //data - 各种参数
	// 			console.log(data.width)  // 获取元素宽度
	// 　　    }).exec();
			// let pageNav = document.createElement("style");
			// style.type = 'text/css';
			// style.innerHTML="uni-page-head,.uni-page-head{display:none;}";
			// console.log(pageNav[0].style);
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				// let pageNav = document.getElementsByTagName("musichead");
				// alert(pageNav);
				this.tohidde=true;
			}
			let musicId = 33894312;
			this.getMusicInfo(musicId);
		},
		onHide(){
			this.bgAudioMannager.pause();
		},
		methods: {
			handleTime(time){
				let minute = Math.floor(time  / 60);
				let second = Math.floor(time % 60);
				minute = (String(minute).length == 1) ? ('0' + minute): minute;
				second = (String(second).length == 1) ? ('0' + second): second;
				return minute +':'+second;
			},
			getMusicInfo(musicId){
				this.durationTime = String(this.handleTime(_durationTimeNum));
				// Promise.all([songUrl(musicId)]).then((res)=>{
					// let res =songUrl(musicId);
					// if(res[0][1].data.code == 200){
					// 	// this.bgAudioMannager = uni.createInnerAudioContext();
					// 	this.bgAudioMannager.autoplay = false;
					// 	// this.innerAudioContext.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
					// 	this.bgAudioMannager.src = res[0][1].data.data[0].url || '';
					// 	console.log(res[0][1].data.data[0].url);
					
					// 音频播放器实例化
					this.bgAudioMannager = uni.createInnerAudioContext();
					// 监听播放状态
					this.bgAudioMannager.onPlay(() => {
						// this.sliderValue = sliderValue;
						// 修改为停止图标
						this.isPlay = "icon-zanting";
					});
					// 监听暂停状态
					this.bgAudioMannager.onPause(()=>{
						// 修改为播放图标
						this.isPlay = "icon-bofang";
						// 设置起始时间位置
						this.bgAudioMannager.startTime = this.sliderValue/ 100 * _durationTimeNum;
					});
					// 监听音频自然结束事件
					this.bgAudioMannager.onEnded(()=>{
						// 滑动条归零
						this.sliderValue = 0;
						// 渲染起始时间
						this.currentTime = "00:00";
						// 音频起始位置设为零
						this.bgAudioMannager.startTime = 0;
						// 设置要跳至的位置
						this.bgAudioMannager.seek(0);
					})
					// 播放进度监听
					this.bgAudioMannager.onTimeUpdate(() => {
						// 获取当前音频播放位置
						let currentTimeNum = this.bgAudioMannager.currentTime;
						// 设置滑块值
						if(currentTimeNum != 0){
							this.sliderValue = currentTimeNum / _durationTimeNum  * 100;
							// 渲染起始时间
							this.currentTime = String(this.handleTime(currentTimeNum));
						}
					});
					// 	this.bgAudioMannager.onError((res) => {
					// 	  console.log(res.errMsg);
					// 	  console.log(res.errCode);
					// 	});
					// }
				// });
			},
			musicPlay(){
				// 如果当前播放器问暂停状态则播放，否则播放
				if(this.bgAudioMannager.paused){
					// 不自动播放
					this.bgAudioMannager.autoplay = false;
					// 设置播放音频地址
					this.bgAudioMannager.src = 'http://project.xianyiculture.com/audio_guide/mp3/2_fengbei.mp3';
					// console.log(this.bgAudioMannager);
					if(status){
						// 计算滑块值相应的时间
						let position = this.sliderValue / 100 * _durationTimeNum;
						// 设置起始时间位置
						this.bgAudioMannager.startTime = position;
						// 起始事件
						this.currentTime = String(this.handleTime(position));
						status = false;
					}
					// 播放音乐
					this.bgAudioMannager.play();
				} else {
					// 停止音乐
					this.bgAudioMannager.pause();
				}
			},
			sliderChange(e) {
				status = true;
				// if(!_isMovingSlider){
				// 获取滑块拖动的值
				this.sliderValue = e.detail.value;
				// 计算滑块值相应的时间
				let position = e.detail.value / 100 * _durationTimeNum;
				// 起始事件
				this.currentTime = String(this.handleTime(position));
				// 设置要跳至的位置
				this.bgAudioMannager.seek(position);
				// }
			},
		}
	}
</script>

<style scoped lang="scss">
	.container1{
		width:100%;
		height:calc(100vh - 238rpx);
		overflow:hidden;
	}
	
	.container2{
		width:100%;
		height:calc(100vh - 118rpx);
		overflow:hidden;
	}
	scroll-view{
		height:100%;
		width:100%;
	}
	.background{
		background-image:url('@/static/images/background-pic.jpg');
		// background-image:url('@/static/images/background-pic2.png');
		background-size: 100% auto;
		background-repeat:no-repeat;
	}
	.news{
		margin: 0 74rpx;
		// height: 1800rpx;
		
	}
	.first{
		height:460rpx;
		padding: 250rpx 0 32rpx 0;
		display:flex;
		justify-content:space-between;
	}
	.first .first-title{
		width: 228rpx;
		height: 460rpx;
		font-size: 55rpx;
		line-height: 62rpx;
		padding: 10rpx;
		display:flex;
		flex-wrap:wrap;
		// opacity: 0.4;
	}
	.first-title .title-content{
		width: 55rpx;
		margin: 26rpx;
		// background-color:#4CD964;
	}
	.title-content .title-margin{
		padding-top:156rpx;
	}
	.first img{
		width: 325rpx;
		height: 440rpx;
		margin: 12rpx 10rpx 9rpx 10rpx;
	}
	.second{
		height:424rpx;
		padding: 32rpx 0 10rpx 0;
		display:flex;
		justify-content:space-between;
	}
	.second img{
		width:270rpx;
		height:404rpx;
		margin:10rpx 10rpx 10rpx 20rpx;
	}
	.second .second-text{
		width: 318rpx;
		// line-height:30rpx;
		line-height:32rpx;
		font-size: 24rpx;
		transform: scale(calc(10 / 11));
		text-indent:40rpx;
		margin: -20rpx -24rpx;
		// margin: 30rpx -24rpx;
		// margin: 0rpx 10rpx 0rpx 0rpx;
		// background-color:#F0AD4E;
	}
	.third{
		height:360rpx;
		padding: 10rpx 0 226rpx 0;
		display:flex;
		justify-content:space-between;
	}
	.third img{
		width:240rpx;
		height:344rpx;
		margin: 8rpx 10rpx;
	}
	.third .third-text{
		width: 320rpx;
		// 添加
		margin-top:80rpx;
		// line-height:30rpx;
		line-height:36rpx;
		font-size: 24rpx;
		transform: scale(calc(10 / 11));
		text-indent:40rpx;
		// margin: 0rpx 10rpx 0rpx 0rpx;
		// background-color:#F0AD4E;
		// opacity: 0.4;
	}
	.botter{
		width:100%;
		height: 118rpx;
		background-color: #a73d3f;
	}
	.min-player-container{
		width:94%;
		position:fixed;
		height: 118rpx;
		margin:0 3%;
		display:flex;
		align-items:center;
	}
	.control{
		flex: 0 0 60rpx;
		color:#ffffff;
		flex-grow: 0;
		
	}
	.iconfont.icon-bofang,.icon-zanting{
		font-size:84rpx;
	}
	.music-control{
		heightr:100%;
		width:100%;
		flex-grow: 1;
	}
	.playback-box{
		width:100%;
		margin:10rpx auto;
		display:flex;
		justify-content:space-between;
		align-items:center;
	}
	.slider {
		position: relative;
		width: 100%;
		margin:0 10rpx;
	}
	.bar{
		flex:1;
		height: 8rpx;
		background-color:#eee;
		position:relative;
		.icon{
			position:absolute;
			top:50%;
			left:0;
			transform:translate(0,-50%);
			display: block;
			width: 24rpx;
			height: 24rpx;
			border:6rpx solid #fff;
			background-color:red;
			border-radius: 50%;
			&::before{
				content:'';
				position:absolute;
				top:-20rpx;
				left:-20rpx;
				right:-20rpx;
				bottom: -20rpx;
			}
		}
	}
	.text{
		color: #ccc;
		font-size: 24rpx;
		margin:0 20rpx;
	}
</style>
