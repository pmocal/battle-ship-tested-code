<template>
	<div id="game">
		<button id="startButton" v-on:click="start"> {{ this.$store.state.message }} </button>
		<p id="messageBoard"> {{ this.$store.state.message }} </p>
		<BattleshipGamePlayer ref="human" name="Human"/>
		<BattleshipGamePlayer id="computer" name="Computer"/>
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
			start() {
				document.getElementById("startButton").style.display = "none";
				this.$store.commit('changeMessage', "Player goes first!");
				document.getElementById("messageBoard").style.display = "block";
				document.getElementById("computer").style.pointerEvents = "auto";
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

	#game div {
		pointer-events: none;
		user-select: none;
	}

	button {
		margin: 1%;
	}
</style>