<template>
<div id="app">
	<router-view></router-view>
  </div>
</template>

<script>
import Footer from '@/components/footer/footer'
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
			}
		},
		mounted() {
		    
		},
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
<style type="text/css">

</style>