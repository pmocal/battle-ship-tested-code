<template>
	<div id="game">
		<button v-on:click="message='Welcome to BATTLESHIPS. Human goes first.'"> {{ message }} </button>
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
		},
		data() {
			return {
				message: "Start Game!"
			}
		}
	}
</script>

<style scoped>
	#game {
		background-color: orange;
		padding-right: 1%;
		height: 100%;
	}
	button {
		padding: 1%;
	}
</style>