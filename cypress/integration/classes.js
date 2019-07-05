describe("M4Q Create element", ()=>{
    it("Check $.addClass()", () => {
        cy.visit("/test/classes.html");
        cy.window().then( win => {
            win.$("#my-div").addClass("new-class");
            assert.equal(win.$("#my-div").hasClass("new-class"), true);
        });
    });
    it("Check $.removeClass()", () => {
        cy.visit("/test/classes.html");
        cy.window().then( win => {
            win.$("#my-div").removeClass("my-class");
            assert.equal(win.$("#my-div").hasClass("my-class"), false);
        });
    });
    it("Check $.toggleClass()", () => {
        cy.visit("/test/classes.html");
        cy.window().then( win => {
            win.$("#my-div").toggleClass("my-class new-class");
            assert.equal(win.$("#my-div").hasClass("my-class"), false);
            assert.equal(win.$("#my-div").hasClass("new-class"), true);
        });
    });
    it("Check $.hasClass()", () => {
        cy.visit("/test/classes.html");
        cy.window().then( win => {
            assert.equal(win.$("#my-div").hasClass("my-class"), true);
        });
    });
    it("Check $.hasClass() extend", () => {
        cy.visit("/test/classes.html");
        cy.window().then( win => {
            win.$("#my-div").addClass("new-class");

            assert.equal(win.$("#my-div").hasClass("my-class new-class"), true);
        });
    });
    it("Check $.clearClasses()", () => {
        cy.visit("/test/classes.html");
        cy.window().then( win => {
            win.$("#my-div").clearClasses();

            assert.equal(win.$("#my-div").hasClass("my-class"), false);
        });
    });
});