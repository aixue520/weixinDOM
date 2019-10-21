<template>
	<view class="main">
		<!-- 输入框按钮(优化) -->
		<!-- <div class="alert flex flex-ae flex-pc">
			<div class="alert_con pad15 ftc">
				<input type="text" placeholder="请输入内容" cursor-spacing="50" />
				<span class="cfff mt20 mb20">确定</span>
			</div>
		</div> -->
		<!-- 倒计时问题 -->
		<!-- <navigator url="../time/index">时间戳</navigator> -->

		<!-- swiper个数少于设定不会显示 -->
		<!-- <swiper class="swiper" display-multiple-items="1" style="height: 800rpx;">
			<swiper-item v-for="(item,index) in images" :key="index">
				<image class="w100" :src="item.url"></image>
			</swiper-item>
		</swiper> -->
		<!-- scroll-into-view 定位注意事项-->
		<!-- <view class="tab flex flex-ac ftc">
			<view class="it1" @tap="viewScroll" data-id="1">A</view>
			<view class="it1" @tap="viewScroll" data-id="2">B</view>
			<view class="it1" @tap="viewScroll" data-id="3">C</view>
		</view>
		<scroll-view scroll-y="true" class="scroll-Y" :scroll-into-view="scrollid">
			<view id="demo1" class="classdemo">
				<view v-for="(item,index) in list" :key="index">{{item}}</view>
			</view>
		</scroll-view> -->

		<!-- 头条和微信渲染图片的区别 -->
		<!-- <eImg src="http://img1.dev.epetbar.com/2016-03/26/10/4a0047e94a23100bd602d5f6101803c3.jpg" width="300" height="300" lazyLoad="true" cut="b" mode="aspectFit" epetClass="img180"></eImg> -->
		<!-- 头条生成二维码 -->
		<!-- 举例，需要生成首页的带参数的二维码 -->
		<!-- var a = "pages/index/index?menu_key=menu_param&menu_param=219&pet_type=dog"; -->
		<!-- 头条生成二维码的链接为 -->
		<!-- 'sslocal://microapp?app_id=tt708c0631efa6ff02&start_page='+encodeURIComponent(a)+'&launch_from=ad_test' -->
		<!-- 最后可用任何生成二维码的工具来将链接生成二维码图片（无限制） -->

		<!-- 画图/保存图片 -->
		<view class="canvas-box">
			<canvas canvas-id="myCanvas" style="width:100%;height:900rpx;"></canvas>
		</view>
		<view class="ftc">
			<button class="btn" @tap="save">保存</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollid: '',
				list: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16', 'A17',
					'A18', 'A19'
				],
				images: [{
					url: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/resultsbg2.png'
				}, {
					url: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/resultsbg2.png'
				}, {
					url: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/resultsbg2.png'
				}],
				// canvas
				nickName: '测试名',
				avatarUrl: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/list1.png',
				score: '99', //分数
				rank_title: '点赞点赞', //右上角标题
				rank_content: '帅呆了帅呆了帅呆了帅呆了帅呆了帅呆了帅呆了帅呆了帅呆了帅呆了', //内容
				permission: '所有解释权...',
				img1: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/resultsbg.png', //预先下载的图片
				img2: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/score.png',
				img3: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/tx.png', //二维码图片
				img4: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/resultstip.png',
				img5: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/resultspeople.png',
				img6: 'https://static.epetbar.com/static_web/wap/dist/images/asiaPet/resulttip.png',
			}
		},
		onLoad() {

		},
		onShow() {
			this.drawtest();
			// this.drawCanvas();
		},
		methods: {
			/**
			 * scroll-into-view滚动位置案例
			 */
			viewScroll: function(e) {
				let _this = this;
				let id = e.currentTarget.dataset.id;
				let list1 = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16',
					'A17', 'A18', 'A19'
				];
				let list2 = ['B1', 'B2', 'B3', 'B4', 'B5'];
				// let list3 = ['C1', 'C2', 'C3', 'C4', 'C5'];
				let list3 = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16',
					'C17', 'C18', 'C19'
				];

				if (id == 1) {
					this.list = list1;
				} else if (id == 2) {
					this.list = list2;
				} else {
					this.list = list3;
				}
				_this.scrollid = 'demo1';
				// this.scrollid = '';
				// setTimeout(function() {
				// 	_this.scrollid = 'demo1';
				// }, 10);
			},
			drawtest:function(){
				const ctx = uni.createCanvasContext('myCanvas');
				ctx.rect(10, 10, 300, 75)
				ctx.setFillStyle('red')
				ctx.fill()
				ctx.draw()
			},
			/**
			 * canva画布
			 */
			drawCanvas: function() {
				var that = this;
				const ctx = uni.createCanvasContext('myCanvas');

				let res = uni.getSystemInfoSync();
				let rpxnum = res.windowWidth / 750;
				// let rpxnum = 0.5;

				//绘制背景图片
				ctx.drawImage(this.img1, 30 * rpxnum, 0, 690 * rpxnum, 900 * rpxnum)
				//绘制头像
				ctx.save();
				ctx.beginPath();
				ctx.arc(130 * rpxnum, 120 * rpxnum, 60 * rpxnum, 0, 2 * Math.PI);
				// 从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip 方法前通过使用 save 方法对当前画布区域进行保存，并在以后的任意时间通过restore方法对其进行恢复。
				ctx.clip();
				ctx.drawImage(this.avatarUrl, 70 * rpxnum, 60 * rpxnum, 120 * rpxnum, 120 * rpxnum);
				ctx.restore();
				//绘制用户名
				ctx.fillStyle = '#333333';
				// ctx.font = "16px bold Arial";
				ctx.setFontSize(32 * rpxnum)
				ctx.fillText(this.nickName, 220 * rpxnum, 130 * rpxnum);
				//绘制标题
				// ctx.fillStyle = '#fff'; //头条颜色值不能简写
				// ctx.font = "15px bold Arial";
				ctx.drawImage(this.img4, 470 * rpxnum, 20 * rpxnum, 186 * rpxnum, 113 * rpxnum)
				ctx.setFillStyle('#ffffff'); //头条颜色值不能简写
				ctx.setFontSize(30 * rpxnum)
				ctx.setTextAlign('center')
				ctx.fillText(this.rank_title, (750 - 195) * rpxnum, rpxnum * 75);
				// 绘制分数
				ctx.drawImage(this.img2, 229 * rpxnum, 200 * rpxnum, 292 * rpxnum, 80 * rpxnum);
				// ctx.fillStyle = '#ffba3e';
				// ctx.font = "30px bold";
				ctx.setFillStyle('#ffba3e'); //头条颜色值不能简写
				ctx.setFontSize(60 * rpxnum)
				ctx.setTextAlign('center');
				ctx.setTextBaseline('middle')
				ctx.fillText(this.score, 350 * rpxnum, 250 * rpxnum);
				// ctx.font = "15px bold";
				// ctx.font = 'italic bold 15px cursive'
				ctx.setFontSize(30 * rpxnum)
				ctx.fillText("分", 420 * rpxnum, 250 * rpxnum);
				ctx.drawImage(this.img5, 200 * rpxnum, 360 * rpxnum, 350 * rpxnum, 230 * rpxnum)
				// 线条
				ctx.moveTo(100 * rpxnum, 650 * rpxnum);
				ctx.lineTo(650 * rpxnum, 650 * rpxnum);
				ctx.lineWidth = 1 * rpxnum;
				ctx.strokeStyle = "#e7e7e7";
				ctx.stroke();
				// 提示
				ctx.setFillStyle('#333');
				ctx.setFontSize(26 * rpxnum);
				ctx.setTextAlign('left');
				ctx.fillText("玩小游戏冲总榜赢大奖！", 100 * rpxnum, 700 * rpxnum);
				ctx.drawImage(this.img6, 100 * rpxnum, 730 * rpxnum, 56 * rpxnum, 56 * rpxnum)
				ctx.setFillStyle('#999');
				ctx.setFontSize(24 * rpxnum);
				ctx.setTextAlign('left');
				ctx.fillText("海际贸易", 170 * rpxnum, 758 * rpxnum);
				//绘制提示
				// ctx.fillStyle = '#b77fec';
				// ctx.font = "11px bold Arial";
				ctx.setFillStyle('#b77fec'); //头条颜色值不能简写
				ctx.setFontSize(22 * rpxnum)
				ctx.setTextAlign('center');
				ctx.fillText(this.permission, 375* rpxnum, 830 * rpxnum);
				//绘制二维码
				ctx.drawImage(this.img3, 520 * rpxnum, 680 * rpxnum, 100 * rpxnum, 100 * rpxnum);

				ctx.draw();
			},
			save: function() {
				var _this = this;
				uni.canvasToTempFilePath({
					canvasId: 'myCanvas',
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(res2) {
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 2000,
									mask: true
								})
							},
							fail: function() {
								uni.showToast({
									title: '图片保存失败,请重试',
									icon: 'none',
									duration: 2000,
									mask: true
								})
							}
						})
					},
					fail: function() {
						uni.showToast({
							title: '图片保存失败,请重试',
							icon: 'none',
							duration: 2000,
							mask: true
						})
					}
				})
			}
		}
	}
</script>

<style>
	.alert {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.alert .alert_con {
		width: 80%;
		background: #fff;
		border-radius: 5rpx;
	}

	.alert .alert_con input {
		border: 1rpx solid #e7e7e7;

	}

	.alert .alert_con span {
		display: inline-block;
		width: 50%;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		background: #11C258;
	}

	/* scroll-into-view */
	.tab {
		position: fixed;
		width: 100%;
		height: 5vh;
		line-height: 5vh;
		left: 0;
		top: 0;
		z-index: 1;
		background: #fff;
	}

	.scroll-Y {
		height: 95vh;
		margin-top: 5vh;
		background: #CD5C5C;
	}

	.classdemo view {
		height: 200rpx;
		line-height: 200rpx;
	}

	.canvas-box {
		width: 100%;
		height: 900rpx;
	}

	.img180 {
		width: 180rpx;
		height: 180rpx;
	}
</style>
