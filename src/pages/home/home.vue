<template>
	<div id="homePage">
		<mt-header fixed title="松林路111松林路111松林路111松林路111">
			<router-link to="/" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
			<mt-button icon="search" slot="right"></mt-button>
		</mt-header>
		<mt-swipe :auto="5000">
			<mt-swipe-item v-for="list in swipeData">
				<img :src="list.picUrl" alt="">
			</mt-swipe-item>
		</mt-swipe>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import Footer from '@/components/footer/footer'
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	export default {
		name: 'homePage',
		components: {
			'v-footer': Footer,
		},
		data() {
			return {
				selected: 'home'
			}
		},
		mounted() {
			this.$store.dispatch('getLayoutamend'); //显示底部导航
		},
		watch: {

		},
		methods: {

		},
		computed: {
			...mapGetters([
				'swipeData'
			])
		},
	}
</script>
<style lang="scss" scoped>
	@import "../../assets/css/common-def.scss";
	.mint-swipe {
		height: 3.32rem;
		margin-top: .8rem;
	}
</style>