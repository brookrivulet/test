<template>
	<view class="music-head" >
		
		{{ title }}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props: ['title']
	}
</script>

<style scoped>
	.music-head{
		width:100%;
		height:120rpx;
		font-size:32rpx;
		line-height:150rpx;
		text-align:center;
		color:black;
		position:relative
		}
</style>
