<template>
	<div
		v-if="showBattleship"
	>
		<div id="gameScreen">	
			
			<h1>Game Board</h1>
			
			<p class="messageBoard" ref="messageBoard"> {{ this.$store.state.message }} </p>
			
			<BattleshipGameBoard
				ref="human"
				name="Human"
				:ships="this.$store.state.humanShips"
				:DIMENSIONS="DIMENSIONS"
				:ship-signal="shipSignal"
			/>
			
			<BattleshipGameBoard
				name="Computer"
				ref="computer"
				:ships="this.$store.state.computerShips"
				:DIMENSIONS="DIMENSIONS"
				:ship-signal="shipSignal"
			/>
		</div>
		
		<button
			@click="start"
			ref="gameStart"
			v-if="shipSignal"
		>
			Start game
		</button>
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
			showBattleship: Boolean,
			DIMENSIONS: Array,
			shipSignal: Boolean
		},
		methods: {
			sleep(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			//method to place ships and reveal start button,
			async start() {
				this.$refs.gameStart.style.display = "none";
				while ((this.$store.getters.humanShipsSunk() == false) && (this.$store.getters.computerShipsSunk() == false)) {
					this.$store.commit('changeMessage', "Computer's turn!");
					this.$refs.messageBoard.style.display = "block";
					await this.sleep(1000);
					this.$refs.human.computerAttack();
					this.$store.commit('changeMessage', "Human's turn!");
					this.$refs.computer.humanAttackBegin();
					await this.$refs.computer.humanTurnFinished();
					this.$refs.computer.humanAttackEnd();
				}
				if ((this.$store.getters.humanShipsSunk() == true) && (this.$store.getters.computerShipsSunk() == true)) {
					this.$store.commit('changeMessage', "TIE GAME!");
				} else if (this.$store.getters.humanShipsSunk() == true) {
					this.$store.commit('changeMessage', "COMPUTER WINS.");
				} else if (this.$store.getters.computerShipsSunk() == true) {
					this.$store.commit('changeMessage', "Human wins!");
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