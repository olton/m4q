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
    it("Check $.eq()", () => {
        cy.visit("/test/contains.html");
        cy.window().then( win => {
            assert.equal(win.$("#list1 li").eq() instanceof win.$, true);
            assert.equal(win.$("#list1 li").eq(1).id(), "bar");
            assert.equal(win.$("#list1 li").eq(100).length, 0);
            assert.equal(win.$("#fake li").eq() instanceof win.$, true);
            assert.equal(win.$("#fake li").eq(1).length, 0);
        });
    });
    it("Check $.same()", () => {
        cy.visit("/test/contains.html");
        cy.window().then( win => {
            const l1 = win.$("#bar");
            const l2 = win.$("#baz");
            assert.equal(win.$("#list1 li#bar").same(l1), true);
            assert.equal(win.$("#list1 li#bar").same(l2), false);
        });
    });
    it("Check $.is()", () => {
        cy.visit("/test/contains.html");
        cy.window().then( win => {
            assert.equal(win.$("#list1 li#baf").is(), false);
            assert.equal(win.$("#fake").is("li"), false);
            assert.equal(win.$("#list1 li#bar").is("li"), true);
            assert.equal(win.$("#list1 li#bar").is("a"), false);
            assert.equal(win.$("#list1 li#baz").is(win.$("#baz")), true);
            assert.equal(win.$("#op1").is(":selected"), false);
            assert.equal(win.$("#op2").is(":selected"), true);
            assert.equal(win.$("#ch1").is(":checked"), true);
            assert.equal(win.$("#ch2").is(":checked"), false);
        });
    });
});