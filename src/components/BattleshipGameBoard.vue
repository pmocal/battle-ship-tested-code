<template>
	<div>
		<p v-bind:class="name">{{ name }}</p>
		<div
			class="grid-container"
			v-bind:class="name"
			:ref="name"
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
				rowsBooleans: [],
				previousMoveHit: false
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
					if (this.name === "Human") {
						this.previousMoveHit = true;
					}
					this.$store.commit({
						type: 'hitShip',
						key: this.name,
						index: this.rows[x][y]
					});
					this.$store.commit('changeMessage', this.name + " got hit!");
				}
				else {
					if (this.name === "Human") {
						this.previousMoveHit = false;
					}
					this.$store.commit('changeMessage', "miss!");
				}
			},
			getSquareClass(item) {
				if (item != this.EMPTY_SPACE) {
					return "ship";
				}
			},
			computerAttack() {
				var potentialX;
				var potentialY;
				var validMove;
				do {
					if (this.previousMoveHit && validMove) {
						let offset = Math.round(Math.random());
						if (offset === 0) {
							offset = -1; //because we want to add or subtract 1, not add 1 or add 0
						}
						potentialX = this.spacesAttackedByComputer[this.spacesAttackedByComputer.length - 1][0]
						potentialY = this.spacesAttackedByComputer[this.spacesAttackedByComputer.length - 1][1] + offset;
					}
					else {
						potentialX = Math.round(Math.random() * (this.DIMENSIONS[0]-1));
						potentialY = Math.round(Math.random() * (this.DIMENSIONS[1]-1));
					}
					validMove = true;
					for (let i = 0; i < this.spacesAttackedByComputer.length; i++) {
						let pastMove = this.spacesAttackedByComputer[i];
						if ((potentialX === pastMove[0]) && (potentialY === pastMove[1])) {
							validMove = false;
						}
					}
				} while (!validMove);
				this.spacesAttackedByComputer.push([potentialX, potentialY]);
				this.uponAttack(potentialX, potentialY);
			},
			humanAttackBegin() {
				this.$refs.Computer.style.pointerEvents = "auto";
			},
			humanAttackEnd() {
				this.$refs.Computer.style.pointerEvents = "none";
			},
			humanTurnFinished() {
				var self = this;
				return new Promise(function(resolve) {
					self.$refs.Computer.onclick = resolve;
				})
			},
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
	p.Human {
		font-family: 'Warnes', cursive;
		font-size: 170%;
	}

	p.Computer {
		font-family: 'Notable', sans-serif;
		font-size: 170%;
	}
</style>