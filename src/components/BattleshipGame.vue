<template>
	<div
		v-if="show"
	>
		<div id="gameScreen">	
			<h1>Game Board</h1>
			<p class="messageBoard"> {{ this.$store.state.message }} </p>
			<BattleshipGameBoard
				ref="human"
				name="Human"
				:ships="this.$store.state.humanShips"
				:DIMENSIONS="DIMENSIONS"
			/>
			<BattleshipGameBoard
				ref="computer"
				name="Computer"
				:ships="this.$store.state.computerShips"
				:DIMENSIONS="DIMENSIONS"
			/>
		</div>
		<button @click="start" v-if="showStart">Start game</button>
	</div>
</template>

<script>
	import BattleshipGameBoard from './BattleshipGameBoard.vue'

	export default {
		name: 'BattleshipGame',
		components: {
			BattleshipGameBoard
		},
		props: {
			show: Boolean
		},
		data() {
			return {
				DIMENSIONS: [10, 10],
				showStart: false
			}
		},
		methods: {
			sleep(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			humanTurnFinished() {
				return new Promise(function(resolve) {
					this.$refs.computer.onclick = resolve;
				})
			},
			async start() {
				this.showStart = false;
				while ((this.$store.getters.humanShipsSunk() == false) && (this.$store.getters.computerShipsSunk() == false)) {
					this.$store.commit('changeMessage', "Computer's turn!");
					document.getElementById("messageBoard").style.display = "block";
					await this.sleep(1000);
					this.$refs.human.computerAttack();
					this.$store.commit('changeMessage', "Human's turn!");
					document.getElementById("computer").style.pointerEvents = "auto";
					await this.humanTurnFinished();
					document.getElementById("computer").style.pointerEvents = "none";
				}
				if ((this.$store.getters.humanShipsSunk() == true) && (this.$store.getters.computerShipsSunk() == true)) {
					this.$store.commit('changeMessage', "TIE GAME!");
				} else if (this.$store.getters.humanShipsSunk() == true) {
					this.$store.commit('changeMessage', "COMPUTER WINS.");
				} else if (this.$store.getters.computerShipsSunk() == true) {
					this.$store.commit('changeMessage', "Human wins!");
					document.body.style.backgroundColor = "blue";
				}
			}
		}
	}
</script>

<style scoped>

	h1 {
		margin: 1%;
		font-size: 150%;
	}

	p {
		margin-left: 1%;
	}

	button {
		margin: 1%;
		font-size: 110%;
	}

	#gameScreen div {
		pointer-events: none;
		user-select: none;
	}

	#gameScreen .messageBoard {
		display: none;
	}
</style>