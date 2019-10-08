<template>
	<div>
		<p>{{ name }}</p>
		<BattleshipGamePlayerBoard
			:ship-length="shipLength"
			:ship-locations="shipLocations"
			:dimensions="dimensions"
			:name="name"
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
				dimensions: [10, 10],
				name: this.name
			}
		},
		components: {
			BattleshipGamePlayerBoard
		}
	}
</script>

<style>
	div p {
		color: ruby;
	}
</style>