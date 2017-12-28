<template>
	<div id="personalPage" class="content" v-cloak>
		<div class="header-logo">
			<img src="../../assets/images/header_bg@3x.png" />
			<div class="cust-icon">
				<img :src="icon" @click="goMsg()">
				<p>{{account}}</p>
			</div>
			<div class="balance-coupon">
				<div>
					<div class="balance" @click="goRecharge()">
						<div>{{userBlance}}</div>
						<p>账户余额</p>
					</div>
					<div class="coupon" @click="goCoupons()">
						<div>{{voucherCount}}</div>
						<p>优惠券</p>
					</div>
				</div>
				<div class="recharge-tab" @click="goRecharge()">
					<img class="profile" src="../../assets/images/personal/profile-arrow@3x.png">
					<div class="recharge-gift">
						<img src="../../assets/images/personal/g-recharge@3x.png"> 充值立送现金券哦~
					</div>
					<div class="go-recharge">
						马上充值
						<img src="../../assets/images/personal/recharge@3x.png">
					</div>
				</div>
			</div>
		</div>
		<div class="order-tap">
			<ul>
				<li @click="goNoPayOrders()">
					<img src="../../assets/images/personal/needtopay@3x.png" />
					<p>待付款</p>
					<small v-if="isShowObligations">{{obligations}}</small>
				</li>
				<li @click="goNoReceiveOrders()">
					<img src="../../assets/images/personal/no-receive@3x.png" />
					<p>待收货</p>
					<small v-if="isShowTobereceived">{{tobereceived}}</small>
				</li>
				<li @click="goNoCommentOrders()">
					<img src="../../assets/images/personal/no-comment@3x.png" />
					<p>待评价</p>
					<small v-if="isShowTobeevaluated">{{tobeevaluated}}</small>
				</li>
				<li @click="goHistoryget()">
					<img src="../../assets/images/personal/historyget@3x.png" />
					<p>退货/售后</p>
					<small v-if="isShowRefund">{{refund}}</small>
				</li>
				<li @click="goAllOrders()" class="orders">
					<img src="../../assets/images/personal/myorders@3x.png" />
					<p>我的订单</p>
				</li>
			</ul>
		</div>
		<div class="center-nav">
			<ul class="border-line">
				<li @click="goGroup()">
					<img src="../../assets/images/personal/mytg@3x.png" />
					<p>我的团购</p>
				</li>
				<li @click="goAddress()">
					<img src="../../assets/images/personal/location@3x.png" />
					<p>收货地址</p>
				</li>
				<li @click="goFavorite()">
					<img src="../../assets/images/personal/favorite@3x.png" />
					<p>我的收藏</p>
				</li>
				<li @click="goAboutUS()">
					<img src="../../assets/images/personal/aboutus@3x.png" />
					<p>关于我厨</p>
				</li>
			</ul>
			<ul>
				<li @click="goHelp()">
					<img src="../../assets/images/personal/help@3x.png" />
					<p>帮助中心</p>
				</li>
				<li @click="goYjfk()">
					<img src="../../assets/images/personal/yjfk@3x.png" />
					<p>意见反馈</p>
				</li>
				<li @click="goSetup()">
					<img src="../../assets/images/personal/setup@3x.png" />
					<p>设置中心</p>
				</li>
				<li>
					<a href="tel:4008527957" class="ui-link">
						<img src="../../assets/images/personal/kefu@3x.png" />
						<p>客服电话</p>
					</a>
				</li>
			</ul>
		</div>
		<div class="ad" @click="sharePage()" v-if="adImg">
			<img :src="adImg" />
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	import Footer from '@/components/footer/footer'
	import * as Common from '@/assets/js/common'
	import api from '@/fetch/api'
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	export default {
		name: 'personalPage',
		components: {
			'v-footer': Footer,
		},
		data() {
			return {
				selected: 'personal',
				account: "未登录", //账号
				icon: "../../static/img/cust-icon-nologin.png", //用户图像
				userBlance: 0, //账户余额
				voucherCount: 0, //优惠券数量
				obligations: 0, //待付款数量
				tobereceived: 0, //待收货数量
				tobeevaluated: 0, //待评价数量
				refund: 0, //退货、售后数量
				isShowObligations: false, //是否显示订单数量
				isShowTobereceived: false,
				isShowTobeevaluated: false,
				isShowRefund: false,
				adImg: "", //广告图
				adUrl: "" //广告跳转链接
			}
		},
		mounted() {
			this.$store.dispatch('showTabBar', true); //显示底部导航
			this.$store.dispatch('changeCurrTabId', 'personal'); //显示底部导航
			if(Common.getUserToken()) {
				this.loadData();
			}
			this.getThreeAdvertisement();
		},
		watch: {

		},
		methods: {
			loadData() { //获取个人中心数据
				api.getIndividual().then((res) => {
					if(!res.hasError) {
						var data = res.data;
						if(data.account) {
							window.localStorage.setItem("mobile", data.account);
							this.account = data.account.replace(data.account.substring(3, 7), "****");
						}
						if(data.icon) {
							this.icon = data.icon; //用户图像
						} else {
							this.icon = "../../static/img/cust-icon-defualt.png";
						}
						if(data.score > 0) {
							this.userBlance = data.score / 100; //账户余额
						}
						if(data.voucherCount > 0) {
							this.voucherCount = data.voucherCount; //优惠券
						}
						if(data.obligations > 0) {
							this.isShowObligations = true;
							this.obligations = data.obligations; // 待支付
						}
						if(data.tobereceived > 0) {
							this.isShowTobereceived = true;
							this.tobereceived = data.tobereceived; //待收货
						}
						if(data.tobeevaluated > 0) {
							this.isShowTobeevaluated = true;
							this.tobeevaluated = data.tobeevaluated; //待评价
						}
						if(data.refund > 0) {
							this.isShowRefund = true;
							this.refund = data.refund; //售后
						}
					}
				});
			},
			getThreeAdvertisement() {
				var params = {
					"type": 2
				};
				api.getThreeAdvertisement(params).then((res) => {
					if(res.data.length > 0) {
						var data = res.data[0];
						this.adImg = data.imageUrl;
						this.adUrl = data.linkUrl;
					}
				});
			},
			goRecharge() { //去充值
				//this.jumpFnc("recharge.html");
				this.jumpFnc('recharge');
			},
			goCoupons() {
				this.jumpFnc("../setUp/couponsDetail.html");
			},
			goGroup() { //我的团购
				window.localStorage.setItem("mygroupback", window.location.href);
				this.jumpFnc("../groupbuy/myGroup.html");
			},
			goAddress() { //我的地址
				this.jumpFnc("../address/myAddress.html");
			},
			goFavorite() { //收藏
				this.jumpFnc("myfavorite.html");
			},
			goAboutUS() { //关于我厨
				window.location.href = "../setUp/aboutUS.html";
			},
			goHelp() { //帮助中心
				window.location.href = "help.html";
			},
			goYjfk() { //意见反馈
				this.jumpFnc("yjfk.html");
			},
			goSetup() { //设置
				this.jumpFnc("../setUp/setUp.html");
			},
			goNoPayOrders() { //待支付订单
				this.jumpFnc("../user/myOrders.html?id=1");
			},
			goNoReceiveOrders() { //待收货订单
				this.jumpFnc("../user/myOrders.html?id=2");
			},
			goNoCommentOrders() { //待评价订单
				this.jumpFnc("../user/myOrders.html?id=3");
			},
			goHistoryget() { //售后
				this.jumpFnc("../historyget/list.html");
			},
			goAllOrders() { //全部订单
				this.jumpFnc("../user/myOrders.html?id=0");
			},
			goMsg() { //修改个人信息
				window.localStorage.setItem("urlToPerMes", window.location.href);
				this.jumpFnc("../setUp/personalMessage.html");
			},
			sharePage() { //广告跳转
				this.jumpFnc(this.adUrl);
			},
			jumpFnc(url) { //跳转之前登录状态判断
				if(Common.getUserToken()) {
					//window.location.href = url;
					this.$router.push({
						path: '/' + url
					});
				} else {
					Toast({
						message: '您还未登录'
					});
					//JsTools.msgAlert("您还未登录", 1);
					setTimeout(function() {
						Common.checkWechat();
					}, 2000);
				}
			}
		},
		computed: {
			...mapGetters([

			])
		},
	}
</script>
<style lang="scss" scoped>
	@import "../../assets/css/common-def.scss";
	.content {
		width: 100%;
		padding-bottom: 1.1rem;
		.header-logo {
			width: 100%;
			height: 5.48rem;
			img {
				width: 100%;
				height: 4.55rem;
			}
			.cust-icon {
				position: absolute;
				width: 100%;
				top: .78rem;
				left: 0;
				text-align: center;
				font-size: $size24;
				color: #fff;
				img {
					width: 1.2rem;
					height: 1.14rem;
					border-radius: .5rem;
				}
				P {
					margin-top: .4rem;
				}
			}
			.balance-coupon {
				position: absolute;
				width: 7.02rem;
				height: 2.42rem;
				top: 2.94rem;
				left: 50%;
				margin-left: -3.51rem;
				text-align: center;
				border-radius: .24rem;
				padding-top: .4rem;
				background: #fff;
				box-shadow: 1px -1px 20px rgba(34, 34, 34, 0.3);
				.balance {
					width: 50%;
					float: left;
					text-align: center;
					border-right: 1px solid $colorAcross;
					div {
						font-size: .4rem;
						color: $colorText;
					}
					p {
						font-size: $size28;
						color: $colorSubtitle;
					}
				}
				.coupon {
					width: 50%;
					float: right;
					text-align: center;
					div {
						font-size: .4rem;
						color: #011E00;
					}
					p {
						font-size: $size28;
						color: $colorSubtitle;
					}
				}
				.recharge-tab {
					position: relative;
					height: .86rem;
					line-height: .86rem;
					margin-top: .4rem;
					background: #428b0e;
					color: #fff;
					font-size: $size28;
					border-bottom-left-radius: .24rem;
					border-bottom-right-radius: .24rem;
					.profile {
						position: absolute;
						height: .2rem;
						left: 25%;
						margin-left: -.31rem;
						top: -.2rem;
						width: .63rem;
					}
					.recharge-gift {
						width: 50%;
						float: left;
						padding-left: .4rem;
						img {
							width: .33rem;
							height: .36rem;
							margin-right: .2rem;
							vertical-align: middle;
						}
					}
					.go-recharge {
						width: 50%;
						float: right;
						text-align: right;
						padding-right: .4rem;
						img {
							width: .14rem;
							height: .24rem;
							margin-left: .2rem;
							vertical-align: middle;
						}
					}
				}
			}
		}
		.order-tap {
			margin-top: .2rem;
			height: 1.78rem;
			padding: .4rem 0;
			background: #fff;
			ul {
				width: 100%;
				li {
					width: 20%;
					color: $colorSubtitle;
					font-size: $size24;
					float: left;
					text-align: center;
					img {
						height: .56rem;
						width: auto;
					}
					p {
						margin-top: .18rem;
					}
					small {
						position: absolute;
						right: 50%;
						margin-right: -.4rem;
						padding: 0 .04rem;
						top: -.14rem;
						background: $colorPromptBtn;
						min-width: .26rem;
						height: .26rem;
						border-radius: .26rem;
						color: #fff;
						line-height: .26rem;
						font-size: $size22;
						text-align: center;
					}
				}
				.orders {
					color: #243a23;
					border-left: 1px solid $colorPrompt;
				}
			}
		}
		.center-nav {
			margin-top: .2rem;
			background: #fff;
			ul {
				width: 100%;
				li {
					width: 25%;
					padding: .3rem 0;
					color: $colorSubtitle;
					font-size: $size24;
					float: left;
					text-align: center;
					img {
						height: .56rem;
						width: auto;
					}
					p {
						margin-top: .2rem;
					}
					a {
						color: $colorSubtitle;
					}
				}
			}
			.border-line {
				border-bottom: 1px solid $colorAcross;
			}
		}
		.ad {
			width: 100%;
			height: 1.5rem;
			text-align: center;
			img {
				height: 1.2rem;
				width: 6.88rem;
			}
		}
	}
</style>