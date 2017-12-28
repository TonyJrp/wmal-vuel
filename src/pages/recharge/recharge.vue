<template>
		<div id="recharge" class="content" v-cloak>
		    <router-view></router-view>
			<div class="header-logo" :style="isRechargeOnline?'':styleObject">
				<img src="../../assets/images/header_bg@3x.png" />
				<div class="back-content">
					<div class="back" id="backup" @click="backup()"><img src="../../assets/images/back@3x.png"></div>
					<div class="header-title">个人帐户</div>
					<div class="right-space" @click="goAccountDetail()">账户明细</div>
				</div>
				<div class="recharge-tap">
					<div class="pay-type-btn">
						<div class="online-pay" @click="onlineRecharge()"></div>
						<div class="cardpay" @click="cardRecharge()"></div>
					</div>
					<img src="../../assets/images/recharge/online-recharge@3x.png" v-if="isRechargeOnline" />
					<img src="../../assets/images/recharge/card-recharge@3x.png" v-if="!isRechargeOnline" />
					<div class="balance-info">
						<div class="account-balance-desc">
							<p>账户余额 (元)</p>
							<img src="../../assets/images/recharge/account-slogan@3x.png" />
						</div>
						<div class="account-balance">
							<small>¥</small>{{accountMoney}}
						</div>
					</div>
				</div>
			</div>
			<div class="main" :style="isRechargeOnline?'':styleObject1">
			<div class="rechange-content">
				<div class="recharge-list" v-if="isRechargeOnline">
					<ul>
						<li v-for="good in goods">
							<div class="r-info">
								充值 ¥{{good.price}}
								<p v-if="good.displayAmount" @click="showGiftDeatil(good.vouchers,good.goodsGuid, good.price)">{{good.displayAmount}}<img src="../../assets/images/recharge/icon-more@3x.png" /></p>
							</div>
							<div class="r-check-btn" @click="selectPayContent(good)">
								<img src="../../assets/images/r-selected@3x.png" v-if="goodsGuid==good.goodsGuid" />
								<img src="../../assets/images/r-unselect@3x.png" v-else />
							</div>
							<gift-pop :vs.sync="vouchers" :rcount.sync="rechargeCount" :currshow.sync="currShow" @on-result-change="onResultChange" v-if="currShow==good.goodsGuid"></gift-pop>
						</li>
					</ul>
					<div class="pay-type">
						<div class="pay-title">
							支付方式
						</div>
						<div class="pay-list">
							<div class="pay-item" v-for="paytype in payTypes" @click="selectPayType(paytype)">
								<div class="item" >
									<img class="bank-icon" :src="'../../static/img/bank-icon/'+paytype.code+'.png'" />
									<span>{{paytype.name}}</span><label v-if="paytype.description" class="preferential">特惠</label>
									<img class="select-icon" src="../../assets/images/checked@3x.png" v-if="payTypeId==paytype.id" />
									<img class="select-icon" src="../../assets/images/uncheck@3x.png" v-else />
								</div>
								<p v-if="paytype.description">{{paytype.description}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="card-recharge" v-else>
					<div class="input-ctl">
						<input @click="scrollView()" placeholder="请输入卡号" class="card-num" v-model="cardNum" />
						<img @click="clearCardNum()" src="../../assets/images/clear@3x.png" v-if="cardNum" />
					</div>
					<div class="input-ctl">
						<input @click="scrollView()" type="password" v-if="hidePwd" placeholder="请输入密码" class="card-pwd" v-model="cardPwd" />
						<input @click="scrollView()" type="text" v-else placeholder="请输入密码" class="card-pwd" v-model="cardPwd" />
						<img @click="showPwd()" v-if="hidePwd" src="../../assets/images/hidepwd@3x.png" />
						<img @click="showPwd()" v-else src="../../assets/images/showpwd@3x.png" />
					</div>
				</div>
				<div class="recharge-protocol" @click="readProtocol()">
					<!-- <img :src="hasRead?'../../assets/images/r-selected@3x.png':'../../assets/images/r-unselect@3x.png'" /> -->
					<img  v-if="hasRead" src="../../assets/images/r-selected@3x.png" />
					<img v-else src="../../assets/images/r-unselect@3x.png" />我已经阅读并同意我厨的<span @click.stop="goProtocol()">充值协议</span>
				</div>
			</div>
			</div>
			<div v-if="isRechargeOnline" :class="{activtyRecharge:(hasRead&&goodsGuid&&payTypeId)}" class="recharge-btn" @click="createOrderId()">立即充值</div>
			<div v-else class="recharge-btn" :class="{activtyRecharge:(hasRead&&cardPwd&&cardNum)}" @click="prepaidCard()">立即充值</div>
		</div>
</template>

<script>
    import PechargePop from '@/components/pop/rechargePop'
    import * as Common from '@/assets/js/common'
    import api from '@/fetch/api'
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	export default {
		name: 'recharge',
		components: {
		'gift-pop': PechargePop
	    },
	data() {
			return {
		goods: [], //充值金额list
		payTypes: [], //充值方式
		isRechargeOnline: true,
		price: 0, //在线充值额度
		goodsName: "", //充值商品名
		goodsGuid: "", //充值GUID
		cardNum: "", //卡支付卡号
		cardPwd: "", //卡支付密码
		hidePwd: true, //是否显示密码
		hasRead: true, //是否已阅读
		payTypeId: "", //支付方式Id
		payTypeName: "", //支付方式name
		vouchers: [], //礼包详情
		currShow: "", //显示当前点击的礼包详情
		rechargeCount: 0, //当前充值额度
		accountMoney: 0, //账户余额
		canclick: true, //防止重复提交
		styleObject: {
			position: 'relative'
		},
		styleObject1: {
			top: 0
		}
	}
	},
	mounted() {
		this.$store.dispatch('showTabBar',false); //显示底部导航
		this.loadData();
		if(Common.getUserToken()) {
			this.getmemberaccount();
		} else {
			JsTools.msgAlert("您还未登录", 1);
			setTimeout(function() {
				Common.checkWechat();
			}, 2000);
		}
	},
	methods: {
		scrollView() {
			var target = event.currentTarget;
			setTimeout(function() {
				target.scrollIntoViewIfNeeded();
			}, 400);
		},
		loadData() { //获取个人中心数据
			var params = {
				"version": "4.9.0",
				"source": Common.isWeiXinBrowser() ? "WechatH" : "H",
				"systemVersion": "",
				"deviceVersion": ""
			};
			api.getRechargeList(params).then((res) => {
				if(res.statusCode == "200"){
				this.goods = res.data.goods;
				this.payTypes = res.data.paytypes;
				for(let i = 0; i < this.payTypes.length;i++){
					if(this.payTypes[i].isDefault == 1){
						return this.payTypeId = this.payTypes[i].id;
					}
				}
				}
			});
		},
		prepaidCard() {
			if(!this.canclick) {
				return false;
			}
			if(!this.cardNum) {
				JsTools.msgAlert("请输入卡号", 1);
				return false;
			}
			if(!this.cardPwd) {
				JsTools.msgAlert("请输入密码", 1);
				return false;
			}

			if(!this.hasRead) {
				JsTools.msgAlert("请授权我厨的充值协议", 1);
				return false;
			}

			this.canclick = false;

			var params = {
				"parameters": '{cardNo: "' + this.cardNum + '", password: "' + this.cardPwd + '"}'
			};
			http.get($.M.apiBaseUrl, "/client/v1/member/prepaidCard", params).then((res) => {
				if(res.data && res.data.count > 0) {
					JsTools.msgAlert("充值成功", 2);
					setTimeout(function() {
						window.location.href = "paySucc.html";
					}, 2000);
				}
				this.canclick = true;
			});
		},
		onlineRecharge() {
			this.isRechargeOnline = true;
		},
		cardRecharge() {
			this.isRechargeOnline = false;
		},
		clearCardNum() { //清空卡号
			this.cardNum = "";
		},
		showPwd() { //显示密码
			this.hidePwd = !this.hidePwd;
		},
		readProtocol() { //充值协议
			this.hasRead = !this.hasRead;
		},
		selectPayContent(obj) { //选择充值额度
			this.payContent = obj;
			this.price = obj.price;
			this.goodsName = obj.goodsName;
			this.goodsGuid = obj.goodsGuid;
		},
		selectPayType(obj) { //切换充值方式
			this.payTypeId = obj.id;
			this.payTypeName = obj.name;
		},
		showGiftDeatil(vouchers, id, count) { //查看充值礼包详情
			this.vouchers = vouchers;
			this.currShow = id;
			this.rechargeCount = count;
		},
		onResultChange(val) { //监控弹窗
			this.currShow = val;
		},
		goAccountDetail() { //账户明细
			//this.$router.push({ path: '/rechargeDetail' });
			this.$router.push('/recharge/detail');
			//this.$router.push({ path: '/recharge/detail' });
			/*window.location.href = "accountDetail.html";*/
		},
		goProtocol() { //充值协议
			window.location.href = "protocol.html";
		},
		backup() { //返回个人中心
			/*if(document.referrer.indexOf("homePage")>0){
				window.location.href = document.referrer;
			}else{
				window.location.href = "personal.html";
			}*/
			this.$router.go(-1);
		},
		getmemberaccount() { //获取用户积分余额
			api.getmemberaccount().then((res) => {
				if(res.data && res.data.score > 0) {
					this.accountMoney = res.data.score / 100;
				}
			});
		},
		createOrderId() { //创建订单
			if(!this.canclick) {
				return false;
			}
			
			if(!this.goodsGuid) {
				JsTools.msgAlert("请选择充值金额", 1);
				return false;
			}
			
			if(!this.payTypeId) {
				JsTools.msgAlert("请选择支付方式", 1);
				return false;
			}
			if(!this.hasRead) {
				JsTools.msgAlert("请授权我厨的充值协议", 1);
				return false;
			}
			this.canclick = false;
			var currentTime_1 = new Date().getTime() / 1000;
			var currentTime_2 = new Date().getTime() / 1000;
			var jsondata = {
				"order": {
					"source": "H",
					"orderType": 3,
					"consignee": "",
					"deliveryTimeBegin": currentTime_1,
					"deliveryTimeEnd": currentTime_2,
					"payId": vm.payTypeId,
					"payName": vm.payTypeName,
					"goodsAmount": vm.price,
					"moneyPaid": 0,
					"orderAmount": vm.price,
					"needToPay": vm.price,
					"orderDetail": [{
						"goodsGuid": vm.goodsGuid,
						"goodsName": vm.goodsName,
						"price": vm.price
					}]
				}
			}
			api.createOrderId(jsondata).then((data) => {
				if(data.hasError) {
					JsTools.msgAlert(data["errorMessage"], 1);
				} else {
					vm.whetherPayByOrderNo(data.data.orderSN, vm.payTypeId, vm.payTypeName, data.data.id);
				}
				this.canclick = true;
			});
		},
		whetherPayByOrderNo(orderSn, paytype, payName, orderId) { //判断是否可支付
			var params = {
				"parameters": {
					"orderSn": orderSn,
					"payId": paytype,
					"payName": payName
				}
			};
			api.whetherPayByOrderNo(params).then((data) => {
				//如果没报错
				if(!data.hasError) {
					if(data.data.count >= 1) {
						//count为1，以支付 这个msg就是之前的'订单已支付'
						JsTools.msgAlert(data.data.msg, 1);
						setTimeout(function() {
							window.location.href = '../personal/personal.html';
						}, 2000);
					} else {
						//count为0,未支付
						if(paytype == 5) {
							//支付宝
							//跳转支付页面
							if(Common.isWeiXinBrowser()) {
								window.location.href = "../pay/alipay.html?orderid=" + orderId;
							} else {
								window.location.href = $.M.alipayUrl + "?orderid=" + orderId;
							}
						} else if(paytype == 6) {
							//微信支付
							window.location.href = $.M.weChatPayUrl + "?orderid=" + orderId;
						} else if(paytype == 7) {
							//建行支付
							vm.ccbPay(orderId);
						} else if(paytype == 11) {
							//招行支付
							vm.cmbPay(orderId);
						} else if(paytype == 18) {
							//银联支付
							window.location.href = $.M.unionPayUrl + "?orderid=" + orderId + "&source=wap";
						} else if(paytype == 20) {
							//农行支付
							vm.abcPay(orderId);
						} else if(paytype == 21) {
							//yi支付
							vm.bestPay(orderId);
						} else if(paytype == 22) {
							//交行支付
							vm.bocomPay(orderId);
						} else if(paytype == 23) {
							//浦发快捷支付
							window.location.href = "../pay/quickPay.html?orderId="+ orderSn + "&isH=1";
						}
					}
				} else {
					//报错
					Common.showMessage(errorMessage);
					setTimeout(function() {
						window.location.href = '../recharge/list.html';
					}, 2000)
				}
			});
		},
		cmbPay(orderId) { //招行支付
			localStorage.setItem("CMBPayHtmlStr", "");
			var param = {
				"parameters": {
					"orderId": orderId,
					"amount": vm.price
				}
			};
			api.cmbPay(param).then((data) => {
				if(data.hasError == false) {
					//localStorage.setItem("CMBPayHtmlStr", data.data);
					//window.location.href = "../mall/cmbpayPage.html";
				} else {
					JsTools.msgAlert(data.errorMessage, 1);
				}
			});
		},
		ccbPay(orderId) { //建行
			var param = {
				"parameters": {
					"orderId": orderId
				}
			};
			api.ccbPay(param).then((data) => {
				if(data.hasError == false) {
					window.location.href = data.data;
				} else {
					JsTools.msgAlert(data.errorMessage, 1);
				}
			});
		},
		abcPay(orderId) { //农行
			var param = {
				"parameters": {
					"orderId": orderId,
					"paymentLinkType": 2
				}
			};
			api.abcPay(param).then((data) => {
				if(data.hasError == false) {
					window.location.href = data.data;
				} else {
					JsTools.msgAlert(data.errorMessage, 1);
				}
			});
		},
		bestPay(orderId) { //翼支付
			var param = {
				"parameters": {
					"orderId": orderId
				}
			};
			api.bestPay(param).then((data) => {
				if(data.hasError == false) {
					window.location.href = data.data;
				} else {
					JsTools.msgAlert(data.errorMessage, 1);
				}
			});
		},
		bocomPay(orderId) { //交行
			var param = {
				"parameters": {
					"orderId": orderId,
					"paymentLinkType": 2
				}
			};
			api.bocomPay(param).then((data) => {
				if(data.hasError == false) {
					$("body").html(data.data);
				} else {
					JsTools.msgAlert(data.errorMessage, 1);
				}
			});
		},
	}

	}
</script>
<style lang="scss" scoped>
@import "../../assets/css/common-def.scss";
.content {
    height: 100%;
	.header-logo {
        position: fixed;
		width: 100%;
        z-index: 1;
		img {
			width: 100%;
			height: 4.55rem;
		}
		.back-content {
			position: fixed;
			width: 100%;
			height: 1rem;
			padding: 0 .24rem;
			line-height: 1.4rem;
			top: 0;
			left: 0;
			color: #fff;
			img {
				height: .48rem;
				width: auto;
			}
			.back {
				width: 15%;
				float: left;
				line-height: 1rem;
			}
			.right-space {
				width: 15%;
				float: right;
				text-align: center;
				font-size: $size24;
			}
			.header-title {
				width: 70%;
				text-align: center;
				float: left;
				font-size: $size32;
			}
		}
		.recharge-tap {
			position: absolute;
			width: 100%;
			top: 1.48rem;
			line-height: 1rem;
			left: 0;
			font-size: $size36;
			padding: 0 .24rem;
			text-align: center;
            z-index: 1;
			img{
				width: 7.02rem;
				height: 1.42rem;
			}
			.recharge-online {
				width: 50%;
			}
			.recharge-by-card {
				width: 50%;
			}
            .pay-type-btn{
                position: absolute;
                width: 100%;
                height: 1.42rem;
                top: 0;
                left: 0;
                z-index: 1;
                .online-pay{
                    height: 100%;
                    width: 50%;
                    float: left;
                }
                .cardpay{
                    height: 100%;
                    width: 50%;
                    float: right;
                }
            }
             .balance-info {
                height: 1.68rem;
                border-top: 1px solid $colorAcross;
                border-bottom: 1px solid $colorAcross;
                background:#fff;
                .account-balance-desc {
                    width: 40%;
                    float: left;
                    font-size: $size30;
                    color: $colorSubtitle;
                    padding: .34rem 0 .34rem .24rem;
                    line-height: .5rem;
                    text-align: left;
                    img {
                        width: 1.94rem;
                        height: .3rem;
                    }
                }
                .account-balance {
                    width: 60%;
                    float: left;
                    color: $colorMain;
                    font-size: .76rem;
                    line-height: 1.68rem;
                    font-weight: bold;
                    text-align: center;
                    color: #32532e;
                    small {
                        font-size: .56rem;
                        margin-right: .2rem;
                    }
                }
            }
		}
		}
		.main{
		    width: 7.02rem;
            top: 4.56rem;
            left: 50%;
            margin-left: -3.51rem;
            padding-bottom: 2.36rem;
		.rechange-content {
			width: 100%;
			min-height: 5.02rem;
			border-bottom-left-radius: .24rem;
            border-bottom-right-radius: .24rem;
			padding: 0 .24rem;
			background: #fff;
			box-shadow: 1px -1px 20px rgba(34, 34, 34, 0.3);
			.recharge-list {
				padding: .4rem 0;
				font-size: $size32;
				color: $colorText;
				ul {
					width: 100%;
					height: auto;
					padding-bottom: .2rem;
					border-bottom: 1px solid $colorAcross;
					li {
						padding: .42rem .4rem;
						border-radius: .24rem;
						background: #e0f1e0;
						height: 1.6rem;
						margin-bottom: .2rem;
						.r-info {
							width: 5.14rem;
							float: left;
							line-height: .32rem;
							p {
								margin-top: .18rem;
                                img{
                                    width: .3rem;
                                    height: .3rem;
                                    margin-left: .12rem;
                                }
							}
						}
						.r-check-btn {
							width: .6rem;
							line-height: .76rem;
							float: right;
							text-align: right;
							img {
								width: .4rem;
								height: auto;
							}
						}
					}
				}
				.pay-type {
					.pay-title {
						font-size: $size30;
						color: $colorText;
						line-height: 1rem;
					}
					.pay-item {
						line-height: .6rem;
						font-size: $size28;
						color: $colorText;
						border-top: 1px solid $colorAcross;
						padding: .2rem 0;
						.item {
							.bank-icon {
								width: .44rem;
								height: .44rem;
								margin-right: .2rem;
								border-radius: .44rem;
							}
							.select-icon {
								width: .4rem;
								height: .4rem;
								float: right;
								margin-top: .1rem;
							}
							.preferential{
							    margin-left: .1rem;
							    background: #ff5819;
							    border-radius: .13rem;
							    color: #fff;
							    font-size: .2rem;
							    padding: .02rem .1rem;
							}
						}
						p {
							color: $colorSubtitle;
							font-size: $size24;
							padding-left: .66rem;
							line-height: .3rem;
							margin-top: -.1rem;
						}
					}
				}
			}
			.card-recharge{
				height: 5.02rem;
				.input-ctl{
					height: 1rem;
					line-height: 1rem;
					font-size: $size36;
					border-bottom: 1px solid $colorAcross;
					input{
						position: absolute;
						left: 0;
						top: .1rem;
						border: 0;
						height: .8rem;
						width: 6rem;
						font-size: $size36;
						line-height: .8rem;
					}
					img{
						width: .36rem;
						height: .36rem;
						top: .32rem;
						float: right;
					}
					.card-num{
						color: #32542e;
					}
					.card-pwd{
						color: #132d01;
					}
				}
			}
			.recharge-protocol {
                position: absolute;
                width: 6.54rem;
                height: 1.36rem;
                line-height: 1.36rem;
				font-size: $size28;
				color: $colorSubtitle;
				text-align: center;
				bottom: -1.36rem;
				img {
					width: .4rem;
					height: .4rem;
					margin-right: .2rem;
				}
				span {
					color: $colorMain;
                    padding-left: .2rem;
				}
			}
		}
	}
	.recharge-btn{
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
		background: $colorSub3;
		color: #fff;
		font-size: $size32;
		line-height: 1rem;
		text-align: center;
	}
	.activtyRecharge{
        background: $colorPromptBtn;
    }
    .pop-up-box{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        top: 0;
        left: 0;
        z-index: 1;
    }
	.pop-content{
        width: 7.02rem;
        top: 50%;
        left: 50%;
        margin-top: -3.8rem;
        margin-left: -3.51rem;
        position: fixed;
        background: #fff;
        border-radius: .24rem;
        color: $colorText;
        font-size: $size28;
        .content-title{
            line-height: 1.3rem;
            text-align: center;
            font-size: $size36;
            color: $colorText;
            border-bottom: 1px solid $colorAcross;
        }
        .gift-detail{
            padding: .4rem .4rem 0 .4rem;
            max-height: 4.8rem;
            overflow: scroll;
            .recharge-val{
                font-size: $size32;
                line-height: .48rem;
            }
            .gift-item{
                    padding: .3rem 0;
                    line-height: .5rem;
                    font-size: $size28;
                    border-bottom: 1px solid $colorAcross;
                    p{
                        color: $colorSubtitle;
                        font-size: $size32;
                        padding-left: .28rem;
                    }
                    .circle{
                        width: .1rem;
                        height: .1rem;
                        background: $colorSubtitle;
                        border-radius: .1rem;
                        margin-right: .18rem;
                        margin-top: .2rem;
                        float: left;
                    }
                }
                .gift-item:last-child{
                    border-bottom: 0;
                }
        }
        .pop-box-btn{
                width: 100%;
                padding: .4rem;
                .ok-btn{
                    color: #fff;
                    font-size: $size32;
                    text-align: center;
                    border-radius: .24rem;
                    background: $colorMain;
                    line-height: 1rem;
                }
            }
    }
}
input::-moz-placeholder{
	color: $colorPrompt;
	font-size: $size28;
	font-weight: normal;
}
input::-ms-input-placeholder{
	color: $colorPrompt;
	font-size: $size28;
	font-weight: normal;
}
input::-webkit-input-placeholder{
	color: $colorPrompt !important;
	font-size: $size28 !important;
	font-weight: normal !important;
}
</style>