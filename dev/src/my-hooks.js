// my-hooks.js

// Optional initialization data passed from main thread
export async function initialize(data) {
  console.log("Hooks initialized with data:", data);
}

// Intercept specifier resolution
export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'virtual-module') {
    return {
      shortCircuit: true,
      url: 'file:///path/to/virtual.js'
    };
  }
  return nextResolve(specifier, context);
}

// Intercept file loading
export async function load(url, context, nextLoad) {
  const result = await nextLoad(url, context);
  // Modify source code strings here if desired
  return result;
}
