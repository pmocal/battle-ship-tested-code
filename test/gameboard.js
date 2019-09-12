const t = require('tap');
const battleshiptestedcode = require('../applogic.js');
var shipLength = 5;
var testShip = battleshiptestedcode['Ship'](5);
var testBoard = battleshiptestedcode['Gameboard'](testShip, 10, 10);

t.test("receiveAttack method with a missed shot", t => {
	t.same(testBoard.receiveAttack(0, 5), [0, 5]);
	t.end();
});

t.test("receiveAttack method which sends hit() function to ship", t => {
	t.same(testBoard.receiveAttack(0, 0), battleshiptestedcode['Ship'](5));
	t.end();
});

// t.test("receiveAttack method which sinks final ship", t => {
// 	for (let i = 0; i < 3; i++) {
// 		testBoard.receiveAttack(0, i);
// 	}
// 	t.same(testBoard.receiveAttack(0, 3), [0, 3]);
// });