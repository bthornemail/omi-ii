module.stripTypeScriptTypes(code[, options])#
Added in: v23.2.0, v22.13.0
History
Stability: 1.2 - Release candidate

code <string> The code to strip type annotations from.
options <Object>
mode <string> Default: 'strip'. Possible values are:
'strip' Only strip type annotations without performing the transformation of TypeScript features.
sourceUrl <string> Specifies the source url used in the source map.
Returns: <string> The code with type annotations stripped.
module.stripTypeScriptTypes() removes type annotations from TypeScript code. It can be used to strip type annotations from TypeScript code before running it with vm.runInContext() or vm.compileFunction().

By default, it will throw an error if the code contains TypeScript features that require transformation, such as enums. See type-stripping for more information.

WARNING: The output of this function should not be considered stable across Node.js versions, due to changes in the TypeScript parser.

import { stripTypeScriptTypes } from 'node:module';
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code);
console.log(strippedCode);
// Prints: const a         = 1;
javascript
copy
If sourceUrl is provided, it will be used appended as a comment at the end of the output:

import { stripTypeScriptTypes } from 'node:module';
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code, { mode: 'strip', sourceUrl: 'source.ts' });
console.log(strippedCode);
// Prints: const a         = 1\n\n//# sourceURL=source.ts;
javascript
copy

x
