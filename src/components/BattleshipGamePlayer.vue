<template>
	<div>
		<p>{{ name }}</p>
		<div
			class="grid-container"
			v-bind:class="{ computerBoard: isComputerBoard }"
		>
			<div
				v-for="(row, index1) in rows"
				v-bind:key="row.uuid"
			>
				<div
					v-for="(squareItem, index2) in row"
					v-bind:key="squareItem.uuid"
					v-on:click="uponHumanAttack(index1, index2)"
					v-bind:class="[{ selected: rowsBooleans[index1][index2] }, getSquareClass(squareItem)]"
				>
					{{ squareItem }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BattleshipGamePlayer',
		props: {
			'name': String
		},
		computed: {
			isComputerBoard() {
				if (this.name === "Computer") {
					return true;
				}
				return false;
			}
		},
		data() {
			return {
				rows: [],
				rowsBooleans: [],
				dimensions: [10, 10]
			}
		},
		created() {
			this.initializeShips();
			this.rows = new Array(this.dimensions[0]).fill('O');
			this.rowsBooleans = new Array(this.dimensions[0]).fill(false);
			for (let i = 0; i < this.rows.length; i++) {
				this.$set(this.rows, i, new Array(this.dimensions[1]).fill('O'));
				this.$set(this.rowsBooleans, i, new Array(this.dimensions[1]).fill(false));
			}
			this.placeShips();
		},
		methods: {
			initializeShips() {
				const shipFactory = (length, location) => {
					var hitsRemaining = length;
					function hit() {
						hitsRemaining -= 1;
					}
					function getHitsRemaining() {
						return hitsRemaining;
					}
					function getLength() {
						return length;
					}
					function getLocation() {
						return location;
					}
					return { getLength, getLocation, getHitsRemaining, hit };
				};
				var shipLengths = [1, 4, 5, 2];
				for (let index = 0; index < 4; index++) {
					this.$store.commit({
						type: 'addShip',
						key: this.name,
						ship: shipFactory(shipLengths[index], [index, index])
					});
				}
			},
			uponHumanAttack(x, y) {
				this.rowsBooleans[x].splice(y, 1, true);
				if (typeof(this.rows[x][y]) === "number") {
					this.$store.commit({
						type: 'hitShip',
						key: this.name,
						index: this.rows[x][y]
					});
					this.$store.commit('changeMessage', "hit!");
				}
				else {
					this.$store.commit('changeMessage', "miss!");
				}
			},
			placeShips() {
				//shipFits is not really necessary right now since I am placing them; might come handy later though
				for (let shipsIndex = 0; shipsIndex < this.$store.state.ships[this.name].length; shipsIndex++) {
					var location = this.$store.state.ships[this.name][shipsIndex].getLocation();
					for (let shipIndex = 0; shipIndex < this.$store.state.ships[this.name][shipsIndex].getLength(); shipIndex++) {
						this.rows[location[0]].splice(location[1]+shipIndex, 1, shipsIndex);
					}
				}
			},
			getSquareClass(item) {
				if (item != "O") {
					return "ship";
				}
			},
			computerAttack() {
				this.uponAttack(Math.round(Math.random() * this.dimensions[0]), Math.round(Math.random() * this.dimensions[1]));
			}
		}
	}
</script>

<style scoped>
	div p {
		color: black;
		padding: 1%;
	}
	.grid-container {
		display: grid;
		grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
		background-color: teal;
		border-style: solid;
		border-color: orange;
	}
	.grid-container div div{
		text-align: center;
		border-bottom: solid;
		border-left: solid;
		border-color: orange;
	}
	.ship {
		background-color: green;
	}
	.computerBoard div div{
		background-color: black;
	}
	.computerBoard div .selected{
		background-color: red;
	}
</style>