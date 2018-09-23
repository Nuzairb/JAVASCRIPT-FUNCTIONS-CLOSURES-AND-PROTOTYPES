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

Object.PrototypeOf(user);
Object.getPrototypeOf(user) === Object.prototype // -> true
