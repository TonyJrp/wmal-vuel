<template>
	<div id="classifyPage">
		<mt-header fixed title="分类">
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
		name: 'classifyPage',
		components: {
			'v-footer': Footer,
		},
		data() {
			return {
				selected: 'classify'
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