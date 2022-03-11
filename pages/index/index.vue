<template>
	<view class="index">
		<musichead title="网易云音乐"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="news">
					<view>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</view>
				</view>
			</scroll-view>
		</view>
		<view class="botter">
			<musicplay class="play">
				
			</musicplay>
		</view>
	</view>
</template>

<script>
	import"@/common/iconfont.css"
	import musichead from "@/components/musichead/musichead.vue"
	import musicplay from "@/components/musicplay/musicplay.vue"
	export default {
		data() {
			return {
				
			}
		},
		components: {
			musichead,
			musicplay
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style scoped>
	.container{
		width:100%;
		height:calc(100vh - 278rpx);
		overflow:hidden;
	}
	.container scroll-view{
		height:100%;
		width:100%;
	}
	.news{
		margin: 0 28rpx;
	}
	.botter{
		width:100%;
		height: 118rpx;
		background-color: #a73d3f;
	}
</style>
