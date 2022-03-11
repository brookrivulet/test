<!-- 底部小播放器 -->
<template>
	<view class="min-player-container">
		<view class='control'>
			<text class="iconfont" :class="{'icon-bofang':!play,'icon-zanting':play}"></text>
		</view>
		<!-- 进度条组件 -->
		<view class='music-control'>
			<playback></playback>
		</view>
	</view>
</template>

<script>
	import playback from "@/components/playback/playback.vue"
	export default {
		name:"musicplay",
		data() {
			return {
				play: false,
			};
		},
		components: {
			playback
		},
	}
</script>

<style scoped>
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
</style>
