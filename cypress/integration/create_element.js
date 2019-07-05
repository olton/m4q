describe("M4Q Create element", ()=>{
    it("$('<div>') must create div element", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            assert.equal(win.$("<div>")[0].tagName, "DIV");
        });
    });
    it("$('<div>').outerHtml() must return <div></div>", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            assert.equal(win.$("<div>").outerHTML(), "<div></div>");
        });
    });
    it("$('<div>', context) must create element and append to context", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            const context = win.$('body');
            const div = win.$("<div>", context).html('new div');

            assert.equal(div.parent()[0].tagName, "BODY");
        });
    });
    it("Create element with attributes $('<div>', {...}})", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            const div = win.$('<div>', {
                id: "elementId",
                class: "className"
            });

            assert.equal(div.id(), "elementId");
            assert.equal(div.attr('class'), "className");
        });
    });
    it("Create element from html $('<div><p>Lorem ipsum</p></div>')", () => {
        cy.visit("/test/create_element.html");
        cy.window().then( win => {
            const div = win.$('<div><p>Lorem ipsum</p></div>');

            assert.equal(div.outerHTML(), "<div><p>Lorem ipsum</p></div>");
        });
    });
});