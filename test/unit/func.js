QUnit.module("Functions");

QUnit.test("Test routines", function(assert){
    assert.ok($.isPlainObject({a: "b"}), "Test passed for plain object {a: 'b'}");
    assert.ok($.isEmptyObject({}), "Test passed for empty object { }");
    assert.notOk($.isEmptyObject({a: "b"}), "Test passed for not empty object {a: 'b'}");
    assert.equal($.camelCase("data-camel-case"), "dataCamelCase", "Test passed for transform data-camel-case to dataCamelCase");
    assert.ok($.isArrayLike({
        0: 1,
        length: 1
    }), "Test passed for array like object");
    assert.notOk($.isArrayLike({
        0: 1
    }), "Test passed for not array like object");
});
