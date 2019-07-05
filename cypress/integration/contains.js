describe("M4Q CSS routines", ()=>{
    it("Check $.is()", () => {
        cy.visit("/test/contains.html");
        cy.window().then( win => {
            assert.equal(win.$("#list1").index("#bar"), 1);
            assert.equal(win.$("#list1").index(win.$("#bar")), 1);
            assert.equal(win.$("#list1").index(win.$("#baf")), -1);
            assert.equal(win.$("#list1").index("#baf"), -1);
        });
    });
    it("Check $.get()", () => {
        cy.visit("/test/contains.html");
        cy.window().then( win => {
            assert.isArray(win.$("#list1 li").get());
            assert.equal(win.$("#list1 li").get(1).innerText, "bar");
            assert.equal(win.$("#list1 li").get(-1).innerText, "baz");
            assert.equal(win.$("#list1 li").get(100), undefined);
        });
    });
});