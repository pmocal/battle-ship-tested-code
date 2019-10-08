<template>
	<div
		class="grid-container"
		v-bind:class="boardClass"
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
			'shipLength': Number,
			'shipLocations': Array,
			'dimensions': Array,
			'name': String
		},
		computed: {
			boardClass() {
				if (this.name === "Computer") {
					return "hidden";
				}
			}
		},
		data() {
			return {
				rows: [],
				ships: []
			}
		},
		created() {
			this.rows = new Array(this.dimensions[0]).fill('O');
			for (let i = 0; i < this.rows.length; i++) {
				this.$set(this.rows, i, new Array(this.dimensions[1]).fill('O'));
			}
			for (let i = 0; i < this.shipLocations.length; i++) {
				let ship = this.placeShip(this.shipLocations[i]);
				if (ship != null) {
					this.ships.push(ship);
				}
			}
		},
		methods: {
			placeShip([x, y]) {
				//helper for receiveAttack
				//place ship at coord
				x = parseInt(x);
				y = parseInt(y);

				const shipFactory = (number) => {
					var positions = new Array(this.shipLength).fill('o');
					const toString = () => {
						return number.toString()
					};
					const hitShip = (i) => {
						positions[i] = 'x';
					}
					const isSunk = () => {
						for (let i = 0; i < positions.length; i++) {
							if (positions[i] === 'o') {
								return false;
							}
							return true;
						}
					}
					return { toString, hitShip, isSunk };
				};

				//shipFits is not really necessary right now since I am placing them; might come handy later though
				var newShip = shipFactory(this.ships.length);
				this.rows[x].splice(y, 1, newShip.toString()); //the length is the highest index + 1, the index we want since we are adding this ship
				for (let i = 1; i < this.shipLength; i++) {
					this.rows[x].splice(y+i, 1, [x, y]);
				}
				return newShip;
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
		grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
		background-color: teal;
		border-style: solid;
		border-color: orange;
	}
	.grid-container div div{
		text-align: center;
		border-top: solid;
		border-right: solid;
		border-color: silver;
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