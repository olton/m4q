QUnit.module("Attributes");

QUnit.test("attr()", function(assert){
    assert.ok($("body").attr() !== undefined, "Test passed for attr() with no argument");
    assert.ok($("body").attr(null) === null, "Test passed for attr( null ) with no argument");
    assert.ok($("body").attr(undefined) === undefined, "Test passed for attr( undefined ) with no argument");
    assert.equal($("body").attr("fake"), null, "Test passed for non existing attr( 'fake' ) ");

    document.body.setAttribute("data-test", "test-value");
    assert.equal($("body").attr("data-test"), $(document.body).attr("data-test"), "Test passed for gets attribute $('body').attr() === $(document.body).attr()");

    assert.equal($("body").attr("data-test", "test-value").attr("data-test"), "test-value", "Test passed for set/get attribute");

    document.body.setAttribute("data-toggle-test", "test-value");
    assert.equal($("body").toggleAttr("data-toggle-test").attr("data-toggle-test"), null, "Test passed for toggle attribute");
});