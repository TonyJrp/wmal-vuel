<template>
	<div>
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="home" isRouter>
				<img slot="icon" src="../../assets/images/tab/index_r.png" v-if="selected=='home'">
				<img slot="icon" src="../../assets/images/tab/index_n.png" v-else> 首页
			</mt-tab-item>
			<mt-tab-item id="classify" isRouter>
				<img slot="icon" src="../../assets/images/tab/shopping_r.png" v-if="selected=='classify'">
				<img slot="icon" src="../../assets/images/tab/shopping_n.png" v-else> 分类
			</mt-tab-item>
			<mt-tab-item id="cart" isRouter>
				<img slot="icon" src="../../assets/images/tab/cart_r.png" v-if="selected=='cart'">
				<img slot="icon" src="../../assets/images/tab/cart_n.png" v-else> 购物车
			</mt-tab-item>
			<mt-tab-item id="personal" isRouter>
				<img slot="icon" src="../../assets/images/tab/my_r.png" v-if="selected=='personal'">
				<img slot="icon" src="../../assets/images/tab/my_n.png" v-else> 我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selected:this.$parent.selected
			}
		},
		mounted() {
			
		},
		watch: {
			selected: function(val,oldVal){
				if(val != oldVal){
                   this.$router.push({ path: '/'+val });
				}
			},
		}
	}
</script>