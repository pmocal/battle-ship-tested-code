<template>
	<div id="app">
		<BattleshipGame/>
	</div>
</template>

<script>
	import BattleshipGame from './components/BattleshipGame.vue'

	export default {
		name: 'app',
		components: {
			BattleshipGame
		}
	}

</script>

<style scoped>
	#app {
		height: 100%;
		display: flex;
		flex-direction: column; /* without this, flex-direction defaults to row and undoes styling */
		justify-content: space-between;
	}
</style>