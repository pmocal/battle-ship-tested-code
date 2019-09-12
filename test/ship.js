const t = require('tap');
const battleshiptestedcode = require('../applogic.js');
var shipLength = 5
var testShip = battleshiptestedcode['Ship'](shipLength);

t.test("hit method", t => {
	t.same(testShip.hit(4), [,,,,'X']);
	t.end();
});

t.test("hit method multiple times", t => {
	t.same(testShip.hit(4), [,,,,'X']);
	t.same(testShip.hit(0), ['X',,,,'X']);
	t.end();
});

t.test("isSunk method", t => {
	for (let i = 0; i < shipLength; i++) {
		testShip.hit(i);
	}
	t.same(testShip.isSunk(), true);
	t.end();
});