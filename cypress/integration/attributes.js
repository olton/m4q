describe("Work with attributes", ()=>{
    it("$(document).attr() must return a object", () => {
        cy.visit("/test/attributes.html");
        cy.window().then(win => {
            assert.equal(typeof win.$(document).attr(), "object");
        });
    });
    it("Get attributes id, class from div", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            expect(win.$('#my-div').attr('class')).to.equal('my-class');
            expect(win.$('#my-div').attr('id')).to.equal('my-div');
        });
    });
    it("Get id from div", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            expect(win.$('#my-div').id()).to.equal('my-div');
        });
    });
    it("Change id with $.id()", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            win.$('#my-div').id('new-id');
            expect(win.$('#new-id').id()).to.equal('new-id');
        });
    });
    it("Remove attribute class from div, must be undefined", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            const div = win.$('#my-div');

            div.removeAttr('class');

            expect(win.$('#my-div').attr('class')).to.equal(undefined);
        });
    });
    it("Set attribute id, must be new-id", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            win.$('#my-div').attr('id', 'new-id');
            expect(win.$('#new-id').attr('id')).to.equal('new-id');
        });
    });
    it("Get and set attribute for fake", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            assert.equal(win.$('#fake').attr(), undefined);
            assert.equal(win.$('#fake').attr('id'), undefined);
            assert.equal(win.$('#fake').id(), undefined);
            assert.equal(win.$('#fake').id('new_id'), undefined);
        });
    });
    it("Get meta with $.meta(), must be a object", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            expect(win.$.meta()).to.be.a('object');
        });
    });
    it("Get meta by name", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            expect(win.$.meta('test').attr('content')).to.equal('meta_test_value');
        });
    });
    it("Get meta by attribute", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            expect(win.$.metaBy('charset').attr('charset')).to.equal('UTF-8');
        });
    });
    it("Get DOCTYPE", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            expect(win.$.doctype()[0].name).to.equal('html');
        });
    });
    it("Get HTML", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            expect(win.$.html()[0].nodeName).to.equal('HTML');
        });
    });
    it("Get charset", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            assert.equal(win.$.charset(), 'UTF-8');
        });
    });
    it("Set charset", () => {
        cy.visit("/test/attributes.html");
        cy.window().then( win => {
            win.$.charset('windows-1251');
            assert.equal(win.$.charset(), 'windows-1251');
        });
    });
});