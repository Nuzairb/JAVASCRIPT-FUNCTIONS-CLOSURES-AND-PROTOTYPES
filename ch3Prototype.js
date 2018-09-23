// 5 Prototypes
/*
In JavaScript, prototypes are objects that facilictate linking of objects and delegation of
methods or properties
*/
/*
• The boxes represent objects 
• The arrow shows the link direction: a links to b, b links to c, c links to m
• The links form the prototype chain for these objects
• m is the mother object which contains all the methods comon to all objects
• [[p]] is the internal property of an object that points to another object. Confusingly enough,
this property is known as the [[prototype]] in the specification
• In this diagram, b is known as the prototype of a, c the prototype of b and m the prototype of c.
• Property and method look up follows the prototype chain. That is, if you want to look up a
property in a, JavaScript will first look at a itself. If it cannot find it there, it will then look
at b. If it can’t find it in b, it will then look in c. If it can’t find it there, it will look in m, and
eventually if it can’t find it in m, it will return undefined because m is the ‘mother object’ and
is not linked to any other object.
• But if you want to look up a property in c, JavaScript will not look into a or b. It will follow
the link direction and if it can’t find it in c, it will look in m, and will return undefined if it
cannot find it in m.
• The m object is a special object which comes from Object.prototype. But don’t worry about
it now, we have enough prototype jargon lying around already :)
*/

// 5.1 Linking Objects
var user = {
	name: 'Amin'
};

/*
• The user object gets linked to the ‘mother’ object
• Object m is known as the prototype of user
• You can get the prototype of user using the Object.getPrototypeOf method, that is:
Object.getPrototypeOf(user)
• The ‘mother’ object is the prototype property of the Object constructor function object (WO!)
• You can double check the prototype of user using: Object.getPrototypeOf(user) ===
Object.prototype // -> true
*/


// a -> b: b is the protoype of a.
// defining object `b` who is going to be the prototype of `a`
var b = {
	hello: function() {
		return 'hello';
	}
};
// create `a` and link it to `b`
var a = Object.create(b);

a.toString = function () {
	return 'I am a.';
};


var F = function () {};
var b = F.prototype;
b.hello = function () {
	return 'hello';
};

var a = new F();

var F = function () {};
F.prototype.hello = function () {
	return 'hello';
};
var a = new F();
// a -> F.prototype -> Object.protoype -> null
// a -> b -> m -> null
a.hello();

var myObj = Object.create(Object.prototype);
// or 
var myObj = new Object();


// 5.2 Prototype Ojbects inside Javascript 
/*
- Primitive Data Types:
	• Boolean
	• Number
	• String
- Non-primitive Data Types
	• Object
	• Function
*/

var str = 'hello';
str.replace('o', 'oo'); // -> hello

var str = new String('hello');

String.prototype.first = function () {
	return this.charAt(0);
};
str.first(); // -> 'h'

// Array
const nums = [1,2,3];
// nums -> Array.prototype -> Object.prototype -> null

Object.getOwnPropertyNames(Array.prototype);

/*
["length", "constructor", "toString", "toLocaleString", "join", "pop", "push", "\
reverse",
"shift", "unshift", "slice", "splice", "sort", "filter", "forEach", "some", "eve\
ry",
"map", "indexOf", "lastIndexOf", "reduce", "reduceRight", "copyWithin", "find",
"findIndex", "fill", "includes", "entries", "keys", "concat", "values"]
*/

const myPromise = new Promise((resolve, reject) => {
	resolve('hello');
});
// myPromise -> Promise.prototyep -> Object.protoype -> null

// Date 
const today = new Date();
today.getTime(); // -


// 5.3 Inheritance
var developer = new Developer();
function Person () {
	Person.prototype.walk = function () {
		return 'walking...';
	}
}

function Worker() {
	Worker.prototype = Object.create(Person.prototype);

	Worker.prototype.work = function () {
		return 'working ....';
	}
}

function Developer () {}
Developer.prototype = Object.create(Worker.prototype);
Developer.prototype.code = function () {
	return 'coding ....';
}

var dev = new Developer();
dev.code(); // 'coding ...'
dev.work(); // 'working ...'
dev.walk(); // 'walking ...'

var person = {
	walk() { return 'Walking...'; }
};

var worker = Object.create(person);
worker.work = function () {
	return 'working';
}

var dev = Object.create(worker);
dev.code = function () {
	return 'coding...';
}
dev.code(); // 'coding...'
dev.work(); // 'working...'
dev.walk(); // 'walking...'


function Developer (name) {
	if (!(this instanceof Developer)) {
		return new Developer(name);
	}
	this.name = name;
}

// 5.4 Functional Mixins Over Classical Inheritance
/*
Define functionsalities
Grouped by `fns` here.
*/

function fns() {
	this.getName = function() {
		return this.name;
	};
}

/*Define Type*/
function Person(name) {
	if (!(this instanceof Person)) {
		return new Person(name);
	}
	this.name;
}

/*Apply the functions to the prototype object of Person*/
fns.call(Person.prototype);
// Make an instance of Person 
const person = Person('Amin');
// Call methods 
person.getName(); // -> 'Amin'

/*Define Person's functionalities*/
function personFns() {
	this.walk = function () {
		return 'Walking ...';
	};
	this.getName = function () {
		return this.name;
	};
} 
/*Define Worker's functionalities*/
function workerFns() {
	this.work = function () {
		return 'Working ...';
	};
}
/*Define Developer's functionalities*/
function developerFns() {
	this.code = function () {
		return 'Coding...';
	};
}

/*Define the developer type*/
function Developer(name) {
	if (!(this instanceof Developer)) {
		return new Developer(name);
	}
	this.name = name;
	this.toString = function () {
		return this.name;
	};
}

/* apply each functionalities to
2 Developer's prototype */
[personFns, workerFns, developerFns].forEach(fn => {
	fn.call(Developer.prototype);
});

/*Create an instace and call methods*/
const dev = Developer('Amin');
console.log(dev.getName());
console.log(dev.walk());
console.log(dev.work());
console.log(dev.code());
console.log('Dev is: ' + dev);



const personFns = (function () {
	function walk() {return 'Walking...';}
	function getName() {return this.name;}
	return function () {
		this.walk = walk;
		this.getName = getName;
		return this;
	};
}());

const workerFns = (function () {
	function work() {return 'working...';}
	return function () {
		this.work = work;
		return this;
	};
}());


const developerFns = (function () {
	function code() {return 'coding...';}
	return function () {
		this.code = code;
		return this;
	};
}());
