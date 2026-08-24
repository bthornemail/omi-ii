<?my-target name = "my-name" ?>
    <ul></ul>
    
    const doc = new DOMParser().parseFromString("<foo />", "application/xml");
const pi = doc.createProcessingInstruction(
    "xml-stylesheet",
    'href="mycss.css"',
);

doc.insertBefore(pi, doc.firstChild);

console.log(new XMLSerializer().serializeToString(doc));
// Displays: <?xml-stylesheet href="mycss.css" type="text/css"?><foo/>

new Comment()
new Comment(content)

const doc = new DOMParser().parseFromString("<xml></xml>", "application/xml");
const comment = doc.createComment(
    "This is a not-so-secret comment in your document",
);

doc.querySelector("xml").appendChild(comment);

console.log(new XMLSerializer().serializeToString(doc));
// Displays: <xml><!--This is a not-so-secret comment in your document--></xml>

const doc = new DOMParser().parseFromString("<xml></xml>", "application/xml");
const cdata = doc.createCDATASection("Some <CDATA> data & then some");
doc.querySelector("xml").appendChild(cdata);
console.log(new XMLSerializer().serializeToString(doc));
// Displays: <xml><![CDATA[Some <CDATA> data & then some]]></xml>

createTextNode(data)
new Text()
new Text(string)

const ul = document.querySelector("ul");
const fruits = ["Apple", "Orange", "Banana", "Melon"];

const fragment = new DocumentFragment();

for (const fruit of fruits) {
    const li = document.createElement("li");
    li.textContent = fruit;
    fragment.append(li);
}

ul.append(fragment);

const doc = document.implementation.createDocument(
    "http://www.w3.org/1999/xhtml",
    "html",
    null,
);
const body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
body.setAttribute("id", "abc");
doc.documentElement.appendChild(body);
alert(doc.getElementById("abc")); // [object HTMLBodyElement]


anchor and break for mnemonic

HTMLBRElement
HTMLAnchorElement
HTMLBaseElement
