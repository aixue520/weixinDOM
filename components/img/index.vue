<template>
	<image :class="[epetClass?epetClass : '', 'image-block']" :src="src+imgCutUrl" :mode="mode" :lazy-load="lazyLoad" @error="imgLoadError"
	 @load="imgLoad" :style="imgStyle" :data-imgindex="imgindex">
	</image>
</template>

<script>
	export default {
		props: {
			src: String, //图片url地址
			epetClass: {
				type: String,
				default: ''
			}, //从外边加的class类
			mode: String, //图片裁剪、缩放的模式
			lazyLoad: {
				type: Boolean,
				default: true
			}, //图片是否进行懒加载
			cut: { //OSS图片裁剪规则，值可能为(a|b|c|s)
				type: String,
				default: ''
			},
			width: { //图片宽度
				type: String,
				default: '0rpx'
			},
			height: { //图片高度
				type: String,
				default: '0rpx'
			},
			imgindex: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				imgStyle: '',
				imgCutUrl: '',
				loaded: false
			};
		},
		created() {
			var _self = this;
			var reg = /\?$/;
			var pre = reg.test(_self.src) ? '' : '?';
			if (!_self.cut) {
				// _self.imgStyle = 'height:' + _self.height + '; width:' + _self.width
				return
			}
			//type[裁剪类型：a = 缩放，c = 裁剪，b = 补白, s = 索引按高度切割]
			switch (_self.cut) {
				case 'b':
					this.imgCutUrl = pre + 'x-oss-process=style/fill&$1=' + this.width + "&$2=" + this.height
					break
				case 'a':
					this.imgCutUrl = pre + 'x-oss-process=style/waterfall&$1=' + this.width
					break
				case 's':
					this.imgCutUrl = pre + 'x-oss-process=style/index_y&$1=' + this.height + "&$2="
					break
				default:
					if (parseInt(_self.height) != 0) {
						this.imgCutUrl = pre + 'x-oss-process=style/cut&$1=' + this.width + "&$2=" + this.height
					} else {
						this.imgCutUrl = pre + 'x-oss-process=style/cut&$1=' + this.width + "&$2=" + this.width
					}

			}
		},
		methods: {
			imgLoadError() {
				var _self = this;
				_self.$emit("error"); //图片发生错误时触发自定义事件。
			},
			imgLoad(e) {
				var _self = this;
				var $width = Number(e.detail.width); //获取图片真实宽度
				var $height = Number(e.detail.height);
				var ratio = $width / $height; //图片的真实宽高比例
				var $imgH = Number(_self.height);
				var width, height;
				if (parseInt(_self.height) == 0) {
					width = $width + 'rpx';
					height = $height + 'rpx'

				} else {
					width = ($imgH * ratio) + 'rpx';
					height = _self.height + 'rpx'
				}
				if (!_self.cut) {
					var imgStyle = 'width:' + width + '; height:' + height;
					_self.imgStyle = imgStyle

				}
				if (!_self.loaded) {
					_self.loaded = !_self.loaded;
					_self.$emit("load", {
						height: height,
						image: e
					}); //触发一个自定义事件，提供给父组件调用，通讯
				}
			},
		}
	}
</script>

<style>
	.image-block {
		display: block;
	}
</style>
