<template>
	<view class="uni-swipe-action">
		<view :class="{'uni-swipe-action--show':isShowBtn}" :style="{'transform':transformX,'-webkit-transform':transformX}" class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @touchcancel="touchEnd" @click="bindClickCont">
			<view class="uni-swipe-action__content">
				<slot />
			</view>
			<view :id="elId" class="uni-swipe-action__btn-group">
				<div v-for="(item,index) in options" :key="index" :style="{backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',color: item.style && item.style.color ? item.style.color : '#FFFFFF',fontSize: item.style && item.style.fontSize ? item.style.fontSize : '28upx'}" class="uni-swipe-action--btn" @click="bindClickBtn(item,index)">
					{{ item.text }}
				</div>
			</view>
		</view>
		<view v-if="isShowBtn" class="uni-swipe-action__mask" @click="close" @touchmove.stop.prevent="close" />
	</view>
</template>

<script>
	export default {
		name: 'UniSwipeAction',
		props: {
			isDrag: {
				type: Boolean,
				default: false
			},
			isOpened: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			autoClose: {
				type: Boolean,
				default: true
			},
			params:{
				type:Array,
				default () {
					return []
				}
			},
			options: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			/**
			 * TODO 兼容新旧编译器
			 * 新编译器（自定义组件模式）下必须使用固定数值，否则部分平台下会获取不到节点。
			 * 随机数值是在旧编译器下使用的，旧编译器模式已经不推荐使用，后续直接废掉随机数值的写法。
			 */
			const elId = this.__call_hook ? 'uni_swipe_action' : `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				elId: elId,
				isShowBtn: false,
				btnGroupWidth:0,
				transformX: 'translateX(0px)'
			}
		},
		watch: {
			isOpened(newValue, oldValue) {
				this.isShowBtn = !!newValue
				this.endMove()
			}
		},
		created() {
			this.direction = ''
			this.startX = 0
			this.startY = 0
			this.btnGroupWidth = 0
			this.isMoving = false
			this.startTime = 0
		},
		// #ifdef H5
		mounted() {
			this.getSize()
		},
		// #endif
		// #ifndef H5
		onReady() {
			this.getSize()
		},
		// #endif
		methods: {
			getSize() {
				//#ifdef !MP-TOUTIAO
				uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
					this.btnGroupWidth = ret[0].width
				})
				//#endif
				if (this.isOpened) {
					this.isShowBtn = true
					this.endMove()
				}
			},
			bindClickBtn(item, index) {
				this.$emit('click', {
					text: item.text,
					style: item.style,
					index: index,
					params:this.params
				})
			},
			bindClickCont(e) {
				if (this.isShowBtn && this.autoClose) {
					this.isShowBtn = false
					this.endMove()
				}
			},
			touchStart(event) {
				var _self = this;
				this.startTime = event.timeStamp
				this.startX = event.touches[0].pageX
				this.startY = event.touches[0].pageY
				//#ifdef MP-TOUTIAO
				uni.createSelectorQuery().select(`#${this.elId}`).boundingClientRect().exec((ret) => {
					_self.btnGroupWidth = ret[0].width
					//console.log(_self.btnGroupWidth,11111111)
				})
				//#endif
			},
			touchMove(event) {
				if (this.direction === 'Y' || this.disabled) {
					return
				}
				var moveY = event.touches[0].pageY - this.startY
				var moveX = event.touches[0].pageX - this.startX
				if (!this.isMoving && Math.abs(moveY) > Math.abs(moveX)) { // 纵向滑动
					this.direction = 'Y'
					return
				}
				this.direction = moveX > 0 ? 'right' : 'left'
				this.isMoving = true
				if (this.isDrag) {
					let movedLength = this.isShowBtn ? -this.btnGroupWidth : 0
					if (movedLength + moveX >= 0) {
						this.transformX = `translateX(0px)`
						return
					}
					if (-movedLength - moveX >= this.btnGroupWidth) {
						this.transformX = `translateX(${-this.btnGroupWidth}px)`
						return
					}
					if (movedLength - moveX > 0) {
						this.transformX = `translateX(${moveX}px)`
					} else {
						if (moveX >= -this.btnGroupWidth) {
							this.transformX = `translateX(${moveX - this.btnGroupWidth}px)`
						}
					}
				}
			},
			touchEnd(event) {
				this.isMoving = false
				if (this.direction !== 'right' && this.direction !== 'left') {
					this.direction = ''
					return
				}
				if (this.isDrag) {
					let movedLength = Math.abs(Number(this.transformX.slice(11, -3)))
					let movedTime = event.timeStamp - this.startTime
					this.isShowBtn = movedLength >= this.btnGroupWidth / 2
					if (movedTime > 50 && movedTime < 300 && movedLength > 20) { // 在这个时间里面，且滑动了一定的距离
						if (this.direction === 'right') {
							this.isShowBtn = false
						} else {
							this.isShowBtn = true
						}
					}
				} else {
					if (this.direction === 'right') {
						this.isShowBtn = false
					} else {
						this.isShowBtn = true
					}
				}

				this.endMove()
			},
			endMove() {
				if (this.direction === 'Y' || this.disabled) {
					this.direction = ''
					return
				}
				if (this.isShowBtn) {
					this.transformX = `translateX(${-this.btnGroupWidth}px)`
					this.$emit('opened')
				} else {
					this.transformX = 'translateX(0px)'
					this.$emit('closed')
				}
				this.direction = ''
			},
			close() {
				this.isShowBtn = false
				this.endMove()
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.uni-swipe-action {
		width: 100%;
		overflow: hidden
	}

	.uni-swipe-action__container {
		position: relative;
		background-color: #fff;
		width: 200%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		transition: transform 350ms cubic-bezier(.165, .84, .44, 1)
	}

	.uni-swipe-action__content {
		width: 50%
	}

	.uni-swipe-action__btn-group {
		display: flex;
		flex-direction: row
	}

	.uni-swipe-action--show {
		position: relative;
		z-index: 1000
	}

	.uni-swipe-action--btn {
		padding: 0 32upx;
		color: #fff;
		background-color: #c7c6cd;
		font-size: 28upx;
		display: inline-flex;
		text-align: center;
		flex-direction: row;
		align-items: center
	}

	.uni-swipe-action__mask {
		display: block;
		opacity: 0;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%
	}
</style>