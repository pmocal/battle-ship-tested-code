<template>
	<div id="app">
	</div>
</template>

<script>

	const battleshipcode = require('./applogic.js');
	const gameDOM = require('./gameDOM.js');

	export default {
		name: 'app',
	}

	function main() {
		var shipLength = 5;
		var player1ships = [];
		var player2ships = [];
		for (var i = 0; i < 3; i++) {
			player1ships.push(battleshipcode['Ship'](shipLength));
			player2ships.push(battleshipcode['Ship'](shipLength));
		}
		var board1 = battleshipcode['Gameboard'](player1ships, [10, 10]);
		var board2 = battleshipcode['Gameboard'](player2ships, [10, 10]);
		var player1 = battleshipcode['Player'](board1);
		var player2 = battleshipcode['Player'](board2);

		var flag = player1.Gameboard.shipsAllSunk();
		while (flag == false) {
			player1.Gameboard.renderBoard("board1");
			player2.Gameboard.renderBoard("board2");
			flag = true;
		}

		// while gameIsNotDone
			// wait for player click
			// render move 
			// switch players
	}

	main();

</script>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: 4% 4% 4% 4% 4% 4% 4% 4% 4% 4%;
		width: 47%;
		height: 98%;
		background-color: teal;
		border-style: solid;
		border-color: orange;
		border-width: thick;
	}

	#game {
		display: flex;
		height: 100%;
		width: 98%;
		align-items: center;
		justify-content: space-between;
		background-color: black;
		padding: 0 1%;
	}

	#game * {
		justify-content: space-around;
		align-items: center;
	}

	#game p {
		width: 6%;
		color: white;
		text-align: center;
	}
</style>