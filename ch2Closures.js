// 4 Closures
function makeClosure() {
	let stateVal = 0;
	// function inside that referance stateVal:
	function cl() {
		stateVal += 1;
		return stateVal;
	}
	return cl;
}

const inc = makeClosure();
inc();
inc();
const val = inc();

// More comming soon 


