<template>
		<div id="accountDetail" class="content" v-cloak>
			<div class="back-content">
				<div class="back" id="backup" @click="backup()"><img src="../../assets/images/back-g@3x.png"></div>
				<div class="header-title">账户明细</div>
				<div class="right-space"></div>
			</div>
			<div class="header-logo">
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
		  <div class="account-detail">
		  	<ul>
		  		<li class="detail-item" v-for="item in items">
		  			<div class="order-info">
		  				{{item.typeName}}  <span v-if="item.target != null">订单：{{item.target}}</span>
		  				<p>{{item.updatedTime | formatDate(item.updatedTime)}}</p>
		  			</div>
		  			<div class="order-amount">
		  				<span v-if="item.type==1">-</span>
		  				<span v-if="item.type!=1">+</span>{{item.score | scoreToM(item.score)}}
		  			</div>
		  		</li>
		  	</ul>
		  </div>
		</div>
</template>
<script>
    import * as Common from '@/assets/js/common'
    import api from '@/fetch/api'
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	export default {
		name: 'accountDetail',
		data() {
			return {
		accountMoney: 0, //账户余额
		index: 1,
		items: [], //账户明细列表
		sw: true, //加载数据开关
	}
	},
	mounted() {
		let _this = this;
		if(Common.getUserToken()) {
			_this.getmemberaccount();
			_this.getScoreList();
		} else {
			JsTools.msgAlert("您还未登录", 1);
			setTimeout(function() {
				Common.checkWechat();
			}, 2000);
		}

		// 注册scroll事件并监听  
		window.addEventListener('scroll', function() {
			// 判断是否滚动到底部  
			if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
				// 如果开关打开则加载数据  
				if(_this.sw == true) {
					// 将开关关闭  
					_this.sw = false;
					_this.getScoreList();
				}
			}
		});
	},
	methods: {
		getmemberaccount() { //获取用户积分余额 
			api.getmemberaccount().then((res) => {
				if(res.data && res.data.score > 0) {
					this.accountMoney = res.data.score / 100;
				}
			});
		},
		getScoreList() {
			var str = {
				"parameters": {
					"type": 0,
					"pageSize": 10,
					"pageIndex": this.index
				}
			};
			api.getScoreList(str).then((res) => {
				if(res.data && res.data.items.length > 0) {
					let items = res.data.items;
					let _this = this;
					items.forEach(function(val, index) {
						_this.items.push(val);
					});
					_this.index++;
					_this.sw == true
				}
			});
		},
		backup() { //去首页
			//window.location.href = "recharge.html";
            this.$router.go(-1);
		}
	}

	}
</script>
<style lang="scss" scoped>
@import "../../assets/css/common-def.scss";
.content {
    height: 100%;
    .back-content {
            position: fixed;
            width: 100%;
            height: 1rem;
            padding: 0 0.24rem;
            line-height: 1rem;
            top: 0;
            left: 0;
            color: $colorText;
            background: #fff;
            z-index: 1;
            img {
                height: 0.48rem;
                width: auto;
                margin-bottom:.26rem;
            }
            .back {
                width: 15%;
                float: left;
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
    .header-logo {
        width: 100%;
        padding: 0 0.24rem;
        top: 1.28rem;
        .balance-info {
            height: 2.38rem;
            border-radius: 0.1rem;
            background: #fff;
            padding: 0.38rem 0.4rem;
            .account-balance-desc {
                width: 40%;
                float: left;
                font-size: $size30;
                color: $colorSubtitle;
                line-height: 0.6rem;
                img {
                    width: 1.94rem;
                    height: 0.3rem;
                    vertical-align: top;
                }
                p{
                    line-height: .94rem;
                }
            }
            .account-balance {
                width: 60%;
                float: left;
                color: $colorMain;
                font-size: .76rem;
                line-height: 1.62rem;
                font-weight: bold;
                text-align: center;
                color: #32532e;
                small {
                    font-size: 0.56rem;
                    margin-right: 0.2rem;
                }
            }
        }
    }
    .account-detail{
        width: 100%;
        color: #32542e;
        font-size: $size28;
        top: 1.5rem;
        background: #fff;
        ul{
            li{
                height: 1.5rem;
                padding: .24rem;
                border-bottom: 1px solid $colorAcross;
                .order-info{
                    width: 70%;
                float: left;
                font-weight: bold;
                line-height: .5rem;
                span{
                    font-weight: normal;
                }
                p{
                    color: $colorSubtitle;
                    font-size: $size28;
                    font-weight: normal;
                }}
                .order-amount{
                    width: 30%;
                    float: right;
                    text-align: right;
                    font-size: .4rem;
                    font-weight: bold;
                    line-height: 1.02rem;
                    span{
                        vertical-align: top;
                        line-height: 1.02rem;
                    }
                }
            }
        }
    }
}
</style>