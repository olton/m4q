QUnit.module("Core");

QUnit.test("Populating", function(assert){
    assert.ok(m4q, "m4q present");
    assert.ok($M, "$M present");
    assert.ok($, "$ present");
});

QUnit.test("Constructor", function(assert){
    var elem;

    /*1*/
    assert.equal($().length, 0, "Length must be zero if no arguments $( )");
    /*2*/
    assert.equal($(undefined).length, 0, "Length must be zero if undefined $( undefined )");
    /*3*/
    assert.equal($(null).length, 0, "Length must be zero if null $( null )");
    /*4*/
    assert.equal($("").length, 0, "Length must be zero if empty string $( '' )");

    /*5*/
    try {
        $("#");
    } catch ( e ) {
        assert.ok( true, "Threw an error on #id with no id" );
    }

    /*6*/
    try {
        $(".");
    } catch ( e ) {
        assert.ok( true, "Threw an error on .class with no class" );
    }

    /*7*/
    assert.equal( $( window ).length, 1, "Correct number of elements generated for $( window )" );
    /*8*/
    assert.equal( $( document ).length, 1, "Correct number of elements generated for $( document )" );
    /*9*/
    assert.equal( $( document.body ).length, 1, "Correct number of elements generated for $( document.body )" );
    /*10*/
    assert.ok( $( "<div>" ) instanceof m4q, "Test passed for $( '<div>' ) instanceof m4q object" );
    /*11*/
    assert.equal( $( document.body ).get( 0 ), $( "body" ).get( 0 ), "Test passing an html node to the factory" );
    /*12*/
    assert.equal( $( document.body )[0].tagName, $( "body" )[0].tagName, "Test passing an html node to the factory" );
    /*13*/
    assert.equal( $("<div>").length, 1, "Correct number of elements generated for $('<div>')" );

    /*14*/
    assert.equal( $("<div>", {
        id: "div-elem-1"
    }).attr("id"), "div-elem-1", "Correct set attributes for $('<div>', {id: 'div-elem-1'})" );

    /*15*/
    elem = $( "  <em>hello</em>" )[ 0 ];
    assert.equal( elem.nodeName.toLowerCase(), "em", "Leading space" );

    /*16*/
    elem = $( "\n\n<em>world</em>" )[ 0 ];
    assert.equal( elem.nodeName.toLowerCase(), "em", "Leading newlines" );

    /*17*/
    var str_17 = "<div><h1>The title</h1><hr/><p>The paragraph</p></div>";
    assert.ok( $(str_17).length > 0, "Constructor for complex html <div><h1>The title</h1><hr/><p>The paragraph</p></div>" );

    /*18*/
    var str_18 = "<div></div><div></div><div></div>";
    assert.ok( $(str_18).length > 0, "Constructor for complex html three in a row <div></div><div></div><div></div>" );

    /*19*/
    var div_19 = $("<div></div><div></div><div></div>");
    assert.equal($(div_19).length, 3, "Test passed for argument instance of m4q");

});