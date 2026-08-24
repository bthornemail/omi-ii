}
json
copy
// some-module.js
console.log('some module!');
mjs
copy
Running node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./import-map-hooks.js"));' main.js or node --import ./import-map-sync-hooks.js main.js should print some module!.

Source Map Suppo
To get the corresponding 1-indexed line and column numbers from a lineNumber and columnNumber as they are reported by Error stacks and CallSite objects, use sourceMap.findOrigin(lineNumber, columnNumber)

sourceMap.findOrigin(lineNumber, columnNumber)#
Added in: v20.4.0, v18.18.0
lineNumber <number> The 1-indexed line number of the call site in the generated source
columnNumber <number> The 1-indexed column number of the call site in the generated source
Returns: <Object>
Given a 1-indexed lineNumber and columnNumber from a call site in the generated source, find the corresponding call site location in the original source.

If the lineNumber and columnNumber provided are not found in any source map, then an empty object is returned. Otherwise, the returned object contains the following keys:

name <string> | <undefined> The name of the range in the source map, if one was provided
fileName <string> The file name of the original source, as reported in the SourceMap
lineNumber <number> The 1-indexed lineNumber of the corresponding call site in the original source
columnNumber <number> The 1-indexed columnNumber of the corresponding call site in the original source