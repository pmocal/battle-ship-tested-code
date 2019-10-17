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
			ships: [],
			message: "Start game!"
		},
		mutations: {
			addShip(ship) {
				this.ships.push(ship);
			},
			changeMessage(newMessage) {
				this.message = newMessage;
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