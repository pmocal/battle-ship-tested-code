const t = require('tap');
const battleshiptestedcode = require('./applogic.js');

t.test("hit method", t => {
	var testShip = battleshiptestedcode['Ship'](5);
	t.same(testShip.hit(4), [,,,,'X']);
	t.end();
});

t.test("hit method multiple times", t => {
	var testShip = battleshiptestedcode['Ship'](5);
	t.same(testShip.hit(4), [,,,,'X']);
	t.same(testShip.hit(0), ['X',,,,'X']);
	t.end();
});

t.test("isSunk method", t => {
	var n = 5
	var testShip = battleshiptestedcode['Ship'](n);
	for (let i = 0; i < n; i++) {
		testShip.hit(i);
	}
	t.same(testShip.isSunk(), true);
	t.end();
});