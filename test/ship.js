const t = require('tap');
const battleshiptestedcode = require('../applogic.js');
var shipLength = 5;
var testShip = battleshiptestedcode['Ship'](shipLength);

t.test("hit method", t => {
	t.same(testShip.hit(4).positions, [,,,,'X']);
	t.end();
});

t.test("hit method multiple times", t => {
	t.same(testShip.hit(4).positions, [null,null,null,null,'X']);
	t.same(testShip.hit(0).positions, ['X',null,null,null,'X']);
	t.end();
});

t.test("isSunk method false", t => {
	t.same(testShip.isSunk(), false);
	t.end();
});

t.test("isSunk method true", t => {
	for (let i = 0; i < shipLength; i++) {
		testShip.hit(i);
	}
	t.same(testShip.isSunk(), true);
	t.end();
});