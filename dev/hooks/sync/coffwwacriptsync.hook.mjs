// coffeescript-sync-hooks.mjs
import { readFileSync } from 'node:fs';
import { registerHooks, findPackageJSON } from 'node:module';
import coffeescript from 'coffeescript';

const extensionsRegex = /\.(coffee|litcoffee|coffee\.md)$/;

function load(url, context, nextLoad) {
  if (extensionsRegex.test(url)) {
    const { source: rawSource } = nextLoad(url, { ...context, format: 'coffee' });
    const transformedSource = coffeescript.compile(rawSource.toString(), url);

    return {
      format: getPackageType(url),
      shortCircuit: true,
      source: transformedSource,
    };
  }

  return nextLoad(url, context);
}

function getPackageType(url) {
  const pJson = findPackageJSON(url);
  if (!pJson) {
    return undefined;
  }
  try {
    const file = readFileSync(pJson, 'utf-8');
    return JSON.parse(file)?.type;
  } catch {
    return undefined;
  }
}

registerHooks({ load });
}
