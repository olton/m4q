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

            assert.equal(win.$("#no_hidden").is(":hidden"), false);
            assert.equal(win.$("#inp_hidden").is(":hidden"), true);
            assert.equal(win.$("#div_hidden").is(":hidden"), true);
            assert.equal(win.$("#div_no_display").is(":hidden"), true);
            assert.equal(win.$("#div_no_visible").is(":hidden"), true);
            assert.equal(win.$("#div_opacity").is(":hidden"), true);

            assert.equal(win.$("#bar").is( win.document.getElementById("bar") ), true);
            // assert.equal(win.$("#bar").is( [ win.document.getElementById("bar") ] ), true);
            assert.equal(win.$("#bar").is( win.document.getElementsByTagName("li") ), true);
            assert.equal(win.$("#bar").is( win.document.getElementById("baz") ), false);

            assert.equal(win.$("#list1 li").first().same( win.$("#foo") ), true);
            assert.equal(win.$("#list1 li").first().same( win.$("#bar") ), false);
            assert.equal(win.$("#list1 li").last().same( win.$("#baz") ), true);

            assert.equal(win.$("#list1 li").odd().same( win.$("#foo, #baz") ), true);
            assert.equal(win.$("#list1 li").even().same( win.$("#bar") ), true);
            assert.equal(win.$("#list1 li").even().same( win.$("#baz") ), false);

            assert.equal(win.$("#list1 li").filter("#bar, #foo").same( win.$("#bar, #foo") ), true);
            assert.equal(win.$("#list1 li").filter("#baz, #foo").same( win.$("#bar, #foo") ), false);
            assert.equal(win.$("#list1 li").filter(function(el){ return el.getAttribute('id') === 'bar'}).same( win.$("#bar") ), true);
            assert.equal(win.$("#list1 li").filter(function(el){ return el.getAttribute('id') === 'bar'}).same( win.$("#baz") ), false);

        });
    });
});