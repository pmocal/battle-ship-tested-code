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
				var humanShipsSunk = false;
				var computerShipsSunk = false;
				let counter = 0;
				while (counter < 101) {
				// while (!humanShipsSunk && !computerShipsSunk) {
					this.$store.commit('changeMessage', "Computer's turn!");
					document.getElementById("messageBoard").style.display = "block";
					var longDelayInMilliseconds = 1000;
					const self = this;
					setTimeout(function() {
						self.$refs.human.computerAttack();
						// setTimeout(function() {
						// 	self.$store.commit('changeMessage', "Human's turn!");
						// 	document.getElementById("computer").style.pointerEvents = "auto";
						// }, longDelayInMilliseconds)
					}, longDelayInMilliseconds)
					counter += 1;
					console.log(counter);
					// humanShipsSunk = true;
					// computerShipsSunk = true;
				}			
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