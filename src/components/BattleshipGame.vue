<template>
	<div id="game">
		<BattleshipGamePlayer name="Human"/>
		<BattleshipGamePlayer name="Computer"/>
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
		background-color: orange;
	}
</style>