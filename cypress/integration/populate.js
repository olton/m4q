describe("M$Q populate", function(){
    it("Window must have property m4q", () => {
        cy.visit("/test/index.html");
        cy.window().should('have.property', 'm4q');
    });
    it("$() must be instanceof m4q", () => {
        cy.visit("/test/index.html");
        cy.window().then(win => {
            assert.equal(win.$() instanceof win.m4q, true);
        });
    });
    it("$.noConflict() - $ must be undefined", () => {
        cy.visit("/test/index.html");
        cy.window().then(win => {
            win.$.noConflict();
            assert.equal(win.$, undefined);
        });
    });
    it("$.global() - $() must be instance of m4q", () => {
        cy.visit("/test/index.html");
        cy.window().then(win => {
            win.$.noConflict();
            assert.equal(win.$, undefined);
            win.m4q.global();
            assert.equal(win.$() instanceof win.m4q, true);
        });
    });
});