<template>
	<div
		id="game"
		v-if="this.show"
	>
		<div>
			<div
				v-for="(shipLength, index) in shipLengths"
				:key="index"
			>
				ship length: {{ shipLength }} <input placeholder="ship location" v-model="humanShipLocations[index]">
			</div>
			<button @click="addShips">Add locations</button>
		</div>
		<div id="gameScreen">
			<p> {{ this.$store.state.message }} </p>
			<BattleshipGameBoard
				ref="human"
				name="Human"
				:humanShips="humanShips"
				:DIMENSIONS="DIMENSIONS"
			/>
			<BattleshipGameBoard
				id="computer"
				name="Computer"
				:computerShips="computerShips"
				:DIMENSIONS="DIMENSIONS"
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
			for (let i = 0; i < this.NUMSHIPS; i++) {
				this.shipLengths.push(Math.round(Math.random() * (this.DIMENSIONS[1] - 1)));
			}
		},
		data() {
			return {
				DIMENSIONS: [10, 10],
				NUMSHIPS: 5,
				shipLengths: [],
				humanShipLocations: [],
				humanShips: [],
				computerShips: []
			}
		},
		methods: {
			addShips(){
				//validate user chosen ship locations
				//pick and validate computer ship locations
				const shipFactory = (length, location) => {
					var hitsRemaining = length;
					function getHitsRemaining() {
						return hitsRemaining;
					}
					function getLength() {
						return length;
					}
					function setLocation(loc) {
						location = loc;
					}
					function getLocation() {
						return location;
					}
					function hit() {
						if (hitsRemaining > 0) {
							hitsRemaining -= 1;
						}
					}
					function isSunk() {
						return (hitsRemaining == 0);
					}
					return { getLength, getLocation, setLocation, getHitsRemaining, hit };
				};
				var locations = []
				for (let i = 0; i < this.NUMSHIPS; i++) {
					this.ships["Computer"].push(shipFactory(shipLengths[i], locations[i]))
				}
			},
			validateShipLocations(ships) {
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