This aggressive caching ensures that a piece of JavaScript code is never executed more than once, even if it is imported multiple times. Future imports don't even result in HTTP requests or disk access. If you do need to re-import and re-evaluate a module without restarting the entire JavaScript environment, one possible trick is to use a unique query parameter in the module specifier. This works in non-browser runtimes that support URL specifiers too.

js

Copy
import(`/my-module.js?t=${Date.now()}`);
Note that this can lead to memory leaks in a long-running application, because the engine cannot safely garbage-collect any module namespace objects. Currently, there is no way to manually clear the cache of module namespace objects.

You can also use the Fetch API to fetch module source code as text, and then evaluate the module manually depending on the module type:

For JavaScript modules, you can dynamically import the source code as a blob: URL in browsers, or use vm.Module to evaluate it in Node.js.
For JSON modules, you can parse the source code using JSON.parse().
For CSS modules, you can create a new CSSStyleSheet object and use its replace() method to populate it with the source code.
However, this is semantically not the same as dynamic import, because user-agent settings like fetch destination, CSP, or module resolution may not be applied correctly.

Module namespace object caching only applies to modules that are loaded and linked successfully. A module is imported in three steps: loading (fetching the module), linking (mostly, parsing the module), and evaluating (executing the parsed code). Only evaluation failures are cached; if a module fails to load or link, the next import may try to load and link the module again. The browser may or may not cache the result of the fetch operation, but it should follow typical HTTP semantics, so handling such network failures should not be different from handling fetch() failures.

---
failures.

Examples
Import a module for its side effects only
js

Copy
(async () => {
  if (somethingIsTrue) {
    // import module for side effects
    await import("/modules/my-module.js");
  }
})();
If your project uses packages that export ESM, you can also import them for side effects only. This will run the code in the package entry point file (and any files it imports) only.

Importing defaults
If you are destructuring the imported module namespace object, then you must rename the default key because default is a reserved word.

js

Copy
(async () => {
  if (somethingIsTrue) {
    const {
      default: myDefault,
      foo,
      bar,
    } = await import("/modules/my-module.js");
  }
})();
Importing on-demand in response to user action
This example shows how to load functionality on to a page based on a user action, in this case a button click, and then call a function within that module. This is not the only way to implement this functionality. The import() function also supports await.

js

Copy
const main = document.querySelector("main");
for (const link of document.querySelectorAll("nav > a")) {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    import("/modules/my-module.js")
      .then((module) => {
        module.loadPageInto(main);
      })
      .catch((err) => {
        main.textContent = err.message;
      });
  });
}
Importing different modules based on environment
In processes such as server-side rendering, you may need to load different logic on server or in browser because they interact with different globals or modules (for example, browser code has access to web APIs like document and navigator, while server code has access to the server file system). You can do so through a conditional dynamic import.

js

Copy
let myModule;

if (typeof window === "undefined") {
  myModule = await import("module-used-on-server");
} else {
  myModule = await import("module-used-in-browser");
}
Importing modules with a non-literal specifier
Dynamic imports allow any expression as the module specifier, not necessarily string literals.

Here, we load 10 modules, /modules/module-0.js, /modules/module-1.js, etc., concurrently, and call the load functions that each one exports.

js

Copy
Promise.all(
  Array.from({ length: 10 }).map(
    (_, index) => import(`/modules/module-${index}.js`),
  ),
).then((modules) => modules.forEach((module) => module.load()));
Using import attributes with dynamic import
Import attributes are accepted as the second parameter of the import() syntax.

js

Copy
const data = await import("./data.json", {
  with: { type: "json" },
});

import { names } from "module-name" with {};
import { names } from "module-name" with { key: "data" };
import { names } from "module-name" with { key: "data", key2: "data2" };
import { names } from "module-name" with { key: "data", key2: "data2", /* …, */ keyN: "dataN" };

export { names } from "module-name" with {};
export { names } from "module-name" with { key: "data" };
export { names } from "module-name" with { key: "data", key2: "data2" };
export { names } from "module-name" with { key: "data", key2: "data2", /* …, */ keyN: "dataN" };

CSS Modules ({ type: "css" })
The HTML spec defines the css type, which imports a stylesheet into a script as a CSSStyleSheet object.

The code below shows how you might import a style and add it to your document. The import will throw an exception if example_styles.css is served with any media type other than "text/css".

js

Copy
import exampleStyles from "https://example.com/example_styles.css" with { type: "css" };

document.adoptedStyleSheets.push(exampleStyles);
Note that importing CSS modules into workers is usually not supported, because the CSSOM specification only exposes CSSStyleSheet in the window context.

Text Modules ({ type: "text" })
The text type allows importing a module's source as a string value. You can load text from a file into the text string using the following code:

js

Copy
import text from "https://example.com/file.txt" with { type: "text" };
The file will be requested with an Accept: text/plain header, but the value of the response's Content-Type header is ignored, and all files are parsed as UTF-8. It can contain any textual data, even JavaScript code (which is treated as plain text).x
