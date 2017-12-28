<template>
		<div id="paySucc" class="content" v-cloak>
			<div class="header-logo">
				<div class="back-content">
					<div class="back" id="backup" @click="backup()"><img src="img/back@3x.png"></div>
					<div class="header-title">充值卡充值成功</div>
					<div class="right-space"></div>
				</div>
				<div class="balance-info">
					<div class="account-balance-desc">
						<p>账户余额 (元)</p>
						<img src="img/account-slogan@3x.png" />
					</div>
					<div class="account-balance">
						<small>¥</small>{{accountMoney}}
					</div>
				</div>
				<div class="pay-succ-icon">
					<img src="img/pay-succ@3x.png" />
					<p>恭喜您成功充值!</p>
				</div>
		   </div>
		   <div class="go-shop">
		   	  <div class="go-shop-btn" @click="goHome()">马上去购物</div>
		   </div>
		   <div class="go-account">
		   	  <div class="go-account-btn" @click="goAccountDetail()">去看看账户</div>
		   </div>
		</div>
</template>