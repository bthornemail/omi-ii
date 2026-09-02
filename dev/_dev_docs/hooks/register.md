import { readFile } from 'node:fs/promises';

// Asynchronous version accepted by module.register(). This fix is not needed
// for the synchronous version accepted by module.registerHooks().
export async function load(url, context, nextLoad) {
    const result = await nextLoad(url, context);
    if (result.format === 'commonjs') {
        result.source ??= await readFile(new URL(result.responseURL ?? url));
    }
    return result;
}
