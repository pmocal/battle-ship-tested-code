<template>
	<div id="app">
	</div>
</template>

<script>

	const battleshipcode = require('../src/applogic.js');

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
	/* http://meyerweb.com/eric/tools/css/reset/ 
	   v2.0 | 20110126
	   License: none (public domain)
	*/
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

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