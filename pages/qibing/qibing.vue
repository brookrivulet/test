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
									<text>骑兵团</text>
								</view>
							</view>
							<img src="@/static/images/3-1.png" alt="">
						</view>
						<view class="second">
							<img src="@/static/images/3-2.png" alt="">
							<view class="second-text">
								<text>
									骑兵团、《拂晓报》和拂晓剧团，素有“彭师长的三件宝”之称，而其中的骑兵团，更是彭雪枫将军和新四军第四师的一张王牌。这支铁骑如同一股红色旋风，纵横驰骋在千里淮北平原上，令无数敌人闻风丧胆。
									&emsp;&emsp;彭雪枫对骑兵团的组建和发展倾注了大量心血，他不但给骑兵们上政治课，观摩指导训练，还曾亲自进行动作示范。他常常对骑兵团战士说：“平时多流汗，战时才能少流血。”

								</text>
							</view>
						</view>
						<view class="third">
							<view class="third-text">
								<text>
									抗日战争时期，彭雪枫辗转西安、太原等地，力促国共两党联合抗日，随后组织游击队伍，开辟豫皖苏抗日根据地，并创建骑兵团、《拂晓报》和拂晓剧团，为中华民族的独立解放和世界反法西斯战争的胜利，建立了不朽的功勋。
								</text>
							</view>
							<img src="@/static/images/3-3.png" alt="">
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
	let _durationTimeNum = 82;
	let status = false;
	export default {
		data() {
			return {
				isPlay: "icon-bofang",
				sliderValue: 0,
				currentTime: "00:00",
				durationTime: "00:00",
				tohidde: false,
				navtitle:'骑 兵 团',
			}
		},
		components: {
			musichead,
		},
		onLaunch:function(){
			plus.screen.lockOrientation('portrait-primary');
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.navtitle
			});
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				this.tohidde=true;
			}
			this.getMusicInfo();
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
			getMusicInfo(){
				this.durationTime = String(this.handleTime(_durationTimeNum));
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
			},
			musicPlay(){
				// 如果当前播放器问暂停状态则播放，否则播放
				if(this.bgAudioMannager.paused){
					// 不自动播放
					this.bgAudioMannager.autoplay = false;
					// 设置播放音频地址
					this.bgAudioMannager.src = 'http://project.xianyiculture.com/audio_guide/mp3/3_qibing.mp3';
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
		background-size: 100% auto;
		background-repeat:no-repeat;
	}
	.news{
		margin: 0 74rpx;
		
	}
	.first{
		height:460rpx;
		padding: 250rpx 0 32rpx 0;
		display:flex;
		justify-content:space-between;
	}
	.first .first-title{
		width: 228rpx;
		height: 440rpx;
		font-size: 55rpx;
		line-height: 80rpx;
		padding: 10rpx;
		display:flex;
		justify-content:center;
		flex-wrap:wrap;
	}
	.first-title .title-content{
		width: 55rpx;
		margin: 80rpx;
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
		line-height:36rpx;
		font-size: 24rpx;
		transform: scale(calc(10 / 11));
		text-indent:40rpx;
		margin: -30rpx -24rpx;
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
		margin-top:38rpx;
		line-height:36rpx;
		font-size: 24rpx;
		transform: scale(calc(10 / 11));
		text-indent:40rpx;
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
