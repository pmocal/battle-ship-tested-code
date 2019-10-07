<template>
	<div>
		<p>{{ name }}</p>
		<BattleshipGamePlayerBoard
			:ship-length="shipLength"
			:ship-locations="shipLocations"
			:dimensions="dimensions"
		/>
	</div>
</template>

<script>
	import BattleshipGamePlayerBoard from './BattleshipGamePlayerBoard.vue'

	export default {
		name: 'BattleshipGamePlayer',
		props: {
			'name': String
		},
		data() {
			return {
				shipLength: 5,
				shipLocations: [[0,0], [1,1], [2,2]],
				dimensions: [10, 10]
			}
		},
		components: {
			BattleshipGamePlayerBoard
		}
	}
</script>

<style>
	div p {
		color: white;
	}
</style>