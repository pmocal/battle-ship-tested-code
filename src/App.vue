<template>
	<div id="app">
		<BattleshipGame/>
	</div>
</template>

<script>
	import BattleshipGame from './components/BattleshipGame.vue'
	import Vue from 'vue'
	import Vuex from 'vuex'

	Vue.use(Vuex)

	const store = new Vuex.Store({
		state: {
			message: "Start game!"
		},
		mutations: {
			changeMessage(state, newMessage) {
				state.message = newMessage;
			}
		}
	})
	
	export default {
		name: 'app',
		store,
		components: {
			BattleshipGame
		}
	}

</script>

<style scoped>
	#app {
		height: 100%;
		display: flex;
		flex-direction: column; /* without this, flex-direction defaults to row and undoes styling */
		justify-content: space-between;
	}
</style>