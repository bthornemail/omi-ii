// hooks.mjs
export async function resolve(specifier, context, nextResolve) {
  /* implementation */
}
export async function load(url, context, nextLoad) {
  /* implementation */
}
export async function initialize({ number, port }) {
  // Receives data from `register`.
}

export async function resolve(specifier, context, nextResolve) {
  // Take an `import` or `require` specifier and resolve it to a URL.
}

export async function load(url, context, nextLoad) {
  // Take a resolved URL and return the source code to be evaluated.
}
// path-to-my-hooks.js

export async function initialize({ number, port }) {
  port.postMessage(`increment: ${number + 1}`);
}
