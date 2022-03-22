<template>
	<view class="index">
		<musichead :title="navtitle" :style="tohidde?'display:none;':''"></musichead>
		<view :class="tohidde?'container2':'container1'">
			<scroll-view scroll-y="true">
				<view class="background">
					<canvas style="width: 750rpx;height:1334rpx;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
					<view class="news">
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
	let _durationTimeNum = 64;
	let status = false;
	export default {
		data() {
			return {
				isPlay: "icon-bofang",
				sliderValue: 0,
				currentTime: "00:00",
				durationTime: "00:00",
				tohidde: false,
				navtitle:'生 平 篇',
				imgUrl:"@/static/images/fengye-1.png",
			}
		},
		components: {
			musichead,
		},
		onLaunch:function(){
			// 锁定屏幕 竖屏为主显
			plus.screen.lockOrientation('portrait-primary');
		},
		onLoad() {
			// 头部文字描述
			uni.setNavigationBarTitle({
				title: this.navtitle
			});
			// 判断是否为微信浏览器
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				this.tohidde=true;
			}
			// 初始化音乐信息
			this.getMusicInfo();
		},
		onReady(){
			this.createStar(this.imgUrl)
		},
		onHide(){
			this.bgAudioMannager.pause();
		},
		methods: {
			createStar (imgUrl) {
				// #ifdef MP-WEIXIN
				let starImage = ''
				uni.getImageInfo({
					src: imgUrl,
					success: res => {
						starImage = res.path
					}
				})
				// #endif
				let { requestAnimationFrame } = this
				function Star (x, y, radius) {
					this.x = x
					this.y = y
					this.sx = 0
					this.sy = 0
					this.deg = 0
					this.radius = radius
					this.ax = Math.random() < 0.5 ? 0.01 : -0.01
				}
				Star.prototype.update = function () {
					const deltaDeg = Math.random() * 0.6 + 0.2
					this.sx += this.ax
					if (this.sx >= SPEED_LIMIT_X || this.sx <= -SPEED_LIMIT_X) {
						this.ax *= -1
					}
					if (this.sy < SPEED_LIMIT_Y) {
						this.sy += G
					}
					this.deg += deltaDeg
					this.x += this.sx
					this.y += this.sy
				}
				Star.prototype.draw = function () {
					const { radius } = this
					ctx.save()
					ctx.translate(this.x, this.y)
					ctx.rotate((this.deg * Math.PI) / 180)
					// #ifdef MP-WEIXIN
					ctx.drawImage(starImage, -radius, -radius * 1.8, radius * 5, radius * 5)
					// #endif
					// #ifdef MP-ALIPAY
					ctx.drawImage(imgUrl, -radius, -radius * 1.8, radius * 5, radius * 5)
					// #endif
					ctx.restore()
				}
				const stars = []
				// 下落的加速度
				const G = 13
				// 速度上限，避免速度过快
				const SPEED_LIMIT_X = 1
				const SPEED_LIMIT_Y = 1
				const W = uni.getSystemInfoSync().windowWidth
				const H = uni.getSystemInfoSync().windowHeight
				const starCount = 10 // 星星总的数量
				let starNum = 0 // 隔多少个设定的毫秒数生成一个星星
				const deltaTime = 1 // 每次增加的星星数量
				const ctx = uni.createCanvasContext('firstCanvas',this)
				let starAllBottom = 0 // 到达底部的星星数量
				let trueStarCount = 0 // 真正生成的星星数量
				const starLoop = () => {
					requestAnimationFrame = setTimeout(() => {
						starLoop()
					}, 1000 / 60)
					ctx.clearRect(0, 0, W, H)
					starNum += deltaTime
					if (starNum > starCount && trueStarCount < starCount) {
					stars.push(new Star(Math.random() * W, 0, Math.random() * 5 + 5))
					starNum %= starCount
					trueStarCount += 1
				}
				if (!stars||stars.length==0) return;
				stars.forEach((s, i) => {
				  //重复绘制
				  s.update()
				  s.draw()
				  if (s.y >= H) {
					//大于屏幕高度的就从数组里去掉
					starAllBottom += 1
					stars.splice(i, 1)
					if (starAllBottom === starCount) {
					  clearTimeout(requestAnimationFrame)
					  // 后续操作
					  // xxxxx
					}
				  }
				})
				ctx.draw()
			}
			starLoop()
		},
	// 时间格式转换
	handleTime(time){
		let minute = Math.floor(time  / 60);
		let second = Math.floor(time % 60);
		minute = (String(minute).length == 1) ? ('0' + minute): minute;
		second = (String(second).length == 1) ? ('0' + second): second;
		return minute +':'+second;
	},
	// 初始化音乐信息
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
				// 设置滑块值，！=0 是为了防止音乐播放时滑块跳动
				if(currentTimeNum != 0){
					this.sliderValue = currentTimeNum / _durationTimeNum  * 100;
					// 渲染起始时间
					this.currentTime = String(this.handleTime(currentTimeNum));
				}
			});
			},
			// 音乐触发事件
			musicPlay(){
				// 如果当前播放器问暂停状态则播放，否则播放
				if(this.bgAudioMannager.paused){
					// 不自动播放
					this.bgAudioMannager.autoplay = false;
					// 设置播放音频地址
					this.bgAudioMannager.src = 'http://project.xianyiculture.com/audio_guide/mp3/1_shengping.mp3';
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
			// 滑动条拖动事件
			sliderChange(e) {
				status = true;
				// 获取滑块拖动的值
				this.sliderValue = e.detail.value;
				// 计算滑块值相应的时间
				let position = e.detail.value / 100 * _durationTimeNum;
				// 起始事件
				this.currentTime = String(this.handleTime(position));
				// 设置要跳至的位置
				this.bgAudioMannager.seek(position);
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
		// height: 1800rpx;
		background-image:url('@/static/images/background-pic.jpg');
		// background-image:url('@/static/images/background-pic2.png');
		background-size: 100% auto;
		background-repeat:no-repeat;
		// position: relative;
	}
	#firstCanvas{
		pointer-events:none;
		position: absolute;
		// z-index:0;
		// background-color:red;
		// opacity: 0.4;
	}
	.news{
		width:602rpx;
		height: 1800rpx;
		margin: 0 74rpx;
		background-color:#4CD964;
		// opacity:.4;
		// z-index:10;
		// position: absolute;
		
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
