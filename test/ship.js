const hooks = require('require-extension-hooks')

// Setup browser environment
require('browser-env')()

// Setup vue files to be processed by `require-extension-hooks-vue`
hooks('vue').plugin('vue').push()
// Setup vue and js files to be processed by `require-extension-hooks-babel`
hooks(['vue', 'js']).plugin('babel').push()
const t = require('tap');
const battleshiptestedcode = require('../src/applogic.js');

function setup(){
	var shipLength = 5;
	var testShip = battleshiptestedcode['Ship'](shipLength);
	return [ testShip, shipLength ];
}

t.test("hit method", t => {
	var [ testShip, shipLength ] = setup();
	t.same(testShip.hit(4).positions, [,,,,'X']);
	t.end();
});

t.test("hit method multiple times", t => {
	var [ testShip, shipLength ] = setup();
	t.same(testShip.hit(4).positions, [null,null,null,null,'X']);
	t.same(testShip.hit(0).positions, ['X',null,null,null,'X']);
	t.end();
});

t.test("isSunk method false", t => {
	var [ testShip, shipLength ] = setup();
	t.same(testShip.isSunk(), false);
	t.end();
});

t.test("isSunk method true", t => {
	var [ testShip, shipLength ] = setup();
	for (let i = 0; i < shipLength; i++) {
		testShip.hit(i);
	}
	t.same(testShip.isSunk(), true);
	t.end();
});