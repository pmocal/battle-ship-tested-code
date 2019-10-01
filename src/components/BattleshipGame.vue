<template>
	<div id="game">
		<battleship-game-player name="P1"></battleship-game-player>
		<battleship-game-player name="P2"></battleship-game-player>
	</div>
</template>

<script>
	import BattleshipGamePlayer from './BattleshipGamePlayer.vue'

	export default {
		name: 'BattleshipGame',
		components: {
			BattleshipGamePlayer
		}
	}
</script>

<style scoped>
	#game {
		background-color: black;
	}
</style>