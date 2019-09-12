const t = require('tap');
const battleshiptestedcode = require('../applogic.js');

t.test("receiveAttack method with a missed shot", t => {
	var testShip = battleshiptestedcode['Ship'](5);
	var testBoard = battleshiptestedcode['Gameboard'](testShip, 10, 10);
	t.same(testBoard.receiveAttack(0, 5), [0, 5]);
	t.end();
});