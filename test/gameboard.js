const t = require('tap');
const battleshiptestedcode = require('../src/applogic.js');

function setup() {
	var shipLength = 5;
	var testShip = battleshiptestedcode['Ship'](shipLength);
	var testBoard = battleshiptestedcode['Gameboard']([testShip], [10, 10]);
	return [ testBoard, testShip, shipLength ];
}

t.test("receiveAttack method with a missed shot", t => {
	var [ testBoard, testShip, shipLength ] = setup();
	t.same(testBoard.receiveAttack(0, 5), [0, 5]);
	t.end();
});

t.test("receiveAttack method which sends hit(i) function to ship", t => {
	var [ testBoard, testShip, shipLength ] = setup();
	t.same(testBoard.receiveAttack(0, 0).positions, ['X',null,null,null,null]);
	t.end();
});

t.test("receiveAttack method sends a second hit(i) function to ship", t => {
	var [ testBoard, testShip, shipLength ] = setup();
	t.same(testBoard.receiveAttack(0, 0).positions, ['X',null,null,null,null]);
	t.same(testBoard.receiveAttack(0, 1).positions, ['X','X',null,null,null]);
	t.end();
});

t.test("after a final hit, ship's isSunk() evaluates to true", t => {
	var [ testBoard, testShip, shipLength ] = setup();
	t.equals(testShip.isSunk(), false);
	testBoard.receiveAttack(0, 0);
	testBoard.receiveAttack(0, 1);
	testBoard.receiveAttack(0, 2);
	testBoard.receiveAttack(0, 3);
	t.same(testBoard.receiveAttack(0, 4).isSunk(), true);
	t.end();
});

t.test("shipsAllSunk() evaluates to false", t => {
	var [ testBoard, testShip, shipLength ] = setup();
	testBoard.receiveAttack(0, 0);
	testBoard.receiveAttack(0, 1);
	testBoard.receiveAttack(0, 2);
	t.same(testBoard.shipsAllSunk(), false);
	testBoard.receiveAttack(0, 3);
	testBoard.receiveAttack(0, 4);
	t.same(testBoard.shipsAllSunk(), true);
	t.end();
});

t.test("renderBoard(boardId) adds ", t => {
	var [ testBoard, testShip, shipLength ] = setup();
	t.end();
});