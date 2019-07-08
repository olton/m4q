describe("M$Q html, test, props", function(){
    it("Test get html inner", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            assert.equal(win.$("#div1").html(), "<span>Test text</span>");
        });
    });
    it("Test get html outer", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            assert.equal(win.$("#div1").outerHTML(), "<div id=\"div1\"><span>Test text</span></div>");
        });
    });
    it("Test set html inner", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            const div = win.$("#div1").html("<p>New html</p>");
            assert.equal(div.html(), "<p>New html</p>");
        });
    });
    it("Test get textContent", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            assert.equal(win.$("#div1").text(), "Test text");
            assert.notEqual(win.$("#div1").html(), "Test text");
        });
    });
    it("Test get textInner", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            assert.equal(win.$("#div1").innerText(), "Test text");
        });
    });
    it("Test set textContent", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            const div = win.$("#div1").text("New text");
            assert.equal(div.text(), "New text");
            assert.equal(div.html(), "New text");
        });
    });
    it("Test set textInner", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            const div = win.$("#div1").innerText("New text");
            assert.equal(div.innerText(), "New text");
            assert.equal(div.html(), "New text");
        });
    });
    it("Test get property", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            assert.equal(win.$("#div1").prop("disabled"), undefined);
            assert.equal(win.$("#div1").prop("hidden"), false);
        });
    });
    it("Test set property", () => {
        cy.visit("/test/html.html");
        cy.window().then(win => {
            const div = win.$("#div1").prop("disabled", true).prop("hidden", true);
            assert.equal(div.prop("disabled"), true);
            assert.equal(div.prop("hidden"), true);
        });
    });
});