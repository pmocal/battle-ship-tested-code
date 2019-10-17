<template>
	<div
		class="grid-container"
		v-bind:class="{ isComputer: isComputerPlayer }"
	>
		<div
			v-for="(row, index1) in rows"
			v-bind:key="row.uuid"
		>
			<div
				v-for="(squareItem, index2) in row"
				v-bind:key="squareItem.uuid"
				v-on:click="onSquareAttack(index1, index2)"
				v-bind:class="[{ selected: rowsBooleans[index1][index2] }, getSquareClass(squareItem)]"
			>
				{{ squareItem }}
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
			isComputerPlayer() {
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
			onSquareAttack(x, y) {
				this.rowsBooleans[x].splice(y, 1, true);
				if (typeof(this.rows[x][y]) === "number") {
					this.ships[this.rows[x][y]].hit();
					this.$store.state.message = "hit!";
				}
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
			getSquareClass(item) {
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
	.ship {
		background-color: green;
	}
	.isComputer div div{
		background-color: black;
	}
	.isComputer div .selected{
		background-color: red;
	}	
</style>