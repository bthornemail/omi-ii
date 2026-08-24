Package maps provide a mechanism to control package resolution without relying on the node_modules folder structure. When enabled via the --experimental-package-map flag, Node.js uses a JSON configuration file to determine how bare specifiers are resolved.

This feature is useful for:

Monorepos: Define explicit dependency relationships between workspace packages without symlinks or hoisting complexities.
Dependency isolation: Prevent packages from accessing undeclared dependencies (phantom dependencies).
Low file system coupling: The package resolution algorithm runs without inspecting the file system, relying instead on static data tables.
Configuration file format#
The package map configuration file is a JSON file with a packages object. Each key in packages is called a package ID and is a unique identifier for a package entry:

```js
{
  "packages": {
    "app": {
      "url": "./app",
      "dependencies": {
        "component": "component-v2"
      }
    },
    "legacy": {
      "url": "./legacy",
      "dependencies": {
        "component": "component-v1"
      }
    },
    "component-v1": {
      "url": "./vendor/component-1.0.0"
    },
    "component-v2": {
      "url": "./vendor/component-2.0.0"
    }
  }
}
```

```js
{
  "packages": {
    "app-old": {
      "url": "./app-old",
      "dependencies": {
        "lib": "lib-old"
      }
    },
    "app-new": {
      "url": "./app-new",
      "dependencies": {
        "lib": "lib-new"
      }
    },
    "lib-old": {
      "url": "./lib",
      "dependencies": {
        "react": "react-15"
      }
    },
    "lib-new": {
      "url": "./lib",
      "dependencies": {
        "react": "react-18"
      }
    }
  }
}

```

In the example above both lib-old and lib-new use the same ./lib folder to store their sources, the only difference being in which version of react they'll access when performing require calls or using import.

Because multiple package entries share the same URL, resolving a bare specifier from a file within that URL is ambiguous unless the originating package ID is known. If the package ID cannot be determined (for example, because the caller did not propagate it from a previous resolution), Node.js will throw an error rather than guess.

To support this pattern, implementers must key module instances by package ID and propagate it from each resolution result to subsequent resolution requests. This ensures that when lib requires react, the runtime knows whether the request comes from lib-old or lib-new and can select the correct dependency.

Interaction with other resolution#
Package maps only apply to bare specifiers that are not Node.js builtin modules. The following cases are not affected by package maps and continue to use standard resolution:

Relative paths or URLs (./ or ../).
Absolute paths or URLs.
Node.js builtin modules (node:fs, etc.).

"exports"#
Added in: v12.7.0
History
Type: <Object> | <string> | <string>[]
{
  "exports": "./index.js"
}
json
copy
The "exports" field allows defining the entry points of a package when imported by name loaded either via a node_modules lookup or a self-reference to its own name. It is supported in Node.js 12+ as an alternative to the "main" that can support defining subpath exports and conditional exports while encapsulating internal unexported modules.

Conditional Exports can also be used within "exports" to define different package entry points per environment, including whether the package is referenced via require or via import.

All paths defined in the "exports" must be relative file URLs starting with ./.

"imports"#
Added in: v14.6.0, v12.19.0
Type: <Object>
// package.json
{
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  "dependencies": {
    "dep-node-native": "^1.0.0"
  }
}
json
copy
Entries in the imports field must be strings starting with #.

Package imports permit mapping to external packages.

This field defines subpath imports for the current package.

Subpath imports#
Added in: v14.6.0, v12.19.0
History
In addition to the "exports" field, there is a package "imports" field to create private mappings that only apply to import specifiers from within the package itself.

Entries in the "imports" field must always start with # to ensure they are disambiguated from external package specifiers.

For example, the imports field can be used to gain the benefits of conditional exports for internal modules:

// package.json
{
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  "dependencies": {
    "dep-node-native": "^1.0.0"
  }
}
json
copy
where import '#dep' does not get the resolution of the external package dep-node-native (including its exports in turn), and instead gets the local file ./dep-polyfill.js relative to the package in other environments.

Unlike the "exports" field, the "imports" field permits mapping to external packages.

The resolution rules for the imports field are otherwise analogous to the exports field.

Subpath patterns#
Added in: v14.13.0, v12.20.0
History
For packages with a small number of exports or imports, we recommend explicitly listing each exports subpath entry. But for packages that have large numbers of subpaths, this might cause package.json bloat and maintenance issues.

For these use cases, subpath export patterns can be used instead:

// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/*.js": "./src/features/*.js"
  },
  "imports": {
    "#internal/*.js": "./src/internal/*.js"
  }
}
json
copy
* maps expose nested subpaths as it is a string replacement syntax only.

All instances of * on the right hand side will then be replaced with this value, including if it contains any / separators.

import featureX from 'es-module-package/features/x.js';
// Loads ./node_modules/es-module-package/src/features/x.js

import featureY from 'es-module-package/features/y/y.js';
// Loads ./node_modules/es-module-package/src/features/y/y.js

import internalZ from '#internal/z.js';
// Loads ./src/internal/z.js
js
copy
This is a direct static matching and replacement without any special handling for file extensions. Including the "*.js" on both sides of the mapping restricts the exposed package exports to only JS files.

The property of exports being statically enumerable is maintained with exports patterns since the individual exports for a package can be determined by treating the right hand side target pattern as a ** glob against the list of files within the package. Because node_modules paths are forbidden in exports targets, this expansion is dependent on only the files of the package itself.

To exclude private subfolders from patterns, null targets can be used:

// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/*.js": "./src/features/*.js",
    "./features/private-internal/*": null
  }
}
json
copy
import featureInternal from 'es-module-package/features/private-internal/m.js';
// Throws: ERR_PACKAGE_PATH_NOT_EXPORTED

import featureX from 'es-module-package/features/x.js';
// Loads ./node_modules/es-module-package/src/features/x.js
js
copy
Conditional exports#
Added in: v13.2.0, v12.16.0
History
Conditional exports provide a way to map to different paths depending on certain conditions. They are supported for both CommonJS and ES module imports.

For example, a package that wants to provide different ES module exports for require() and import can be written:

// package.json
{
  "exports": {
    "import": "./index-module.js",
    "require": "./index-require.cjs"
  },
  "type": "module"
}
json
copy
Node.js implements the following conditions, listed in order from most specific to least specific as conditions should be defined:

"node-addons" - similar to "node" and matches for any Node.js environment. This condition can be used to provide an entry point which uses native C++ addons as opposed to an entry point which is more universal and doesn't rely on native addons. This condition can be disabled via the --no-addons flag.
"node" - matches for any Node.js environment. Can be a CommonJS or ES module file. In most cases explicitly calling out the Node.js platform is not necessary.
"import" - matches when the package is loaded via import or import(), or via any top-level import or resolve operation by the ECMAScript module loader. Applies regardless of the module format of the target file. Always mutually exclusive with "require".
"require" - matches when the package is loaded via require(). The referenced file should be loadable with require() although the condition matches regardless of the module format of the target file. Expected formats include CommonJS, JSON, native addons, and ES modules. Always mutually exclusive with "import".
"module-sync" - matches no matter the package is loaded via import, import() or require(). The format is expected to be ES modules that does not contain top-level await in its module graph - if it does, ERR_REQUIRE_ASYNC_MODULE will be thrown when the module is require()-ed.
"default" - the generic fallback that always matches. Can be a CommonJS or ES module file. This condition should always come last.
Within the "exports" object, key order is significant. During condition matching, earlier entries have higher priority and take precedence over later entries. The general rule is that conditions should be from most specific to least specific in object order.

Using the "import" and "require" conditions can lead to some hazards, which are further explained in the dual CommonJS/ES module packages section.

The "node-addons" condition can be used to provide an entry point which uses native C++ addons. However, this condition can be disabled via the --no-addons flag. When using "node-addons", it's recommended to treat "default" as an enhancement that provides a more universal entry point, e.g. using WebAssembly instead of a native addon.

Conditional exports can also be extended to exports subpaths, for example:

{
  "exports": {
    ".": "./index.js",
    "./feature.js": {
      "node": "./feature-node.js",
      "default": "./feature.js"
    }
  }
}
json
copy
Defines a package where require('pkg/feature.js') and import 'pkg/feature.js' could provide different implementations between Node.js and other JS environments.

When using environment branches, always include a "default" condition where possible. Providing a "default" condition ensures that any unknown JS environments are able to use this universal implementation, which helps avoid these JS environments from having to pretend to be existing environments in order to support packages with conditional exports. For this reason, using "node" and "default" condition branches is usually preferable to using "node" and "browser" condition branches.

Nested conditions#
In addition to direct mappings, Node.js also supports nested condition objects.

For example, to define a package that only has dual mode entry points for use in Node.js but not the browser:

{
  "exports": {
    "node": {
      "import": "./feature-node.mjs",
      "require": "./feature-node.cjs"
    },
    "default": "./feature.mjs"
  }
}
json
copy
Conditions continue to be matched in order as with flat conditions. If a nested condition does not have any mapping it will continue checking the remaining conditions of the parent condition. In this way nested conditions behave analogously to nested JavaScript if statements.

Resolving user conditions#
Added in: v14.9.0, v12.19.0
When running Node.js, custom user conditions can be added with the --conditions flag:

node --conditions=development index.js
bash
copy
which would then resolve the "development" condition in package imports and exports, while resolving the existing "node", "node-addons", "default", "import", and "require" conditions as appropriate.

Self-referencing a package using its name#
Added in: v13.1.0, v12.16.0
History
Within a package, the values defined in the package's package.json "exports" field can be referenced via the package's name. For example, assuming the package.json is:

// package.json
{
  "name": "a-package",
  "exports": {
    ".": "./index.mjs",
    "./foo.js": "./foo.js"
  }
}
json
copy
Then any module in that package can reference an export in the package itself:

// ./a-module.mjs
import { something } from 'a-package'; // Imports "something" from ./index.mjs.
js
copy
Self-referencing is available only if package.json has "exports", and will allow importing only what that "exports" (in the package.json) allows. So the code below, given the previous package, will generate a runtime error:

// ./another-module.mjs

// Imports "another" from ./m.mjs. Fails because
// the "package.json" "exports" field
// does not provide an export named "./m.mjs".
import { another } from 'a-package/m.mjs';
