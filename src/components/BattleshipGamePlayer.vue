<template>
	<div>
		<p>{{ name }}</p>
		<battleship-game-player-board :ship-length="shipLength" :ship-locations="shipLocations" :dimensions="dimensions"></battleship-game-player-board>
	</div>
</template>

<script>
	import BattleshipGamePlayerBoard from './BattleshipGamePlayerBoard.vue'

	export default {
		name: 'Player',
		props: {
			'name': String
		},
		data() {
			return {
				shipLength: 5,
				shipLocations: [[0,0], [1,1], [2,2]],
				dimensions: [10, 10]
			}
		},
		methods: {
			userAttack() {
				//take user input to attack otherPlayer.Gameboard
				return otherPlayer.Gameboard.receiveAttack(x, y)
			},
			computerAttack() {
				//randomly attack otherPlayer.Gameboard
				var x = Math.floor(Math.random() * otherPlayer.Gameboard.rows.length);
				var result = otherPlayer.Gameboard.receiveAttack(x,
					Math.floor(Math.random() * otherPlayer.Gameboard.rows[x].length));
				return result;
			}
		},
		components: {
			BattleshipGamePlayerBoard
		}
	}
</script>

<style>
	div {
	}

	div p {
		color: white;
	}

</style>