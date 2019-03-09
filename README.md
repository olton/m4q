# m4q - DOM manipulation helper

The m4q is a small library for DOM manipulation. 
This helper designed for [Metro 4](https://metroui.org.ua) project to replace jQuery.
m4q is not a complete jQuery equivalent and there are differences.
 
## Version 0.1.0 - alpha 

#### Status
[![develop Status](https://img.shields.io/badge/status-in&nbsp;develop-lightgrey.svg)](https://david-dm.org/olton/m4q)
[![dependencies Status](https://david-dm.org/olton/m4q/status.svg)](https://david-dm.org/olton/m4q)
[![devDependencies Status](https://david-dm.org/olton/m4q/dev-status.svg)](https://david-dm.org/olton/m4q?type=dev)
[![full size](http://img.badgesize.io/olton/m4q/master/build/m4q.js?label=full+size&color=orange)](https://github.com/olton/m4q/blob/master/build/m4q.js)
[![gzip full](http://img.badgesize.io/olton/m4q/master/build/m4q.js?compression=gzip&label=gzip+full&color=yellow)](https://github.com/olton/m4q/blob/master/build/m4q.js)
[![gzip min](http://img.badgesize.io/olton/m4q/master/build/m4q.min.js?compression=gzip&label=gzip+min&color=ff69b4)](https://github.com/olton/m4q/blob/master/build/m4q.min.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](https://github.com/olton/m4q/blob/master/LICENSE)
<!--
[![Known Vulnerabilities](https://snyk.io/test/github/olton/m4q/badge.svg?targetFile=package.json)](https://snyk.io/test/github/olton/m4q?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/4201551c70bc4ee030b5/maintainability)](https://codeclimate.com/github/olton/m4q/maintainability)
-->

### Features (already implemented) 

#### Population
- `m4q` - main

If `window.$` and/or `window.$M` is undefined, m4q use its.  
To add aliases `$` and `$m` for `m4q` manually, you can use method `m4q.global()`

- `$M()` - shorten alias 
- `$()` - short alias 

To relinquish m4q's control of the `$` and `$M` variables, you can use method `m4q.noConflict([removeAll])`.

#### Constructor
- `$( "div" )` - select by `tag name`
- `$( ".div" )` - select by `class name`
- `$( "#div" )` - select by `id`
- `$( "<div>" )` - create by `tag name`
- `$( "<div>", context )` - create in context
- `$( "<div>any_text_or_html</div>" )` - create by `html`
- `$( "<div>...</div><div>...</div>" )` - create by `tags`
- `$( "<div>", {...} )` - create by tag with attributes as object
- `$( $(...) )` - create by `m4q` as argument
- `$( jQuery(...) )` - import from jQuery
- `$( function(){} )` - Create document.ready function

#### Loop
- `$.each()`
- `$(...).each()`

#### Visibility
- `$(...).toggle()` - toggle show/hide
- `$(...).hide()` - hide elements (used `dispaly`)
- `$(...).show()` - show element (used `dispaly`)
- `$(...).visible(true|false)` - set elements visible or invisible  (used `visibility`)

#### Animation
- `$.animate(...)`
- `$(...).animate(...)`

##### Easing functions
- `$.easing.linear`
- `$.easing.easyIn`
- `$.easing.easyOut`
- `$.easing.easyInOut`
- `$.easing.easyInQuad`
- `$.easing.easyOutQuad`
- `$.easing.easyInOutQuad`
- `$.easing.easyInCubic`
- `$.easing.easyOutCubic`
- `$.easing.easyInOutCubic`
- `$.easing.easyInQuart`
- `$.easing.easyOutQuart`
- `$.easing.easyInOutQuart`
- `$.easing.easyInQuint`
- `$.easing.easyOutQuint`
- `$.easing.easyInOutQuint`
- `$.easing.easyInElastic`
- `$.easing.easyOutElastic`
- `$.easing.easyInOutElastic`
- `$.easing.easyInSin`
- `$.easing.easyOutSin`
- `$.easing.easyInOutSin`

#### Effects
- `$(...).fadeIn( )` 
- `$(...).fadeOut( )` 
- `$(...).slideIn( )`
- `$(...).slideOut ()` 

#### Finding
- `$(...).index()`
- `$(...).get(index)`
- `$(...).eq(index)`
- `$(...).contains(selector)`
- `$(...).is(selector)`
- `$(...).find(selector)`
- `$(...).children(selector)`
- `$(...).parent(selector)`
- `$(...).closest(selector)`
- `$(...).siblings(selector)`
- `$(...).prev(selector)`
- `$(...).next(selector)`
- `$(...).filter(selector)`
- `$(...).last()`
- `$(...).first()`
- `$(...).ind()`
- `$(...).even()`
- `$(...).odd()`

#### Html and text
- `$(...).html()` - get `innerHTML`
- `$(...).html(value)` - set `innerHTML`
- `$(...).text()` - get `textContent`
- `$(...).text(value)` - set `textContent`
- `$(...).innerText()` - get `innerText`
- `$(...).innerText(value)` - set `innerText`
- `$(...).outerHTML()` - get `outerHTML`
- `$(...).empty()` - clear `innerHTML`

#### CSS and classes
- `$(...).style()`
- `$(...).style(name)`
- `$(...).css(name)`
- `$(...).css(name, value)`
- `$(...).css({...})`
- `$(...).addClass(...)`
- `$(...).removeClass(...)`
- `$(...).toggleClass(...)`
- `$(...).containsClass(...)`
- `$(...).hasClass(...)`
- `$(...).clearClasses()`
- `$(...).id()`

#### Attributes and properties
- `$(...).attr()` - get all attributes
- `$(...).attr(name)` - get attribute by name
- `$(...).attr(name, value)` - set attribute by name
- `$(...).attr({...})` - set attributes 
- `$(...).removeAttr(name)` - remove attribute 
- `$(...).toggleAttr(name, value)` - remove attribute if exists, else set attribute
- `$(...).prop(name, value)` - set element property: checked, disabled

#### Manipulation
- `$(...).append( )`
- `$(...).appendTo( )`
- `$(...).prepend( )`
- `$(...).prependTo( )`
- `$(...).insertAfter( )`
- `$(...).insertBefore( )`
- `$(...).after( )`
- `$(...).before( )`

#### Events
- `$(...).on( )`
- `$(...).one( )`
- `$(...).off( )`
- `$(...).trigger( )`
- `$(...).ready( )`

##### Event aliases
- `$(...).blur(selector, handler)`
- `$(...).focus(selector, handler)`
- `$(...).resize(selector, handler)`
- `$(...).scroll(selector, handler)`
- `$(...).click(selector, handler)`
- `$(...).dblclick(selector, handler)`
- `$(...).mousedown(selector, handler)`
- `$(...).mouseup(selector, handler)`
- `$(...).mousemove(selector, handler)`
- `$(...).mouseover(selector, handler)`
- `$(...).mouseout(selector, handler)`
- `$(...).mouseenter(selector, handler)`
- `$(...).mouseleave(selector, handler)`
- `$(...).change(selector, handler)`
- `$(...).select(selector, handler)`
- `$(...).submit(selector, handler)`
- `$(...).keydown(selector, handler)`
- `$(...).keypress(selector, handler)`
- `$(...).keyup(selector, handler)`
- `$(...).contextmenu(selector, handler)`
- `$(...).load(selector, handler)`

#### Ajax
- `$.ajax({...})`
- `$.get(url, data, dataType, headers)` - alias for `$.ajax` for `GET` method
- `$.post(url, data, dataType, headers)` - alias for `$.ajax` for `POST` method
- `$.put(url, data, dataType, headers)` - alias for `$.ajax` for `PUT` method
- `$.patch(url, data, dataType, headers)` - alias for `$.ajax` for `PATCH` method
- `$.delete(url, data, dataType, headers)` - alias for `$.ajax` for `DELETE` method
- `$.json(url, data, dataType, headers)` - alias for `$.ajax` for `getJSON` method

#### Data
- `$.hasData(el)`
- `$.data(el, name, data)`
- `$.removeData(el, name)`
- `$(...).data()`
- `$(...).data(key)`
- `$(...).data(key, value)`
- `$(...).removeData(key)`

#### Value
- `$(...).val( )`
- `$(...).val( value )`

#### Proximity
- `$.proxy( fn, context )`

#### Position end size
- `$(...).height( )`
- `$(...).height( val )`
- `$(...).width( )`
- `$(...).width( val )`
- `$(...).outerHeight( )`
- `$(...).outerHeight( val )`
- `$(...).outerWidth( )`
- `$(...).outerWidth( val )`
- `$(...).offset( )`
- `$(...).position( excludeMargin )`

#### Promise
- `new Promise( resolve, reject )`

#### Async
- `setImmediate( func, [, arg1, ...] )`
- `clearImmediate( handler )`
