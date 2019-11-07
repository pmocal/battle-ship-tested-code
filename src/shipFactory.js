const shipFactory = (length, location) => {
	var hitsRemaining = length;
	function getHitsRemaining() {
		return hitsRemaining;
	}
	function getLength() {
		return length;
	}
	function getLocation() {
		return location;
	}
	function hit() {
		if (hitsRemaining > 0) {
			hitsRemaining -= 1;
		}
	}
	function isSunk() {
		return (hitsRemaining === 0);
	}
	return { getLength, getLocation, getHitsRemaining, hit, isSunk };
}

export default shipFactory