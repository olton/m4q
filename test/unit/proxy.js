QUnit.module("Proxy");

QUnit.test("$.proxy()", function(assert){

    var context = "a", proxyFunction = function(){
        return this;
    };

    assert.equal($.proxy(proxyFunction, context)(), "a", "Test passed for change context");
});