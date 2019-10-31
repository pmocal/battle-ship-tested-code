<template>
	<div id="game">
		<button id="startButton" v-on:click="start"> {{ this.$store.state.message }} </button>
		<div
			v-for="(ship, index) in ships['Human']"
			v-bind:key="ship.uuid"
		>
			{{ ship.getLength() }}<input type="text">
		</div>
		<p id="messageBoard"> {{ this.$store.state.message }} </p>
		<BattleshipGamePlayer ref="human" name="Human" :ships="ships" :dimensions="dimensions"/>
		<BattleshipGamePlayer id="computer" name="Computer" :ships="ships" :dimensions="dimensions"/>
	</div>
</template>

<script>
	import BattleshipGamePlayer from './BattleshipGamePlayer.vue'

	export default {
		name: 'BattleshipGame',
		components: {
			BattleshipGamePlayer
		},
		data() {
			return {
				dimensions: [10, 10],
				numShips: 5,
				ships: {
					"Human": [],
					"Computer": []
				}
			}
		},
		methods: {
			initializeShips() {
				const shipFactory = (name, length) => {
					if (name === "Computer") {
						location = 
					}
					var hitsRemaining = length;
					function getHitsRemaining() {
						return hitsRemaining;
					}
					function getLength() {
						return length;
					}
					function setLocation() {
						return location;
					}
					function hit() {
						hitsRemaining -= 1;
					}
					return { getLength, getLocation, getHitsRemaining, hit };
				};
				for (let i = 0; i < this.numShips; i++) {
					this.ships["Computer"].push(shipFactory())
				}
			},
			validateLocations(shipArray) {
				//nested for loop
					//if x values are diff, move on
					// if x values are same, check if y value 
					// say 
			}
			sleep(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			humanTurnFinished() {
				return new Promise(function(resolve) {
					document.getElementById("computer").onclick = resolve;
				})
			},
			async start() {
				this.initializeShips();
				document.getElementById("startButton").style.display = "none";
				while ((this.humanShipsSunk() == false) && (this.computerShipsSunk() == false)) {
					this.$store.commit('changeMessage', "Computer's turn!");
					document.getElementById("messageBoard").style.display = "block";
					await this.sleep(1000);
					this.$refs.human.computerAttack();
					this.$store.commit('changeMessage', "Human's turn!");
					document.getElementById("computer").style.pointerEvents = "auto";
					await this.humanTurnFinished();
					document.getElementById("computer").style.pointerEvents = "none";
				}
				if ((this.humanShipsSunk() == true) && (this.computerShipsSunk() == true)) {
					this.$store.commit('changeMessage', "TIE GAME!");
				} else if (this.humanShipsSunk() == true) {
					this.$store.commit('changeMessage', "COMPUTER WINS.");
				} else if (this.computerShipsSunk() == true) {
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