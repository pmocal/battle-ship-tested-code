<template>
	<div>
		<p>{{ name }}</p>
		<div
			class="grid-container"
			v-bind:class="name"
		>
			<div
				v-for="(row, index1) in rows"
				:key="row.uuid"
			>
				<div
					v-for="(squareItem, index2) in row"
					v-on:click="uponAttack(index1, index2)"
					v-bind:class="[{ selected: rowsBooleans[index1][index2] }, getSquareClass(squareItem)]"
					:key="squareItem.uuid"
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
			ships: Array,
			DIMENSIONS: Array,
			shipSignal: Boolean
		},
		data() {
			return {
				spacesAttackedByComputer: [],
				EMPTY_SPACE: '-',
				rows: [],
				rowsBooleans: []
			}
		},
		watch: {
			shipSignal: function () {
				this.placeShips();
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
				for (let i = 0; i < this.ships.length; i++) {
					var location = this.ships[i].getLocation();
					for (let j = 0; j < this.ships[i].getLength(); j++) {
						this.rows[location[0]].splice(location[1]+j, 1, i);
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