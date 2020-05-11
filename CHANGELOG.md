### 1.0.6
+ [x] Init: fix minor bug for creating elements in context
+ [x] Ajax: add parameter `contentType`. If this param has value `false`, `Content-type` can't be defined.
+ [x] Animation: a new engine for animation. The `animate` function changed. Now function receives one argument.
+ [x] Contains: add checks with `:visible` to method `is`. Example: `$(...).is(':visible')`

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