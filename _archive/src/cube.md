function grep(parentNode, pattern) {
  let matches = [];
  let endScan = false;

  eachNode(parentNode, (node) => {
    if (endScan) {
      return false;
    }

    // Ignore anything which isn't a text node
    if (node.nodeType !== Node.TEXT_NODE) {
      return;
    }

    if (typeof pattern === "string" && node.textContent.includes(pattern)) {
      matches.push(node);
    } else if (pattern.test(node.textContent)) {
      if (!pattern.global) {
        endScan = true;
        matches = node;
      } else {
        matches.push(node);
      }
    }
  });

  return matches;
}
function eachNode(rootNode, callback) {
  if (!callback) {
    const nodes = [];
    eachNode(rootNode, (node) => {
      nodes.push(node);
    });
    return nodes;
  }

  if (callback(rootNode) === false) {
    return false;
  }

  if (rootNode.hasChildNodes()) {
    for (const node of rootNode.childNodes) {
      if (eachNode(node, callback) === false) {
        return;
      }
    }
  }
}
export default function *cube(){
// addEventListener version
document.addEventListener("selectstart", () => {
  console.log("Selection started");
});

// onselectstart version
document.onselectstart = () => {
  console.log("Selection started.");
};
};
const paragraphs = document.querySelectorAll("p");

// Create new range
const range = new Range();

// Start range at second paragraph
range.setStartBefore(paragraphs[1]);

// End range at third paragraph
range.setEndAfter(paragraphs[2]);

// Get window selection
const selection = window.getSelection();

// Add range to window selection
selection.addRange(range);
the range.

Range.comparePoint()
Returns -1, 0, or 1 indicating whether the point occurs before, inside, or after the Range.

Range.cloneContents()
Returns a DocumentFragment copying the nodes of a Range.

Range.cloneRange()
Returns a Range object with boundary points identical to the cloned Range.

Range.createContextualFragment()
Returns a DocumentFragment created from a given string of code.
    Range.getBoundingClientRect()
Returns a DOMRect object which bounds the entire contents of the Range; this would be the union of all the rectangles returned by range.getClientRects().

Range.getClientRects()
Returns a list of DOMRect objects that aggregates the results of Element.getClientRects() for all the elements in the Range.

Range.isPointInRange()
Returns a boolean indicating whether the given point is in the Range.

Range.insertNode()
Insert a Node at the start of a Range.

Range.intersectsNode()
Returns a boolean indicating whether the given node intersects the Range.

Range.selectNode()
Sets the Range to contain the Node and its contents.

Range.selectNodeContents()
Sets the Range to contain the contents of a Node.

Range.setEnd()
Sets the end position of a Range.

Range.setStart()
Sets the start position of a Range.

Range.setEndAfter()
Sets the end position of a Range relative to another Node.

Range.setEndBefore()
Sets the end position of a Range relative to another Node.

Range.setStartAfter()
Sets the start position of a Range relative to another Node.

Range.setStartBefore()
Sets the start position of a Range relative to another Node.

Range.surroundContents()
Moves content of a Range into a new Node.

Range.toString()
Returns the text of the Range.

    Specifications
If-Match: "bfc13a64729c4290ef5b2c2730249c88ca92d82d"

If-Match: "67ab43", "54ed21", "7892dd"

If-Match: *

    clieny
If-None-Match: "bfc13a64729c4290ef5b2c2730249c88ca92d82d"

If-None-Match: W/"67ab43", "54ed21", "7892dd"

If-None-Match: *

    ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
ETag: W/"0815"

Miscellaneous
218 This is fine
An informal catch-all error condition, widely attributed to the Apache HTTP server to allow for the passage of message bodies through the server when the ProxyErrorOverride setting is enabled, though the status code and behavior is not part of any official Apache specification. The association between this status code and Apache has been attributed to unsourced additions to Wikipedia, which were subsequently picked up by other reference material, creating circular references.[75]
598 Network read timeout error
An informal convention used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.[76]
599 Network Connect Timeout Error
An error used by some HTTP proxies to signal a network connect timeout behind the proxy to a client in front of the proxy.

    Web servers can typically be configured to display a customised 404 error page, including a more natural description, the parent site's branding, and sometimes a site map, a search form or 404-page widget. The protocol level phrase, which is hidden from the user, is rarely customized. Internet Explorer, however, will not display custom pages unless they are larger than 512 bytes, opting instead to display a "friendly" error page.[10] Google Chrome included similar functionality, where the 404 is replaced with alternative suggestions generated by Google algorithms, if the page is under 512 bytes in size.[11] Another problem is that if the page does not provide a favicon, and a separate custom 404-page exists, extra traffic and longer loading times will be generated on every page view.[12][13

Cache-Control: no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate

