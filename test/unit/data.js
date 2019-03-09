QUnit.module("Data testing");

QUnit.test("Core Data", function(assert){
    var div = $("<div>");

    assert.ok($.Data, "Test passed for m4q Data object $.Data");
    assert.ok(div.data(), "Test passed for retrieve all element data attributes");
    assert.equal(div.data("test"), undefined, "Test passed for retrieve not present key");

    assert.ok($.data(div[0], "role", {}), "Test passed set role");
    assert.ok(typeof div.data("role") === "object", "Test passed get role");

    div.data("test", "value");
    assert.equal(div.data("test"), "value", "Test passed for set and get value");
    assert.equal(div.removeData("test").data("test"), undefined, "Test passed for removeData");

});