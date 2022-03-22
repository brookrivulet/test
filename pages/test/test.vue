<template>
	<view>
		<canvas style="width: 300px; height: 200px;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
		<canvas style="width: 400px; height: 500px;" canvas-id="secondCanvas" id="secondCanvas"></canvas>
		<canvas style="width: 400px; height: 500px;" canvas-id="secondCanvas" id="secondCanvas" @error="canvasIdErrorCallback"></canvas>
	</view>
</template>
<script>
export default {
	data(){
		return {
			state :{
				cw: 0,
				ch: 0,
				x: 0,
				y: 0,
				r: 0
			}
		}
	},
	onLoad(){
	},
	onReady: function (e) {
		this.createPetal();
	},
	methods: {
		canvasIdErrorCallback: function (e) {
			console.error(e.detail.errMsg)
		},
		createPetal(){
			var context = uni.createCanvasContext('firstCanvas',this)
			let imgUrl = "/static/images/fengye-1.png";
			uni.getImageInfo({
				src:imgUrl,
				success: res=>{
					let starImage = res.path;
					// context.drawImage(starImage,this.state.x,this.state.y);
					this.go(context,starImage);
				}
			})
		},
		// setState(object){
		// 	this.state = 
		// }
		go(ctx,img){
			ctx.clearRect(0, 0, this.state.cw, this.state.ch);//清空画布
			// this.setState({
			  this.state.x++;
			 this.state.y++;
			// });//移动花瓣坐标
			// ctx.drawImage(img, this.state.x, this.state.y,100,100,0,0,30,30);
			ctx.drawImage(img, this.state.x, this.state.y,40,40);
			ctx.draw();
			window.requestAnimationFrame(() => {
			  this.go(ctx, img);
			});//重复清空画布，移动坐标重新画花瓣这个动作。
		}
	}
}
</script>

