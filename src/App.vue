<template>
	<div id="app">
		<div
			id="title"
			v-if="!show"
		>
			<h1>Welcome to the Battleship game.</h1>
			<button
				ref="startButton"
				@click="start"
			>
				Start game!
			</button>
		</div>
		<div id="game">
			<BattleshipSetup :show="show"/>
			<BattleshipGame :show="show"/>
		</div>
	</div>
</template>

<script>
	import BattleshipGame from './components/BattleshipGame.vue'
	import BattleshipSetup from './components/BattleshipSetup.vue'
	import Vue from 'vue'
	import Vuex from 'vuex'

	Vue.use(Vuex)

	const store = new Vuex.Store({
		state: {
			humanShips: [],
			computerShips: [],
			message: ""
		},
		mutations: {
			changeMessage(state, newMessage) {
				state.message = newMessage;
			},
			setHumanShips(state, ships) {
				state.humanShips = ships;
			},
			setComputerShips(state, ships) {
				state.computerShips = ships;
			},
			hitShip(state, payload) {
				if (payload.key === "Human") {
					state.humanShips[payload.index].hit();
				} else if (payload.key === "Computer") {
					state.computerShips[payload.index].hit();
				}
			}
		},
		getters: {
			humanShipsSunk: (state) => () => {
				return (state.humanShips.filter(ship => (!ship.isSunk())).length == 0);
			},
			computerShipsSunk: (state) => () => {
				return (state.computerShips.filter(ship => (!ship.isSunk())).length == 0);
			}
		}
	})
	
	export default {
		name: 'app',
		store,
		components: {
			BattleshipGame,
			BattleshipSetup
		},
		data() {
			return {
				show: false,

			}
		},
		methods: {
			start() {
				this.$refs.startButton.style.display = "none";
				this.show = true;
			}
		}
	}

</script>

<style scoped>
	#title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	h1 {
		margin-right: 1%;
		font-family: Arial;
		font-weight: bold;
		font-size: 200%;
	}

	button {
		margin-left: 1%;
		font-family: Arial;
		font-size: 110%
	}

	#app {
		height: 100%;
		background-color: darkorange;
	}

	#game {
		display: flex;
		flex-direction: column; /* without this, flex-direction defaults to row and undoes styling */
		background-color: orange;
		padding-right: 0.3%;
		font-family: Arial;
	}
</style>