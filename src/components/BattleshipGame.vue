<template>
	<div id="game">
		<button id="startButton" v-on:click="start"> {{ this.$store.state.message }} </button>
		<p id="messageBoard"> {{ this.$store.state.message }} </p>
		<BattleshipGamePlayer ref="human" name="Human"/>
		<BattleshipGamePlayer id="computer" name="Computer"/>
	</div>
</template>

<script>
	import BattleshipGamePlayer from './BattleshipGamePlayer.vue'

	export default {
		name: 'BattleshipGame',
		components: {
			BattleshipGamePlayer
		},
		methods: {
			sleep(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			humanTurnFinished() {
				return new Promise(function(resolve, reject) {
					document.getElementById("computer").onclick = resolve;
				})
			},
			async start() {
				document.getElementById("startButton").style.display = "none";
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
	p {
		display: none;
		margin: 1%;
	}
	#game {
		background-color: orange;
		padding-right: 1%;
		height: 100%;
	}

	#game div {
		pointer-events: none;
		user-select: none;
	}

	button {
		margin: 1%;
	}
</style>