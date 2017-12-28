<template>
	<div id="cartPage">
		<mt-header fixed title="购物车">
			<router-link to="/" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
			<mt-button icon="search" slot="right"></mt-button>
		</mt-header>
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
		name: 'cartPage',
		components: {
			'v-footer': Footer,
		},
		data() {
			return {
				selected: "cart"
			}
		},
		mounted() {},
		watch: {

		},
		methods: {

		},
		computed: {
			...mapGetters([

			])
		},
	}
</script>