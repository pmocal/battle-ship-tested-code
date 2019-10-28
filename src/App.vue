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
			ships: {
				"Human": [],
				"Computer": []
			},
			// these ships need to be separated out for comp and human
			message: "Start game!"
		},
		mutations: {
			addShip(state, payload) {
				state.ships[payload.key].push(payload.ship);
			},
			hitShip(state, payload) {
				state.ships[payload.key][payload.index].hit();
			},
			changeMessage(state, newMessage) {
				state.message = newMessage;
			}
		},
		getters: {
			humanShipsSunk: (state) => () => {
				return (state.ships["Human"].filter(ship => (ship.getHitsRemaining() > 0)).length == 0)
			},
			computerShipsSunk: (state) => () => {
				return (state.ships["Computer"].filter(ship => (ship.getHitsRemaining() > 0)).length == 0)
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