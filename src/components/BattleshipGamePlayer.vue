<template>
	<div>
		<p>{{ name }}</p>
		<div
			class="grid-container"
			v-bind:class="name"
		>
			<div
				v-for="(row, index1) in rows"
				v-bind:key="row.uuid"
			>
				<div
					v-for="(squareItem, index2) in row"
					v-bind:key="squareItem.uuid"
					v-on:click="uponAttack(index1, index2)"
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
		data() {
			return {
				rows: [],
				rowsBooleans: [],
				dimensions: [10, 10],
				EMPTY_SPACE: 'O',
				spacesAttackedByComputer: []
			}
		},
		created() {
			this.initializeShips();
			this.rows = new Array(this.dimensions[0]).fill(this.EMPTY_SPACE);
			this.rowsBooleans = new Array(this.dimensions[0]).fill(false);
			for (let i = 0; i < this.rows.length; i++) {
				this.$set(this.rows, i, new Array(this.dimensions[1]).fill(this.EMPTY_SPACE));
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
			uponAttack(x, y) {
				this.rowsBooleans[x].splice(y, 1, true);
				
				function isShip(value) {
					return (typeof(value) === "number");
				}

				if (isShip(this.rows[x][y])) {
					this.$store.commit({
						type: 'hitShip',
						key: this.name,
						index: this.rows[x][y]
					});
					this.$store.commit('changeMessage', this.name + " got hit!");
				}
				else {
					this.$store.commit('changeMessage', "miss!");
				}
			},
			placeShips() {
				for (let shipsIndex = 0; shipsIndex < this.$store.state.ships[this.name].length; shipsIndex++) {
					var location = this.$store.state.ships[this.name][shipsIndex].getLocation();
					for (let shipIndex = 0; shipIndex < this.$store.state.ships[this.name][shipsIndex].getLength(); shipIndex++) {
						this.rows[location[0]].splice(location[1]+shipIndex, 1, shipsIndex);
					}
				}
			},
			getSquareClass(item) {
				if (item != this.EMPTY_SPACE) {
					return "ship";
				}
			},
			computerAttack() {
				var spaceX = Math.round(Math.random() * (this.dimensions[0]-1));
				var spaceY = Math.round(Math.random() * (this.dimensions[1]-1));
				if (this.spacesAttackedByComputer.includes([spaceX, spaceY])) {
					return;
				} else {
					this.spacesAttackedByComputer.push([spaceX, spaceY]);
					this.uponAttack(spaceX, spaceY);
				}
				console.log(this.spacesAttackedByComputer);
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
	.Computer div div{
		background-color: black;
	}
	.Computer div .selected{
		background-color: red;
	}
	.Human div .selected{
		background-color: red;
	}
</style>