angular.module('app.common')

.factory('Utils', function( ) {
	var instance = { };

	instance.isUndefinedOrNull = function(obj) {
		return !angular.isDefined(obj) || obj === null;
	};

	/* 	instance.getFunctionName()

		For the *object* to have a constructor name, use a function, e.g:
	 	
	 	function Foo() { }
		var obj = new Foo();
		console.log(obj.constructor.name)	// "Foo"
		
		Defining an object in the following way doesn't work:

		var obj = {};
		console.log(obj.constructor.name)	// "Object"

		For the *function* to have a name, it must not be declared anonymously, e.g:

		obj.myFunction = function myFunction() {}
		console.log(args.callee.name)		// "myFunction"

		Whereas the following will return an empty String:
		obj.myFunction = function () {}
		console.log(args.callee.name)		// ""
	*/

	instance.getFunctionName = function(object, args) {

		var funcName = args.callee.name;
		if ( funcName === "") funcName = "anonymousFunc";

		return object.constructor.name + "." + funcName;
	};

	return instance;
});