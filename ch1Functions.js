// Functions
/*
Functions are callable objects. It is very important to note that in JavaScript functions are objects. It
might be misleading because when you use the typeof operator on a function, you get function as
the output. This is one of the instances where JavaScript lies to you. The output of typeof function
() {} should be object because functions are objects in JavaScript. That makes functions very
powerful, because you can think of them as callable objects. You can use a function as an object, a
piece of reusable code, or a function that creates objects.
*/
console.log("hello world!");
// 3.1 Creating Functions
// function declaration
function myFn() {}
// function expression
const fnRef = function myFn() {};
/*
Note that you need a semi colon at the end of a function expression, but there are no semi colons
at the end of function declarations.
*/

// 3.2 Function Inputs and Outputs
function add(a, b) {
	return a + b;
}

function fn() {
	const a = 1;
	// other stuff
	// no return
}
fn(); // 'undefined' is retured.

/*
const n = 1;
function change(x) {
	x = 5;
}
console.log(n); // 1;
change(n);
console.log(n); // 1;
*/

/*
const n = {value: 1};
function change(x) {
	x = {};
}
console.log(n); // {value: 1};
change(n);
console.log(n); // {value: 1};
*/


const n = {value: 1};
function mutate(x) {
	x.value = 22;
}
console.log(n); // {value: 1}
mutate(n);
console.log(n); // {value: 22}

// The arguments Object
/*
Every function in JavaScript has access to the magical arguments object inside the function body
that contains the arguments passed to a function. Let’s look at a basic example to demonstrate how
you can access the arguments object.
*/

function sum() {
	return arguments;
}


const args = sum(1,2,3);
Object.getPrototypeOf(args) === Array.prototype; // -> false

const argArray = Array.prototype.slice.call(args); // -> [1,2,3]
Object.getPrototypeOf(argArray) === Array.prototype; // -> true

// 3.3 Executing a Function
/*
A function can be executed. This is generally known as calling a function. You can call a function
by using the name of the function, followed by ():
*/

add();
add(1, 2); // -> 3

/*
3 ways to invoke a function
- call
- apply
- and the new Keyword before invoking the function with ()
*/

// Function.prototype.call
add.call({}, 1,2); // -> 3
// Function.prototype.apply
add.apply({}, [1,2]); // -> 3


// Calling Function with new
/*
- A new empaty object is created
- The context object this is bound to the new empty object
- The new object is linked to the function's prototype property
- this is automatically returned unless another value is returned explicitly from the function
*/

function Car() {
	this.color = "black";
}
const myCar = new Car();
myCar.color; // -> "black"
console.log(myCar.color);


// Context Object this
// Call with new
/*
function Car() {
	this.color = "Black";
}
const myCar = new Car();
*/

// Using call or apply
function printMessage(msg) {
	return msg + ' ' + this.name;
}
const message = printMessage.call({name: 'Amin'}, 'Welcome!');
console.log(message); // -> 'Welcome! Amin'

const massage = printMessage.apply({name: 'Amin'}, ['Welcome!']);
console.log(massage); // -> 'Welcome! Amin'

// Implicit Binding
const util = {
	name: 'Utility',
	getName: function () {
		return this.name;
	}
};
const getName = util.getName;
const name = util.getName(); // -> Utility
console.log(name);

/*
function setName(name) {
	'use strict';
	this.name = name;
}
setName(); // TypeError: Cannot set property 'name' of undefined
*/


// 3.4 Functions as objects
var fRef = function fnObject () {};
fRef.someProp = 'foo';
fRef.hello = function () {
  return 'hello';
};

fRef.someProp // -> 'foo'
fRef.hello()  // -> 'hello'
console.log(fRef.someProp);
console.log(fRef.hello());
