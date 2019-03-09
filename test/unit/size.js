QUnit.module("Element size");

QUnit.test("Width", function(assert){
    assert.ok($("body").width() >= 0, "Test passed for get body width");
    assert.ok($("body").outerWidth() >= 0, "Test passed for get body outer width");
});

QUnit.test("Height", function(assert){
    assert.ok($("body").height() >= 0, "Test passed for get body height");
    assert.ok($("body").outerHeight() >= 0, "Test passed for get body outer height");
});

