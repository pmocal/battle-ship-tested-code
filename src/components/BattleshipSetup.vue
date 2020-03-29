<template>
	<div
		id="gameSetup"
		v-if="showBattleshipSetup && showBattleship"
	>
		
		<h1>Ship Placement Phase</h1>
		
		<div id="instructions">

			<p class="instructions"><span>Place your ships, human!</span> You get {{ NUMSHIPS }}.</p>
			
			<p class="instructions">Enter coordinates for each ship.

				Defaults are provided for you; retain the same format if you change them--that is, <code>[x, y]</code> where <code>x</code> and <code>y</code> both are both integers ranging from <code>[0, 9]</code>. The length of each ship is listed. Ships are placed vertically so the coordinates are where the top of the ship lies.</p>
			
			<p class="instructions">Choose carefully so that your ships fit. If any of them extend off the grid I'll make you swab the decks (and redo your choice of coordinates).</p>
						
			<p class="instructions">Click the button when you are done. Your enemy's ships are the same size as yours. But you'll have to find theirs before they find yours. Good luck.</p>
		
		</div>
		
		<div id="ships">
			<p
				v-for="(shipLength, index) in shipLengths"
				:key="index"
			>
				
				Length of ship: <span><code>{{ shipLength }}</code></span>
				
				<input
					placeholder="ship location"
					v-model="humanShipLocations[index]"
				>
			</p>
		</div>
		
		<button @click="addShips"> Add ships to board</button>
		
		<p class="messageBoard"> {{ this.$store.state.message }} </p>
	</div>
</template>

<script>
	import shipFactory from '../shipFactory.js'

	export default {
		name: 'BattleshipSetup',
		props: {
			showBattleship: Boolean,
			DIMENSIONS: Array
		},
		created() {
			for (let i = 0; i < this.NUMSHIPS; i++) {
				this.shipLengths.push(Math.ceil(Math.random() * (this.DIMENSIONS[1] - 1))); //[1, 10]
			}
		},
		data() {
			return {
				NUMSHIPS: 5,
				NUMTRIES: 500, //number of times to attempt selecting valid computer ship locations
				shipLengths: [],
				humanShipLocations: ['[0,0]', '[1,0]', '[2,0]', '[3,0]', '[4,0]'],
				humanShips: [],
				computerShips: [],
				showBattleshipSetup: true
			}
		},
		methods: {
			addShips(){
				//validate user chosen ship locations
				//pick and validate computer ship locations
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
					} while ((this.validateShipLocations(computerShipLocations) === false) && (counter < this.NUMTRIES));
					for (let i = 0; i < this.NUMSHIPS; i++) {
						this.humanShips.push(shipFactory(this.shipLengths[i], humanShipLocations[i]));
						this.computerShips.push(shipFactory(this.shipLengths[i], computerShipLocations[i]));
					}
					if (counter == this.NUMTRIES) {
						this.$store.commit('changeMessage', "Game crashed, sorry--contact administrator.");
					} else {
						this.showBattleshipSetup = false;
						this.$store.commit('setHumanShips', this.humanShips);
						this.$store.commit('setComputerShips', this.computerShips);
						//call method in sibling component to place ships and reveal start button
						this.$emit('signalFlare');
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
								if (shipLocations[j][1] + this.shipLengths[j] > shipLocations[i][1]) {
									this.$store.commit('changeMessage', "Ships must not overlap.");
									return false;
								}
							}
							if (shipLocations[j][1] > shipLocations[i][1]) {
								if (shipLocations[i][1] + this.shipLengths[i] > shipLocations[j][1]) {
									this.$store.commit('changeMessage', "Ships must not overlap.");
									return false;
								}
							}
						}
					}
				}
				return true;
			}
		}
	}
</script>

<style scoped>

	h1 {
		margin: 1%;
		font-size: 150%;
	}

	p, input {
		margin-left: 1%;
	}

	button {
		margin: 1%;
		font-size: 110%;
	}

	code {
		font-family: Courier;
	}

	span {
		color: darkred;
	}

	#gameSetup h1 {
		margin-bottom: 2%;
	}

	#instructions {
		margin-bottom: 2%;
	}

	#instructions p {
		font-size: 110%;
		margin-bottom: 1%;
	}

	#gameSetup {
		border-bottom: solid;
	}

	#ships {
		margin-bottom: 2%;
	}

	.messageBoard {
		margin: 1%;
	}

</style>