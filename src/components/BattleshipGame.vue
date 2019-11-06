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
				this.shipLengths.push(Math.ceil(Math.random() * (this.DIMENSIONS[1] - 1))); //[1, 10]
			}
		},
		data() {
			return {
				DIMENSIONS: [10, 10],
				NUMSHIPS: 5,
				NUMTRIES: 500, //number of times to attempt selecting valid computer ship locations
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
					function getLocation() {
						return location;
					}
					function hit() {
						if (hitsRemaining > 0) {
							hitsRemaining -= 1;
						}
					}
					function isSunk() {
						return (hitsRemaining === 0);
					}
					return { getLength, getLocation, getHitsRemaining, hit };
				}
				var humanShipLocations = []
				for (let i = 0; i < this.NUMSHIPS; i++) {
					humanShipLocations.push(JSON.parse(this.humanShipLocations[i]));
				}
				var counter = 0;
				if (this.validateShipLocations(humanShipLocations)) {
					var computerShipLocations;
					do {
						computerShipLocations = this.generateComputerLocations();
						counter += 1;
						console.log(counter);
					} while ((this.validateShipLocations(computerShipLocations) === false) && (counter < this.NUMTRIES));
					if (counter == this.NUMTRIES) {
						this.$store.commit('changeMessage', "Game crashed, sorry--contact administrator.");
					}
					for (let i = 0; i < this.NUMSHIPS; i++) {
						this.humanShips.push(shipFactory(this.shipLengths[i], humanShipLocations[i]));
						this.computerShips.push(shipFactory(this.shipLengths[i], computerShipLocations[i]));
					}
				}
			},
			generateComputerLocations() {
				var temp = [];
				for (let i = 0; i < this.NUMSHIPS; i++) {
					temp.push([Math.round(Math.random() * (this.DIMENSIONS[1] - 1)), //[0, 9]
						Math.round(Math.random() * (this.DIMENSIONS[1] - this.shipLengths[i]))]); //shipLength always [1, 10] so [0,9]
				}
				return temp;
			},
			validateShipLocations(shipLocations) {
				if (shipLocations.length != this.NUMSHIPS) {
					this.$store.commit('changeMessage', "Fill out all of the ship locations!");
					return false;
				}
				for (let i = 0; i < this.NUMSHIPS; i++) {
					if ((Object.prototype.toString.call(shipLocations[i]) != '[object Array]') || 
						(shipLocations[i].length != 2)) {
						this.$store.commit('changeMessage', "All ship locations must be coordinates.");
						return false;
					}
				}
				//all coords must fall on the board
				for (let i = 0; i < this.NUMSHIPS; i++) {
					if (((shipLocations[i][0] > this.DIMENSIONS[0]) || (shipLocations[i][1] > this.DIMENSIONS[1])) || 
						((shipLocations[i][0] < 0) || (shipLocations[i][1] < 0))) {
						this.$store.commit('changeMessage', "All ship locations must be coordinates within the board.");
						return false;
					}
				}
				for (let i = 0; i < this.NUMSHIPS - 1; i++) {
					for (let j = i + 1; j < this.NUMSHIPS; j++) {
						if (shipLocations[i][0] === shipLocations[j][0]) {
							if (shipLocations[i][1] === shipLocations[j][1]) {
								this.$store.commit('changeMessage', "All ship locations must be different.");
								return false;
							}
							if (shipLocations[i][1] > shipLocations[j][1]) {
								if (shipLocations[i][1] + this.shipLengths[i] > shipLocations[j][1]) {
									this.$store.commit('changeMessage', "Ships must not overlap.");
									return false;
								}
							}
							if (shipLocations[i][1] > shipLocations[j][1]) {
								if (shipLocations[i][1] + this.shipLengths[i] > shipLocations[j][1]) {
									this.$store.commit('changeMessage', "Ships must not overlap.");
									return false;
								}
							}
						}
					}
				}
				return true;
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