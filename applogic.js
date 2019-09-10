const Ship = (length) => {
	//length, where theyve been hit, whether its sunk
	var positions = new Array(length);
	const hit = function(number){
		//marks the ship as hit at that index
		positions[number] = 'X';
		return positions;
	}
	const isSunk = function() {
		//all positions hit
		var flag = true;
		for (let position in positions) {
			if (position != 'X') {
				flag = false;
			}
		}
		if (flag) {
			return true;
		}
	}
	return { hit, isSunk }
}

const Gameboard = function(dimensions) {
	var rows = new Array(dimensions[1]);
	for (let row in rows) {
		row = new Array(dimensions[2]);
	}
	const placeShip = function(ship, x, y) {
		//rows[y][x] is location that ship is placed at
		//walk through nearby spaces and place ship
		//or figure out that ship can't be placed?

	}
	const receiveAttack = function() {
		//either hit ship or record coordinates of the miss
	}
	//missed attacks tracked so later they can be
	//displayed on board

	//board can report if all ships sunk
}

module.exports = {
	Ship,
	Gameboard
}