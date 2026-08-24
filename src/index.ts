import './foo.mjs?query=1'; // loads ./foo.mjs with query of "?query=1"
import './foo.mjs?query=2'; // loads ./foo.mjs with query of "?query=2"
// Text modules are available behind the
import 'data:text/javascript,console.log("hello!");';
import _ from 'data:application/json,"world!"' with { type: 'json' };
import fooData from './foo.json' with { type: 'json' };

const { default: barData } =
    await import('./bar.json', { with: { type: 'json' } });


if (import.meta.main) main();
export const five = await Promise.resolve(5);
import { spawn } from 'node:child_process';
import { execPath } from 'node:process';

spawn(execPath, [
    '--input-type=module',
    '--eval',
    // Never-resolving Promise:
    'await new Promise(() => {})',
]).once('exit', (code) => {
    console.log(code); // Logs `13`
});

// register-hooks.js
import { registerHooks } from 'node:module';
registerHooks({
    resolve(specifier, context, nextResolve) { /* implementation */ },
    load(url, context, nextLoad) { /* implementation */ },
});
import { registerHooks } from 'node:module';

registerHooks({ /* implementation of synchronous hooks */ });

// If loaded using static import, the hooks would not be applied when loading
// my-app.mjs, because statically imported modules are all executed before its
// importer regardless of where the static import appears.
// import './my-app.mjs';

// my-app.mjs must be loaded dynamically to ensure the hooks are applied.
await import('./my-app.mjs');

node--import 'data:text/javascript,import {registerHooks} from "node:module"; registerHooks(/* hooks code */);' ./my-app.js

// entrypoint.mjs
import { registerHooks } from 'node:module';

const hook1 = { /* implementation of hooks */ };
const hook2 = { /* implementation of hooks */ };
// hook2 runs before hook1.
registerHooks(hook1);
registerHooks(hook2);

import { registerHooks } from 'node:module';

const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
        console.log('resolve hook called for', specifier);
        return nextResolve(specifier, context);
    },
    load(url, context, nextLoad) {
        return nextLoad(url, context);
    },
});

// At this point, the hooks are active and will be called for
// any subsequent import() or require() calls.
await import('./my-module.mjs');

// Later, remove the hooks from the chain.
hooks.deregister();

// Subsequent loads will no longer trigger the hooks.
await import('./another-module.mjs');

import { registerHooks } from 'node:module';

function resolve(specifier, context, nextResolve) {
    // When calling `defaultResolve`, the arguments can be modified. For example,
    // to change the specifier or to add applicable export conditions.
    if (specifier.includes('foo')) {
        specifier = specifier.replace('foo', 'bar');
        return nextResolve(specifier, {
            ...context,
            conditions: [...context.conditions, 'another-condition'],
        });
    }

    // The hook can also skip default resolution and provide a custom URL.
    if (specifier === 'special-module') {
        return {
            url: 'file:///path/to/special-module.mjs',
            format: 'module',
            shortCircuit: true,  // This is mandatory if nextResolve() is not called.
        };
    }

    // If no customization is needed, defer to the next hook in the chain which would be the
    // Node.js default resolve if this is the last user-specified loader.
    return nextResolve(specifier);
}

registerHooks({ resolve });


import { registerHooks } from 'node:module';
import { Buffer } from 'node:buffer';

function load(url, context, nextLoad) {
    // The hook can skip default loading and provide a custom source code.
    if (url === 'special-module') {
        return {
            source: 'export const special = 42;',
            format: 'module',
            shortCircuit: true,  // This is mandatory if nextLoad() is not called.
        };
    }

    // It's possible to modify the source code loaded by the next - possibly default - step,
    // for example, replacing 'foo' with 'bar' in the source code of the module.
    const result = nextLoad(url, context);
    const source = typeof result.source === 'string' ?
        result.source : Buffer.from(result.source).toString('utf8');
    return {
        source: source.replace(/foo/g, 'bar'),
        ...result,
    };
}

registerHooks({ load });
