<template>
	<div>
		<p>{{ name }}</p>
		<div
			class="grid-container"
			v-bind:class="name"
		>
			<div
				v-for="(row, index1) in rows"
			>
				<div
					v-for="(squareItem, index2) in row"
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
		name: 'BattleshipGameBoard',
		props: {
			name: String,
			humanShips: Array,
			DIMENSIONS: Array,
			computerShips: Array
		},
		data() {
			return {
				spacesAttackedByComputer: [],
				EMPTY_SPACE: 'O',
				rows: [],
				rowsBooleans: []
			}
		},
		created() {
			this.rows = new Array(this.DIMENSIONS[0]).fill(this.EMPTY_SPACE);
			this.rowsBooleans = new Array(this.DIMENSIONS[0]).fill(false);
			for (let i = 0; i < this.rows.length; i++) {
				this.$set(this.rows, i, new Array(this.DIMENSIONS[1]).fill(this.EMPTY_SPACE));
				this.$set(this.rowsBooleans, i, new Array(this.DIMENSIONS[1]).fill(false));
			}
		},
		methods: {
			placeShips() {
				for (let shipsIndex = 0; shipsIndex < this.$store.state.ships[this.name].length; shipsIndex++) {
					var location = this.$store.state.ships[this.name][shipsIndex].getLocation();
					for (let shipIndex = 0; shipIndex < this.$store.state.ships[this.name][shipsIndex].getLength(); shipIndex++) {
						this.rows[location[0]].splice(location[1]+shipIndex, 1, shipsIndex);
					}
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
			getSquareClass(item) {
				if (item != this.EMPTY_SPACE) {
					return "ship";
				}
			},
			computerAttack() {
				var spaceX = Math.round(Math.random() * (this.DIMENSIONS[0]-1));
				var spaceY = Math.round(Math.random() * (this.DIMENSIONS[1]-1));
				var a = [spaceX, spaceY];
				for (let index = 0; index < this.spacesAttackedByComputer.length; index++) {
					let b = this.spacesAttackedByComputer[index];
					let flag = true;
					for (let i = 0; i < a.length; i++) {
						if (a[i] != b[i]) {
							flag = false;
						}
					}
					if (flag) {
						return;
					}
				}
				this.spacesAttackedByComputer.push([spaceX, spaceY]);
				this.uponAttack(spaceX, spaceY);
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