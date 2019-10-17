<template>
	<div id="game">
		<button id="startButton" v-on:click="start"> {{ this.$store.state.message }} </button>
		<p id="messageBoard"> {{ this.$store.state.message }} </p>
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
		methods: {
			shipsAllSunk() {
				for (let shipsIndex = 0; shipsIndex < this.ships.length; shipsIndex++) {
					if (this.ships[shipsIndex].getHitsRemaining() != 0) {
						return false;
					}
					return true;
				}
			},
			start() {
				document.getElementById("startButton").style.display = "none";
				this.$store.state.message = "Player goes first!";
				document.getElementById("messageBoard").style.display = "block";
			}
		}
	}
</script>

<style scoped>
	p {
		display: none;
		margin: 1%;
	}
	#game {
		background-color: orange;
		padding-right: 1%;
		height: 100%;
	}
	button {
		margin: 1%;
	}
</style>