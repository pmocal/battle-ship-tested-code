<template>
	<div
		class="grid-container"
		v-bind:class="boardClassifier"
	>
		<div
			v-for="row in rows"
			v-bind:key="row.uuid"
		>
			<div
				id="slot"
				v-for="item in row"
				v-bind:key="item.uuid"
				v-bind:class="squareClass(item)"
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
			boardClassifier() {
				if (this.playerName === "Computer") {

					return "hidden";
				}
				return "";
			}
		},
		data() {
			return {
				rows: []
			}
		},
		created() {
			this.rows = new Array(this.dimensions[0]).fill('O');
			for (let i = 0; i < this.rows.length; i++) {
				this.$set(this.rows, i, new Array(this.dimensions[1]).fill('O'));
			}
			this.placeShips();
		},
		methods: {
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
				if (this.rows[x][y] == null) {
					//displayMissedAttack([x,y]);
					return;
				} else {
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
					if (item === "X") {
						return "missedAttack";
					}
					return "ship";
				}
			},
		}
	}
	// function shipFits(x, y) {
	// 	return ((x < this.dimensions[0]) && (y + this.shipLength < this.dimensions[1]));
	// }
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
		border-top: solid;
		border-right: solid;
		border-left: solid;
		border-color: orange;
	}
	.hidden div #slot{
		background-color: black;
	}
	.ship {
		background-color: green;
	}
	.missedAttack {
		background-color: red;
	}
</style>