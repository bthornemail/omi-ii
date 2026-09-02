// register-hooks.js
import { registerHooks } from 'node:module';

registerHooks({
    resolve(specifier, context, nextResolve) {
        // Intercept and manipulate how files are found
        console.log(`Resolving: ${specifier}`);
        return nextResolve(specifier, context);
    },
    load(url, context, nextLoad) {
        // Intercept and modify source code contents
        console.log(`Loading: ${url}`);
        return nextLoad(url, context);
    }
});
