### 1.0.10
+ [x] Attributes: fixed method `attr` when user define one argument

### 1.0.9
+ [x] Core: added function `$.isLocalhost([hostname])`, **true** if host is localhost.
+ [x] Core: added property `$.localhost`, **true** if current location is localhost.
+ [x] Core: added property `$.touchable`, **true** if device detected as touchable.
+ [x] Manipulation: added methods `appendText(...any_text...)`, `prependText(...any_text...)`. 

### 1.0.8
+ [x] Constructor: add short-tag for selecting by `data-role` with `@role` 
+ [x] Visibility: fix method `hide` for detecting initial `display` value
+ [x] Init: improve init method
+ [x] Core: added property `$.device`, **true** for mobile a device.

### 1.0.7
+ [x] Animation: fixed using String.includes for IE11. Change to String.indexOF.
+ [x] Animation: add operator `/` to `_getRelativeValue()`.
+ [x] Events: fix `fire`. Now main is constructor `CustonEvent`, for old - `createEvent`
+ [x] Manipulation: add method `wrap`, `wrapAll`, `wrapInner`. The method puts elements inside the wrapper and return `wrapper(s)`. 
+ [x] Init: change `throw Error` to `console.warn` when selector is `#` or `.`
+ [x] setImmediate: add support for `process` and `web workers` 

### 1.0.6
+ [x] Init: fix minor bug for creating elements in context
+ [x] Ajax: add parameter `contentType`. If this param has value `false`, `Content-type` can't be defined.
+ [x] Animation: a new engine for animation. The `animate` function changed. Now function receives one argument.
+ [x] Contains: add checks with `:visible` to method `is`. Example: `$(...).is(':visible')`
+ [x] Utils: add method `$.random(array | a, b)` 
+ [x] Utils: add method `$.getUnit(a)` 
+ [x] Utils: add method `$.strip(where, what)` 
+ [x] Utils: add method `$.hasProp(obj, prop)` 
+ [x] Utils: add method `$.dashedName(val)` 
+ [x] Classes: add method `$(...).removeClassBy(mask)`

### 1.0.5
+ [x] Events: fix firing events, Metro 4 issue 1476
+ [x] Events: optimize method `trigger`, now this is a synonym of `fire`

### 1.0.4
+ [x] Manipulation: optimise `append`, `prepend` to one definition for IE
+ [x] Script: add `$.script`, `$.fn.script` to execute scripts from element or create script object
+ [x] Manipulation: `$.fn.append`, `$.fn.prepend` now support script tag processing
+ [x] Clone: now support cloning `data` if second argument `withData`is `true` - `$(el).clone(true, true)`
+ [x] Events: nwo you can define event name with `hyphen` or in `camelCase` notation. Example: `mouse-down`, `accordionCreate`
+ [x] Ajax: fixed handler for sending data
+ [x] Ajax: fixed `$.json` if returned value can't be parsed
+ [x] Ajax: fixed `post` for `object`
+ [x] $: add $.serializeToArray(form), $serialize(form)
+ [x] Events: fixed `removeEventListener`

### 1.0.3
+ [x] Events: add `$(document).ready(...)`
+ [x] Events: fix context for event handler function
+ [x] Init: add support for array. Now you can compose `$` from array of `$`
+ [x] Events: improve method `on`
+ [x] Promise: add method `always(onAlways)`

### 1.0.2
+ [x] Events: fix `function.name` property for IE11
+ [x] Ajax: fix creating additional headers for request
+ [x] TypeScript: add TypeScript definition 

### 1.0.1
+ [x] m4q: fix initialization when `metro4` added into `head` 

### 1.0.0
+ [x] First release