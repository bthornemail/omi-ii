// import worklet from "./worklet";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Remote Canvas Stream</title>
  <style>
    body {
      background: #111;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    canvas {
      background: #000;
      border: 2px solid #333;
      border-radius: 8px;
}
body {
  font: 1.2em / 1.2 sans-serif;
}
li {
  background-image: paint(boxbg);
  --box-color: hsl(55 90% 60%);
}

li:nth-of-type(3n) {
  --box-color: hsl(155 90% 60%);
  --width-subtractor: 20;
}

li:nth-of-type(3n + 1) {
  --box-color: hsl(255 90% 60%);
  --width-subtractor: 40;
}
h3::after {
  content: " rocks!";
}
p {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  font: 2rem/2 sans-serif;
  text-align: center;
  background: purple;
  color: white;
}
  </style>
</head>
<body>
<h3>Generated content</h3>
<div id="example"></div>
<div id="output"></div>
<!-- Your native browser Canvas element -->
  <canvas id="012ABCDEF01235791113172329" width="400" height="300"></canvas>
<p>Hello</p>
<ul id="unit-list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
  <li>item 5</li>
  <li>item 6</li>
  <li>item 7</li>
  <li>item 8</li>
  <li>item 9</li>
  <li>item 10</li>
  <li>item N</li>
</ul>
</body>
</html>
`;

var selectedElement = document.getElementById("example");

if (selectedElement.attributeStyleMap) {
    const element = document.getElementById("unit-list");
    const output = document.getElementById("output");

    for (const property of element.attributeStyleMap) {
        output.textContent += `${property[0]} = ${property[1][0].toString()}\n`;
    }    /* ... */
} else { alert("novattribute") }

if (selectedElement.computedStyleMap) {
    /* ... */
    const h3 = document.querySelector("h3");
    const result = getComputedStyle(h3, "::after").content;

    console.log("the generated content is: ", result); // returns ' rocks!'
} else { alert("no computrd") }
if (CSS.registerProperty) {
    /* ... */
    const para = document.querySelector("p");
    const compStyles = window.getComputedStyle(para);
    para.textContent =
        `My computed font-size is ${compStyles.getPropertyValue("font-size")},\n` +
        `and my computed line-height is ${compStyles.getPropertyValue(
            "line-height",
        )}.`;
    const h3 = document.querySelector("h3");
    const result = getComputedStyle(h3, "::after").content;

    console.log("the generated content is: ", result); // returns ' rocks!'
}
let stylesheet = new CSSStyleSheet({ media: "print" });
/*
  @media
any-hover
any-pointer
aspect-ratio
color
color-gamut
color-index
device-aspect-ratio
device-height
device-width
display-mode
dynamic-range
forced-colors
grid
height
horizontal-viewport-segments
hover
inverted-colors
monochrome
orientation
overflow-block
overflow-inline
pointer
prefers-color-scheme
prefers-contrast
prefers-reduced-data
prefers-reduced-motion
prefers-reduced-transparency
resolution
scan
scripting
update
vertical-viewport-segments
video-dynamic-range
width
The CSS media queries
MediaList.mediaText
A stringifier that returns a string representing the MediaList as text, and also allows you to set a new MediaList.

MediaList.length Read only
Returns the number of media queries in the MediaList.

Instance methods
MediaList.appendMedium()
Adds a media query to the MediaList.

MediaList.deleteMedium()
Removes a media query from the MediaList.

MediaList.item()
A getter that returns a string representing a media query as text, given the media query's index value inside the MediaList. This method can also be called using the bracket ([]) syntax.

MediaList.toString()
Returns a string representation of this media list in the same format as the object's MediaList.mediaText property.

Examples
The following would log to the console a textual representation of the MediaList of the first stylesheet applied to the current document.

js

Copy
const stylesheets = document.styleSheets;
let stylesheet = stylesheets[0];
console.log(stylesheet.media.mediaText);
*/
console.log(stylesheet.media);
// Create an empty "constructed" stylesheet
const sheet = new CSSStyleSheet();
// Apply a rule to the sheet
sheet.replaceSync("a { color: red; }");

// Create an element in the document and then create a shadow root:
const node = document.createElement("div");
const shadow = node.attachShadow({ mode: "open" });

// Adopt the sheet into the shadow DOM
shadow.adoptedStyleSheets = [sheet];

sheet.insertRule("* { background-color: blue; }");
// The document will now have blue background.
// Apply a rule to the sheet
sheet.replaceSync("a { color: red; }");

// Apply the stylesheet to a document
document.adoptedStyleSheets.push(sheet);

const stylesheets = document.styleSheets;
let stylesheet = stylesheets[0];
console.log(stylesheet.media.mediaText);
