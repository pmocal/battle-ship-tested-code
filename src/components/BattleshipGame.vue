<template>
	<div
		id="game"
		v-if="this.show"
	>
		<div>
			<div
				v-for="shipLength in this.shipLengths"
				:key="shipLength.uuid"
			>
				ship length: {{ shipLength }} <input placeholder="ship location">
			</div>
			<button @click="addLocations">Add locations</button>
			<p>{{ locations }}</p>
		</div>
		<div id="gameScreen">
			<p> {{ this.$store.state.message }} </p>
			<BattleshipGameBoard
				ref="human"
				name="Human"
				:ships="ships"
				:dimensions="dimensions"
			/>
			<BattleshipGameBoard
				id="computer"
				name="Computer"
				:ships="ships"
				:dimensions="dimensions"
			/>
		</div>
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
		created() {
			for (let i = 0; i < this.numShips; i++) {
				this.shipLengths.push(Math.round(Math.random() * (this.dimensions[1] - 1)));
			}
		},
		data() {
			return {
				dimensions: [10, 10],
				numShips: 5,
				locations: [],
				shipLengths: [],
				shipLocations: [],
				ships: {
					"Human": [],
					"Computer": []
				}
			}
		},
		methods: {
			addLocations(){
				this.locations.push(this.shipLocations);
			},
			initializeShips() {
				const shipFactory = (name, length) => {
					var hitsRemaining = length;
					location = null;
					function getHitsRemaining() {
						return hitsRemaining;
					}
					function getLength() {
						return length;
					}
					function getLocation() {
						return location;
					}
					function setLocation(loc) {
						location = loc;
					}
					function hit() {
						hitsRemaining -= 1;
					}
					return { getLength, getLocation, setLocation, getHitsRemaining, hit };
				};
				for (let i = 0; i < this.numShips; i++) {
					this.ships["Computer"].push(shipFactory())
				}
			},
			validateLocation(array) {
				//for loop
					//if x values are diff, move on
					// else if x values are same, check y values
						// if y1 + length < y2 move on
						// if y1 + length > y2 and y2 + length < y1 move on
						// else new ship doesn't work
				return array;
			},
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

	#game {
		display: flex;
		flex-direction: column; /* without this, flex-direction defaults to row and undoes styling */
		justify-content: space-between;
		background-color: orange;
		padding-right: 1%;
		height: 100%;
	}

	#gameScreen div {
		pointer-events: none;
		user-select: none;
	}
	button, p, input {
		margin: 1%;
	}
</style>