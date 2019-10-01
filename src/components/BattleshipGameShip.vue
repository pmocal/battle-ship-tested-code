<template>
	<div>
	</div>
</template>

<script>
	export default {
		name: 'Ship',
		data() {
			return {
				positions: new Array(length).fill(null);
			}
		},
		methods: {
			hit(number){
				//marks the ship as hit at that index
				positions[number] = 'X';
				return this;
			},
			isSunk() {
				//all positions hit
				var flag = true;
				for (let index in positions) {
					if (positions[index] !== 'X') {
						flag = false;
					}
				}
				return flag;
			}
		}
	}
</script>

<style>
</style>