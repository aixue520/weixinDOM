<template>
	<view class='ftl pl20 ft13 bgfff it1 c333'>剩余<text class='cf0'>{{leaveTime.h}}时{{leaveTime.m}}分{{leaveTime.s}}秒</text></view>
</template>

<script>
	export default {
		data() {
			return {
				setTimeEvent: '', //房子离开页面后继续倒计时
				leaveTime: {
					h: '00',
					m: '00',
					s: '00'
				}
			}
		},
		onHide: function() {
			var _this = this;
			clearInterval(_this.setTimeEvent)
		},
		onUnload: function() {
			var _this = this;
			clearInterval(_this.setTimeEvent)
		},
		onLoad() {
			// 1567094400 2019.8.30.0.0 时间戳
			//this.setTime(1567094400);
			this.setTimenew(1567094400);
		},
		methods: {
			/**
			 * 倒计时
			 */
			setTime: function(leftTime) {
				var that = this
				setInterval(function() {
					console.info(888);
					var currTime = parseInt(new Date().getTime() / 1000)
					var leaveTime = leftTime - currTime
					var h = parseInt(leaveTime / 3600)
					var m = parseInt((leaveTime - h * 3600) / 60)
					var s = (leaveTime - h * 3600) % 6
					if (h > 0 && h < 10) h = '0' + h
					if (m > 0 && m < 10) m = '0' + m
					if (s > 0 && s < 10) s = '0' + s
					if (h == 0 && m == 0 && s == 0) {
						// that.leaveTime.h=='00';
						// that.leaveTime.m=='00';
						// that.leaveTime.s=='00';
						that.$set(that.leaveTime, 'h', '00');
						that.$set(that.leaveTime, 'm', '00');
						that.$set(that.leaveTime, 's', '00');
						clearInterval(that.setTimeEvent);
					} else {
						// that.leaveTime.h==h;
						// that.leaveTime.m==m;
						// that.leaveTime.s==s;
						that.$set(that.leaveTime, 'h', h);
						that.$set(that.leaveTime, 'm', m);
						that.$set(that.leaveTime, 's', s)
					}
				}, 1000)
			},
			/**
			 * 倒计时新
			 */
			setTimenew: function(leftTime) {
				var that = this
				that.setTimeEvent = setInterval(function() {
					console.info(888);
					var currTime = parseInt(new Date().getTime() / 1000)
					var leaveTime = leftTime - currTime
					var h = parseInt(leaveTime / 3600)
					var m = parseInt((leaveTime - h * 3600) / 60)
					var s = (leaveTime - h * 3600) % 6
					if (h > 0 && h < 10) h = '0' + h
					if (m > 0 && m < 10) m = '0' + m
					if (s > 0 && s < 10) s = '0' + s
					if (h == 0 && m == 0 && s == 0) {
						// that.leaveTime.h=='00';
						// that.leaveTime.m=='00';
						// that.leaveTime.s=='00';
						that.$set(that.leaveTime, 'h', '00');
						that.$set(that.leaveTime, 'm', '00');
						that.$set(that.leaveTime, 's', '00');
						clearInterval(that.setTimeEvent);
					} else {
						// that.leaveTime.h==h;
						// that.leaveTime.m==m;
						// that.leaveTime.s==s;
						that.$set(that.leaveTime, 'h', h);
						that.$set(that.leaveTime, 'm', m);
						that.$set(that.leaveTime, 's', s)
					}
				}, 1000)
			},
		}
	}
</script>

<style>
</style>
