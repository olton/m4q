describe("M$Q DataSet", function(){
    it("Check dataset exists", () => {
        cy.visit("/test/data.html");
        cy.window().then(win => {
            assert.equal(win.$.dataSet().expando, "DATASET:UID:M4Q");
        });
    });
    it("Check set data", () => {
        cy.visit("/test/data.html");
        cy.window().then(win => {
            const div = win.$("#div");
            div.data("test", "value");
            assert.equal(div.data("test"),"value");
            assert.equal(div.data("fake"),undefined);
            assert.equal(win.$("#fake").data("test", "value"),undefined);
            assert.equal(win.$("#fake").data("test"),undefined);
        });
    });
    it("Check remove data", () => {
        cy.visit("/test/data.html");
        cy.window().then(win => {
            const div = win.$("#div");
            div.data("test", "value");
            assert.equal(div.data("test"),"value");
            assert.isObject(div.removeData("test"));
            assert.equal(div.data("test"),undefined);
        });
    });
    it("Check if element has data", () => {
        cy.visit("/test/data.html");
        cy.window().then(win => {
            const div = win.$("#div").data("test", "value");
            assert.equal(win.$.hasData(div[0]),true);
            assert.isObject(div.removeData("test"));
            assert.equal(win.$.hasData(div[0]),false);
        });
    });
    it("Check element set data", () => {
        cy.visit("/test/data.html");
        cy.window().then(win => {
            const div = win.$("#div");
            win.$.data(div[0], "test", "value");
            assert.equal(win.$.hasData(div[0]),true);
            assert.equal(div.data("test"),"value");
        });
    });
    it("Check element remove data", () => {
        cy.visit("/test/data.html");
        cy.window().then(win => {
            const div = win.$("#div");
            win.$.data(div[0], "test", "value");
            assert.equal(win.$.hasData(div[0]),true);
            win.$.removeData(div[0], "test");
            assert.equal(div.data("test"),undefined);
        });
    });
    it("Check custom dataset", () => {
        cy.visit("/test/data.html");
        cy.window().then(win => {
            const dataSet = win.$.dataSet('myDataSet');
            assert.isObject(dataSet);
            assert.equal(dataSet.expando,"DATASET:UID:MYDATASET");
        });
    });
});