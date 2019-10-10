<template>
	<div
		class="grid-container"
		v-bind:class="{ computer: isComputer }"
	>
		<div
			v-for="(row, index1) in rows"
			v-bind:key="row.uuid"
		>
			<div
				v-for="(item, index2) in row"
				v-bind:key="item.uuid"
				v-on:click="clicked(index1, index2)"
				v-bind:class="[{ selected: rowsBooleans[index1][index2] }, squareClass(item)]"
			>
				{{ item }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		name: 'BattleshipGamePlayerBoard',
		props: {
			'dimensions': Array,
			'playerName': String,
			'ships': Array
		},
		computed: {
			isComputer() {
				if (this.playerName === "Computer") {
					return true;
				}
				return false;
			}
		},
		data() {
			return {
				rows: [],
				rowsBooleans: []
			}
		},
		created() {
			this.rows = new Array(this.dimensions[0]).fill('O');
			this.rowsBooleans = new Array(this.dimensions[0]).fill(false);
			for (let i = 0; i < this.rows.length; i++) {
				this.$set(this.rows, i, new Array(this.dimensions[1]).fill('O'));
				this.$set(this.rowsBooleans, i, new Array(this.dimensions[1]).fill(false));
			}
			this.placeShips();
		},
		methods: {
			clicked(x, y) {
				this.rowsBooleans[x].splice(y, 1, true);
			},
			placeShips() {
				//shipFits is not really necessary right now since I am placing them; might come handy later though
				for (let shipsIndex = 0; shipsIndex < this.ships.length; shipsIndex++) {
					var location = this.ships[shipsIndex].getLocation();
					for (let shipIndex = 0; shipIndex < this.ships[shipsIndex].getLength(); shipIndex++) {
						this.rows[location[0]].splice(location[1]+shipIndex, 1, shipsIndex);
					}
				}
			},
			receiveAttack(x, y) {
				//either hit ship or record coordinates of the miss
				//missed attacks tracked so later they can be
				//displayed on board
				//board can report if all ships sunk
				if (this.rows[x][y] != null) {
					var index = y;
					while ((index < this.dimensions[1]) && (this.rows[x][index] ===  this.rows[x][y])) {
						index += 1;
					}
					return this.rows[x][y].hit();
				}
			},
			shipsAllSunk(ships) {
				for (let i = 0; i < ships.length; i++) {
					if (ships[i].isSunk() == false){
						return false;
					}
				}
				return true;
			},
			squareClass(item) {
				if (item != "O") {
					return "ship";
				}
			},
		}
	}
</script>

<style scoped>
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
	.computer div div{
		background-color: black;
	}
	.computer div .selected{
		background-color: red;
	}
	.ship {
		background-color: green;
	}
</style>