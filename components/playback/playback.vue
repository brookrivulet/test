<template>
	<view class="playback-box">
		<text class='text'>0:00</text>
		<!-- <view class="bar" ref="bar"> -->
		<view class="bar" @touchstart="stat">
			<text class="icon" ref="icon"></text>
		</view>
		<text class='text'>4:00</text>
	</view>
</template>

<script>
	export default {
		name:"playback",
		data() {
			return {
				
			};
		},
		 onReady(){
			const bar = this.$refs.bar;
			const icon = $this.$refs.icon;
			console.log(this.$refs);
			icon.addEventListener('touchstart',(ev)=>{
				console.log('touchstart');
			})
		},
		methods:{
			stat(e){
				console.log(e);
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
	.bar{
		flex:1;
		height: 8rpx;
		background-color:#eee;
		position:relative;
		.icon{
			position:absolute;
			top:50%;
			left:0;
			transform:translate(0%,-50%);
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
		margin:0 10rpx;
	}
</style>
