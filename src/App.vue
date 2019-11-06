<template>
	<div id="app">
		<div
			id="title"
			v-if="!this.show"
		>
			<h1>Welcome to the Battleship game.</h1>
			<button
				ref="startButton"
				@click="start"
			>
				Start game!
			</button>
		</div>
		<BattleshipGame :show="show"/>
	</div>
</template>

<script>
	import BattleshipGame from './components/BattleshipGame.vue'
	import Vue from 'vue'
	import Vuex from 'vuex'

	Vue.use(Vuex)

	const store = new Vuex.Store({
		state: {
			message: ""
		},
		mutations: {
			changeMessage(state, newMessage) {
				state.message = newMessage;
			}
		}
	})
	
	export default {
		name: 'app',
		store,
		components: {
			BattleshipGame
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			start() {
				this.$refs.startButton.style.display = "none";
				this.show = true;
			}
		}
	}

</script>

<style scoped>
	#title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	h1 {
		margin-right: 1%;
		font-family: Arial;
		font-weight: bold;
		font-size: 200%;
	}

	button {
		margin-left: 1%;
		font-family: Arial;
		font-size: 110%
	}

	#app {
		height: 100%;
		background-color: darkorange;
	}
</style>