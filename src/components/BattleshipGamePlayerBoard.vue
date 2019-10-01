<template>
	<div class="grid-container">
		<div v-for="row in rows" v-bind:key="row.uuid">
			<div v-for="item in row" v-bind:key="item.uuid">
				<div onclick="placeShip(this.row, this.item)"> {{ item }} </div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BattleshipGamePlayerBoard',
		props: {
			'shipLength': Number,
			'shipLocations': Array,
			'dimensions': Array
		},
		data() {
			return {
				rows: null
			}
		},
		created() {
			this.rows = new Array(this.dimensions[0]).fill('_');
			for (let index in this.rows) {
				this.rows[index] = new Array(this.dimensions[1]).fill('_');
			}
			// for (let index in ships) {
			// 	placeShip(ships[index], index, index);
			// }
		},
		methods: {
			placeShip(x, y) {
				//helper for receiveAttack
				//place ship at coord
				x = parseInt(x);
				y = parseInt(y);

				if (shipFits(this.shipLength, x, y)) {
					this.rows[x][y] = "O";
					for (let i = 1; i < this.shipLength; i++) {
						this.rows[x][y+i] = [x, y];
					}
				}
			},
			receiveAttack(x, y) {
				//either hit ship or record coordinates of the miss
				//missed attacks tracked so later they can be
				//displayed on board
				//board can report if all ships sunk
				if (this.rows[x][y] == null) {
					//displayMissedAttack([x,y]);
					return [x, y];
				} else if (this.rows[x][y].length == 2) {
					//coordinates of ship object contained
					var shipX = this.rows[x][y][0];
					var shipY = this.rows[x][y][1];
					return this.rows[shipX][shipY].hit(y-shipY);
				} else {
					return this.rows[x][y].hit(0);
				}
			},
			shipsAllSunk(ships) {
				for (let index in ships) {
					if (ships[index].isSunk() == false){
						return false;
					}
				}
				return true;
			}
		}
	}

	function shipFits(x, y) {
		return ((x < this.dimensions[0]) && (y + this.shipLength < this.dimensions[1]));
	}
</script>

<style scoped>
	.grid-container {
		display: grid;
		grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
		grid-gap: 1% 1%;
		padding: 1%;
		background-color: teal;
		border-style: solid;
		border-color: orange;
	}
</style>