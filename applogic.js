const Ship = (length) => {
	//length, where theyve been hit, whether its sunk
	var positions = new Array(length).fill(null);

	const hit = function(number){
		//marks the ship as hit at that index
		positions[number] = 'X';
		return this;
	}
	
	const isSunk = function() {
		//all positions hit
		var flag = true;
		for (let index in positions) {
			if (positions[index] !== 'X') {
				flag = false;
			}
		}
		return flag;
	}
	
	return { positions, hit, isSunk }
}

const Gameboard = function(ships, dimensions) {
	// board 2d array
	var rows = new Array(dimensions[0]).fill(null);
	for (let index in rows) {
		rows[index] = new Array(dimensions[1]).fill(null);
	}
	const shipFits = function(length, x, y) {
		//helper for placeShip
		console.log(x, y);
		console.log(dimensions[0], dimensions[1]);
		console.log(length);
		return ((x < dimensions[0]) && (y + length < dimensions[1]))
	}
	const placeShip = function(ship, x, y) {
		//helper for receiveAttack
		//place ship at coord
		x = parseInt(x);
		y = parseInt(y);
		if (shipFits(ship.positions.length, x, y)) {
			console.log(x, y);
			rows[x][y] = ship;
			for (i = 1; i < ship.positions.length; i++) {
				rows[x][y+i] = [x, y];
			}
		}
	}
	for (index in ships) {
		console.log(index);
		placeShip(ships[index], index, index);
	}

	const displayMissedAttack = function(coordinates) {
		//do something
		//helper for receiveAttack
	}
	const receiveAttack = function(x, y) {
		//either hit ship or record coordinates of the miss
		//missed attacks tracked so later they can be
		//displayed on board
		//board can report if all ships sunk
		if (rows[x][y] == null) {
			displayMissedAttack([x,y]);
			return [x, y];
		} else if (rows[x][y].length == 2) {
			//coordinates of ship object contained
			shipX = rows[x][y][0];
			shipY = rows[x][y][1];
			return rows[shipX][shipY].hit(y-shipY);
		} else {
			return rows[x][y].hit(0);
		}
	}

	const shipsAllSunk = function() {
		for (index in ships) {
			if (ships[index].isSunk() == false){
				return false;
			};
		}
		return true;
	}

	const renderBoard = function(boardId) {
		var board = document.getElementById(boardId);
		var elem;
		for (index in rows) {
			for (index2 in rows[index]) {
				elem = document.createElement("div");
				elem.className = "grid-item";
				elem.addEventListener("click", function() {
					elem.innerHTML = "X";
				});
				if (rows[index][index2] != null) {
					elem.innerHTML = index.toString() + index2.toString();
				}
				else {
					elem.innerHTML = '_';
				}
				board.appendChild(elem);
			}
		}
	}

	return { rows, receiveAttack, shipsAllSunk, renderBoard }
}

const Player = function(Gameboard) {
	const userAttack = function(otherPlayer, x, y) {
		//take user input to attack otherPlayer.Gameboard
		return otherPlayer.Gameboard.receiveAttack(x, y)
	}
	const computerAttack = function(otherPlayer) {
		//randomly attack otherPlayer.Gameboard
		var x = Math.floor(Math.random() * otherPlayer.Gameboard.rows.length);
		var result = otherPlayer.Gameboard.receiveAttack(x,
			Math.floor(Math.random() * otherPlayer.Gameboard.rows[x].length));
		return result;
	}
	return { Gameboard, userAttack, computerAttack }
}

function main() {
	var shipLength = 5;
	player1ships = [];
	player2ships = [];
	for (i = 0; i < 3; i++) {
		player1ships.push(Ship(shipLength));
		player2ships.push(Ship(shipLength));
	}
	var board1 = Gameboard(player1ships, [10, 10]);
	var board2 = Gameboard(player2ships, [10, 10]);
	var player1 = Player(board1);
	var player2 = Player(board2);

	var flag = player1.Gameboard.shipsAllSunk();
	while (flag == false) {
		player1.Gameboard.renderBoard("board1");
		player2.Gameboard.renderBoard("board2");
		flag = true;
	}

	// while gameIsNotDone
		// wait for player click
		// render move 
		// switch players
}

main();

module.exports = {
	Ship,
	Gameboard,
	Player
}