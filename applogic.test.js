const t = require('tap');
const battleshiptestedcode = require('./applogic.js');

t.test("hit method", t => {
	var testShip = battleshiptestedcode['Ship'](5);
	t.same(testShip.hit(4), [,,,,'X']);
	t.end();
});