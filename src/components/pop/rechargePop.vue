<template id="giftPop">
	<div class="pop-up-box">
		<div class="pop-content">
			<div class="content-title">充值{{rcount}}元礼包明细</div>
			<div class="gift-detail">
				<div class="recharge-val">充{{rcount}}元送</div>
				<div class="gift-item" v-for="vs in vs">
					<div class="circle"></div>
					{{vs.displayName}} x {{vs.count}}
				</div>
			</div>
			<div class="pop-box-btn">
				<div class="ok-btn" @click="closePop()">知道了</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['vs', 'rcount', 'currshow'],
		data() {
			return {
				childCurrShow: this.currshow //①创建props属性currShow的副本--childCurrShow
			};
		},
		watch: {
			currShow(val) {
				this.childCurrShow = val; //②监听外部对props属性currShow的变更，并同步到组件内的data属性childCurrShow中
			},
			childCurrShow(val) {
				this.$emit("on-result-change", val); //③组件内对childCurrShow变更后向外部发送事件通知
			}
		},
		methods: {
			closePop() {
				this.childCurrShow = "";
			}
		},
		template: '#giftPop'
	}
</script>
<style lang="scss" scoped>
	@import "../../assets/css/common-def.scss";
	.pop-up-box {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		top: 0;
		left: 0;
		z-index: 111;
		display: none;
		.pop-content {
			width: 5.6rem;
			height: 2.4rem;
			top: 50%;
			left: 50%;
			margin-top: -1.2rem;
			margin-left: -2.8rem;
			position: fixed;
			background: #fff;
			border-radius: .16rem;
			color: $colorText;
			font-size: $size30;
			text-align: center;
			.content-tel {
				line-height: 1.4rem;
				font-size: $size32;
			}
			.pop-box-btn {
				height: 1rem;
				line-height: 1rem;
				.btn-cancel {
					width: 50%;
					float: left;
					background: #fff;
					border-top: 1px solid $colorAcross;
					border-bottom-left-radius: .16rem;
				}
				.btn-confirm {
					width: 50%;
					float: right;
					background: $colorMain;
					border-top: 1px solid $colorMain;
					border-bottom-right-radius: .16rem;
					a {
						color: #fff;
					}
				}
			}
		}
	}
</style>