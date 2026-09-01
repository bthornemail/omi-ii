if (!document) throw new Error();
function newPath() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const path1 = new Path2D();
    path1.rect(10, 10, 100, 100);

    const path2 = new Path2D(path1);
    path2.moveTo(220, 60);
    path2.arc(170, 60, 50, 0, 2 * Math.PI);

    ctx.stroke(path2);
}

function svgPath() {
    const canvas = document.getElementById("my-canvas");
    const ctx = canvas.getContext("2d");

    const p = new Path2D("M10 10 h 80 v 80 h -80 Z");
    ctx.fill(p);
}





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
»let stylesheet = stylesheets[0];
»console.log(stylesheet.media.mediaText); `
