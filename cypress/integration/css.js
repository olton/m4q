describe("M4Q CSS routines", ()=>{
    it("Check $.style()", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            assert.equal(win.$("#my-div").style("display"), "block");
        });
    });
    it("Get css properties with $.css()", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            assert.equal(win.$("#my-div").css("display"), "block");
            assert.equal(win.$("#my-div").css("border-top-width"), "0px");
            assert.isObject(win.$("#my-div").css("display, border-top-width"));
        });
    });
    it("Set one css property with $.css()", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            win.$("#my-div").css("display", "flex");
            assert.equal(win.$("#my-div").css("display"), "flex");
        });
    });
    it("Set css properties with $.css()", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            win.$("#my-div").css({
                display: "flex",
                border: "1px solid red"
            });
            assert.equal(win.$("#my-div").css("display"), "flex");
            assert.equal(win.$("#my-div").css("border"), "1px solid rgb(255, 0, 0)");
        });
    });
    it("Check $.removeStyleProperty()", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            win.$("#my-div").css("display", "flex");
            assert.equal(win.$("#my-div").removeStyleProperty("display").css("display"), "block");
        });
    });
    it("Get scrollTop", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            assert.equal(win.$("#my-div").scrollTop(), 0);
        });
    });
    it("Set scrollTop", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            win.$("#my-div").scrollTop(10);
            assert.equal(win.$("#my-div").scrollTop(), 0);
        });
    });
    it("Get scrollLeft", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            assert.equal(win.$("#my-div").scrollLeft(), 0);
        });
    });
    it("Set scrollLeft", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            win.$("#my-div").scrollLeft(10);
            assert.equal(win.$("#my-div").scrollLeft(), 0);
        });
    });
});