// Use module.register() to register asynchronous hooks in a dedicated thread.
import { register } from 'node:module';
register('./hooks.mjs', import.meta.url);

// If my-app.mjs is loaded statically here as `import './my-app.mjs'`, since ESM
// dependencies are evaluated before the module that imports them,
// it's loaded _before_ the hooks are registered above and won't be affected.
// To ensure the hooks are applied, dynamic import() must be used to load ESM
// after the hooks are registered.
import('./my-app.mjs');
// register-hooks.js
import { register, createRequire } from 'node:module';
register('./hooks.mjs', import.meta.url);

// Asynchronous hooks does not affect modules loaded via custom require()
// functions created by module.createRequire().
const userRequire = createRequire(import.meta.filename);
userRequire('./my-app-2.cjs');  // Hooks won't affect this
// entrypoint.mjs
import { register } from 'node:module';

register('./foo.mjs', import.meta.url);
register('./bar.mjs', import.meta.url);
await import('./my-app.mjs');


//
import { register } from 'node:module';
import { MessageChannel } from 'node:worker_threads';

// This example demonstrates how a message channel can be used to
// communicate with the hooks, by sending `port2` to the hooks.
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
    console.log(msg);
});
port1.unref();

register('./my-hooks.mjs', {
    parentURL: import.meta.url,
    data: { number: 1, port: port2 },
    transferList: [port2],
});


import assert from 'node:assert';
import { register } from 'node:module';
import { MessageChannel } from 'node:worker_threads';

// This example showcases how a message channel can be used to communicate
// between the main (application) thread and the hooks running on the hooks
// thread, by sending `port2` to the `initialize` hook.
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
    assert.strictEqual(msg, 'increment: 2');
});
port1.unref();

register('./path-to-my-hooks.js', {
    parentURL: import.meta.url,
    data: { number: 1, port: port2 },
    transferList: [port2],
});


export async function resolve(specifier, context, nextResolve) {
    // When calling `defaultResolve`, the arguments can be modified. For example,
    // to change the specifier or add conditions.
    if (specifier.includes('foo')) {
        specifier = specifier.replace('foo', 'bar');
        return nextResolve(specifier, {
            ...context,
            conditions: [...context.conditions, 'another-condition'],
        });
    }

    // The hook can also skips default resolution and provide a custom URL.
    if (specifier === 'special-module') {
        return {
            url: 'file:///path/to/special-module.mjs',
            format: 'module',
            shortCircuit: true,  // This is mandatory if not calling nextResolve().
        };
    }

    // If no customization is needed, defer to the next hook in the chain which would be the
    // Node.js default resolve if this is the last user-specified loader.
    return nextResolve(specifier);
}
