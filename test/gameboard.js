const t = require('tap');
const battleshiptestedcode = require('../applogic.js');
var shipLength = 5;
var testShip = battleshiptestedcode['Ship'](shipLength);
var testBoard = battleshiptestedcode['Gameboard'](testShip, [10, 10]);

t.test("receiveAttack method with a missed shot", t => {
	t.same(testBoard.receiveAttack(0, 5), [0, 5]);
	t.end();
});

t.test("receiveAttack method which sends hit() function to ship", t => {
	t.same(testBoard.receiveAttack(0, 0), testShip.hit(0));
	t.end();
});

t.test("receiveAttack method which also sends hit() function to ship", t => {
	t.same(testBoard.receiveAttack(0, 1), testShip.hit(1));
	t.end();
});

t.test("receiveAttack method which sinks final ship", t => {
	t.equals(testShip.isSunk(), false);
	var ship;
	for (let i = 2; i < shipLength; i++) {
		ship = testBoard.receiveAttack(0, i);
	}
	console.log(ship);
	t.same(ship.isSunk(), true);
	t.end();
});