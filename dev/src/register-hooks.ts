// register-hooks.js
import { registerHooks } from 'node:module';

registerHooks({
    resolve(specifier, context, nextResolve) {
        // Intercept and manipulate how files are found

        //      console.log(`Resolving: ${specifier}`);
        //	console.log(specifier)
        //	console.log(context)

        //	if (specifier === "metron") throw new Error("found")
        if (specifier === 'virtual module') {
            return {
                shortCircuit: true,
                url: 'file:///path/to/virtual.js'
            };
        }
        if (specifier === 'metron') {
            return {
                shortCircuit: true,
                url: 'file:///data/data/com.termux/files/home/omi-ii/dev/src/metron.ts'
            };
        }
        return nextResolve(specifier, context);
    },
    load(url, context, nextLoad) {
        // Intercept and modify source code contents
        console.log(`Loading: ${url}`);
        console.log(`Loading: ${url} context: ${context}`);
        //        console.log(context);
        //	if (url === 'file:///path/to/virtual.js') throw new Error("file:///path/to/virtual.js")
        // The hook can skip default loading and provide a custom source code.
        if (url === 'file:///path/to/virtual.js') {
            return {
                source: 'const special = 42;',
                format: 'commonjs',
                shortCircuit: true  // This is mandatory if nextLoad() is not called.
            };
        }

        return nextLoad(url, context);
        // It's possible to modify the source code loaded by the next - possibly default - step,
        // for example, replacing 'foo' with 'bar' in the source code of the module.
        /*
        const result = nextLoad(url, context);
        const source = typeof result.source === 'string' ?
            result.source : Buffer.from(result.source).toString('utf8');
        return {
            source: source.replace(/foo/g, 'bar'),
            ...result,
            };
            */
    }
});
