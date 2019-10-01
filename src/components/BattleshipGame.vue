<template>
	<div id="game">
		<BattleshipGamePlayer name="P1"/>
		<BattleshipGamePlayer name="P2"/>
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