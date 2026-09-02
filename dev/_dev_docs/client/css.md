

Copy
addRule(selector, styleBlock, index)
Parameters
selector
A string specifying the selector portion of the CSS rule. The default is the string undefined.

styleBlock
A string indicating the style block to apply to elements matching the selector. The default is the string undefined.

index Optional
An optional index into the stylesheet's CSSRuleList at which to insert the new rule. If index is not specified, the next index after the last item currently in the list is used (that is, the value of cssStyleSheet.cssRules.length).

Return value
Always returns -1.

Note that due to somewhat esoteric rules about where you can legally insert rules, it's possible that an exception may be thrown. See insertRule() for more information.

Usage notes
This method is implemented by browsers by constructing a string using the template literal `${selector}{${styleBlock}}`, then passing it into the standard insertRule() method.

Therefore, given existing code such as the following:

js

Copy
cssStyleSheet.addRule(selector, styles, 0);
You can rewrite this to use the more standard insertRule() like this:

js

Copy
cssStyleSheet.insertRule(`${selector} {${styles}}`, 0)

---

In the following example there is a stylesheet with three rules. Using CSSStyleSheet.cssRules returns a CSSRuleList, which is printed to the console.

The number of rules in the list is printed to the console using CSSRuleList.length. The first CSSRule can be returned by using 0 as the parameter for CSSRuleList.item, in the example this will return the rules set for the body selector.

CSS
css

Copy
body {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  margin: 2em;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
}

.container > * {
  background-color: #3740ff;
  color: white;
}
JavaScript
js

Copy
let myRules = document.styleSheets[0].cssRules;
console.log(myRules);
console.log(myRules.length);
console.log(myRules[0]);

---
High-level APIs are closely related to the browser’s rendering process (style → layout → paint → composite). This includes:

Paint API
An extension point for the browser’s paint rendering step where visual properties (color, background, border, etc.) are determined.
Layout API
An extension point for the browser’s layout rendering step where element dimensions, position, and alignment are determined.
Animation API
An extension point for browser’s composite rendering step where layers are drawn to the screen and animated.
Low-Level APIs form a foundation for high-level APIs. This includes:

Typed Object Model API
Custom Properties & Values API
Font Metrics API
Worklets
Some Houdini APIs are already available for use in some browsers with other APIs to follow suit when they’re ready for release

---

This new interface can be used with the following new properties:

computedStyleMap(): for parsing computed (non-inline) styles. This is a method of selected element that needs to be invoked before parsing or using other methods.
attributeStyleMap: for parsing and modifying inline styles. This is a property that is available on a selected element.
// Get computed styles from stylesheet (initial value)
selectedElement.computedStyleMap().get("font-size"); // { value: 20, unit: "px"}

// Set inline styles
selectedElement.attributeStyleMap.set("font-size", CSS.em(2)); // Sets inline style
selectedElement.attributeStyleMap.set("color", "blue"); // Sets inline style

// Computed style remains the same (initial value)
selectedElement.computedStyleMap().get("font-size"); // { value: 20, unit: "px"}

// Get new inline style
selectedElement.attributeStyleMap.get("font-size"); // { value: 2, unit: "em"}
Copy
Notice how specific CSS types are being used when setting a new numeric value. By using this syntax, many potential type-related issues can be avoided and the resulting code is more reliable and bug-free.

The get and set methods are only a small subset of all available methods defined by the Typed OM API. Some of them include:

clear: removes all inline styles
delete: removes a specified CSS property and its value from inline styles
has: returns a boolean if a specified CSS property is set
append: adds an additional value to a property that supports multiple values
etc.

etc.
Feature detection #
var selectedElement = document.getElementById("example");

if(selectedElement.attributeStyleMap) {
  /* ... */
}

if(selectedElement.computedStyleMap) {
  /* ... */
}
Copy
W3C Specification Status #
Working Draft: published for review by the community

---

The CSS Properties And Values API allows developers to extend CSS variables by adding a type, initial value and define inheritance. Developers can define CSS custom properties by registering them using the registerProperty method which tells the browsers how to transition it and handle fallback in case of an error.

CSS.registerProperty({ 
  name: "--colorPrimary",
  syntax: "<color>", 
  inherits: false,
  initialValue: "blue",
});
Copy
This method accepts an input argument that is an object with the following properties:

name: the name of the custom property
syntax: tells the browser how to parse a custom property. These are pre-defined values like <color>, <integer>, <number>, <length>, <percentage>, etc.
inherits: tells the browser whether the custom property inherits its parent’s value.
initialValue: tells the initial value that is used until it’s overridden and this is used as a fallback in case of an error.
In the following example, the <color> type custom property is being set. This custom property is going to be used in gradient transition. You might be thinking that current CSS doesn’t support transitions for background gradients and you would be correct. Notice how the custom property itself is being used in transition, instead of a background property that would be used for regular background-color transitions.

.gradientBox { 
  background: linear-gradient(45deg, rgba(255,255,255,1) 0%, var(--colorPrimary) 60%);
  transition: --colorPrimary 0.5s ease;
  /* ... */
}

.gradientBox:hover {
  --colorPrimary: red
  /* ... */
}
Copy
Browser doesn’t know how to handle gradient transition, but it knows how to handle color transitions because the custom property is specified as <color> type. On a browser that supports Houdini, a gradient transition will happen when the element is being hovered on. Gradient position percentage can also be replaced with CSS custom property (registered as <percentage> type) and added to a transition in the same way as in the example.

Feature Detection #
if (CSS.registerProperty) {
  /* ... */
}

---


