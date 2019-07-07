import "../../build/m4q";

describe("M$Q DataSet", function(){
    it("$.proxy() for function name(){}", () => {
        const context = {
            foo: "bar"
        };
        function fn(){return this;};
        assert.equal($.proxy(fn, context)(), context);
    });
    it("$.proxy() for name = function name(){}", () => {
        const context = {
            foo: "bar"
        };
        const fn = function(){return this;};
        assert.equal($.proxy(fn, context)(), context);
    });
});