<template>
	<view class="playback-box">
		<text class='text'>0:00</text>
			<slider 
			class="slider"
			block-size="16"
			activeColor="#F0AD4E"
			min = "0"
			max = "100"
			:value= "sliderValue"
			@change = "sliderChange"/>
		<!-- <view class="bar" ref="bar">
			<text class="icon" ref="icon" @touchstart="start"></text>
		</view> -->
		<text class='text'>4:00</text>
	</view>
</template>

<script>
	const backgroundAudioManager = uni.getBackgroundAudioManager();
	let _isMovingSlider = false;
	let _durationTimeNum = 0;
	export default {
		name:"playback",
		data() {
			return {
				currentTime:"00:00",
				sliderValue: 0,
			};
		},
		 onReady(){
		},
		methods:{
			start(ev){
				// console.log(this.$refs.icon);
				const icon = this.$refs.icon;
				// console.log(icon)
				// console.log(icon.$el.style)
				// console.log("touchstart")
				// 记录开始的位置
				const startX = ev.changedTouches[0].clientX;
				const touchmoveCallback = (ev) => {
					// console.log("touchmove")
					const offsetX = ev.changedTouches[0].clientX - startX;
					console.log(offsetX)
					// 手指移动多少就让icon标签移动多少
					// console.log(this.$refs.icon.$el.style.height);
				}
				const touchendCallback = (ev) => {
					// console.log("touchend")
					// 移除监听
					document.removeEventListener('touchmove',touchmoveCallback);
					document.removeEventListener('touchend',touchendCallback);
				}
				// 添加监听
				document.addEventListener('touchmove',touchmoveCallback);
				document.addEventListener('touchend',touchendCallback);
			},
			musicPlay(){
				
			},
			handleTime(time){
				let minute = Math.floor(time / 1000 / 60);
				let second = Math.floor(time / 1000 % 60);
				minute = (String(minute).length == 1) ? ('0' + minute): minute;
				second = (String(second).length == 1) ? ('0' + second): second;
				return minute +':'+second;
			},
			sliderChange(ev){
				this.sliderValue = ev.detail.value;
				let position = ev.detail.value/100*_durationTimeNum;
				this.currentTime = String(this.handleTime(position))
				// backgroundAudioManager.seek(position / 1000)
			}
		}
	}
</script>

<style scoped lang="scss">
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
