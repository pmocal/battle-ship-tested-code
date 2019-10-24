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
		computed: {
			shipsSunk: function(player) {
				for (const ship of this.$store.state.ships[player]) {
					if (ship.getHitsRemaining() != 0) {
						return false;
					}
				}
				return true;
			}
		},
		methods: {
			start() {
				document.getElementById("startButton").style.display = "none";
				var humanShipsSunk = false;
				var computerShipsSunk = false;
				while (!humanShipsSunk && !computerShipsSunk) {
					this.$store.commit('changeMessage', "Computer's turn!");
					document.getElementById("messageBoard").style.display = "block";
					var longDelayInMilliseconds = 1000;
					const self = this;
					setTimeout(function() {
						self.$refs.human.computerAttack();
					}, longDelayInMilliseconds)
					var shortDelayInMilliseconds = 500;
					setTimeout(function() {
						this.$store.commit('changeMessage', "Human's turn!");
					}, shortDelayInMilliseconds)
					document.getElementById("computer").pointerEvents = "auto";


					//check if game ended
					humanShipsSunk = this.shipsSunk("Human");
					computerShipsSunk = this.shipsSunk("Computer");
					humanShipsSunk = true;
					computerShipsSunk = true;
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