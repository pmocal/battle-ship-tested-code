<template>
	<div>
		<p>{{ name }}</p>
		<BattleshipGamePlayerBoard
			:ships="ships"
			:dimensions="dimensions"
			:player-name="playerName"
		/>
	</div>
</template>

<script>
	import BattleshipGamePlayerBoard from './BattleshipGamePlayerBoard.vue'

	export default {
		name: 'BattleshipGamePlayer',
		props: {
			'name': String
		},
		created() {
			this.initializeShips();
		},
		data() {
			return {
				dimensions: [10, 10],
				playerName: this.name,
				ships: []
			}
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
					this.ships.push(shipFactory(shipLengths[index], [index, index]));
				}
			}
		},
		components: {
			BattleshipGamePlayerBoard
		}
	}
</script>

<style>
	div p {
		color: black;
		padding: 1%;
	}
</style>