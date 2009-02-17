module("window");

test("Window Global Scope Equivalence", function() {
	expect(1);
	
	window.foo = "abc";
	ok( window.foo == foo, "Property created on the window is available in global scope." );
	delete window.foo;
    
});
