const t = require('tap');
const battleshiptestedcode = require('../applogic.js');
var shipLength = 5;
var testShip = battleshiptestedcode['Ship'](shipLength);
var testBoard = battleshiptestedcode['Gameboard']([testShip], [10, 10]);
var humanPlayer = battleshiptestedcode['Player'](testBoard);
var computerPlayer = battleshiptestedcode['Player'](testBoard);

t.test("computer attacks", t => {
	var computerAttackResult = computerPlayer.computerAttack(humanPlayer);
	t.notSame(computerAttackResult, null)
	t.end();
});

t.test("user attacks", t => {
	var userAttackResult = humanPlayer.userAttack(computerPlayer, 1, 5);
	t.same(userAttackResult, [1, 5]);
	userAttackResult = humanPlayer.userAttack(computerPlayer, 0, 4);
	t.same(Object.prototype.toString.call(userAttackResult)
		=== '[object Object]', true);
	t.end();
});