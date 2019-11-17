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