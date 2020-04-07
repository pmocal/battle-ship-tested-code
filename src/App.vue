<template>
	<div id="app">
		<transition name="fade">
			<div
				id="title"
				v-if="!showBattleship"
			>
				<h1>Welcome to the Battleship game.</h1>
				<button
					ref="startButton"
					@click="start"
				>
					START GAME
				</button>
			</div>
		</transition>

		<div class="game" :id="invisible ? 'invisible' : ''">
			<BattleshipSetup
				@signalFlare="passSignalToGame"
				:show-battleship="showBattleship"
				:DIMENSIONS="DIMENSIONS"
			/>
			<BattleshipGame
				:show-battleship="showBattleship"
				:DIMENSIONS="DIMENSIONS"
				:ship-signal="shipSignal"
			/>
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
				showBattleship: false,
				DIMENSIONS: [10, 10],
				shipSignal: false,
				invisible: true
			}
		},
		methods: {
			start() {
				this.$refs.startButton.style.display = "none";
				this.showBattleship = true;
				this.invisible = false;
			},
			passSignalToGame() {
				this.shipSignal = true;
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
		background-image: url('assets/background.jpg');
	}

	h1 {
		margin-right: 1%;
		font-family: Arial;
		font-weight: bold;
		font-size: 200%;
		color: turquoise;
		-webkit-text-stroke: 1.5px black;
	}

	button {
		margin-left: 1%;
		font-family: Arial;
		font-size: 110%
	}

	#invisible {
		display: none;
	}

	#app {
		height: 100%;
		background-color: darkorange;
	}

	.game {
		display: flex;
		flex-direction: column; /* without this, flex-direction defaults to row and undoes styling */
		background-color: orange;
		height: 100%;
		padding-right: 0.3%;
		font-family: Arial;
	}

	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
</style>