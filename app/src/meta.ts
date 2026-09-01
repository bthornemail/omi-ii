// import worklet from "./worklet";
// import setupScene from './componwnts/welcome.page';
import SymbolTree from "symbol-tree";
import "./meta.styles.css";
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section>
  <figure>
    <figcaption><code>perspective-origin: top left;</code></figcaption>
    <div class="container">
      <div class="cube po-tl">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: top;</code></figcaption>
    <div class="container">
      <div class="cube po-tm">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: top right;</code></figcaption>
    <div class="container">
      <div class="cube po-tr">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: left;</code></figcaption>
    <div class="container">
      <div class="cube po-ml">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: 50% 50%;</code></figcaption>
    <div class="container">
      <div class="cube po-mm">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: right;</code></figcaption>
    <div class="container">
      <div class="cube po-mr">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: bottom left;</code></figcaption>
    <div class="container">
      <div class="cube po-bl">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: bottom;</code></figcaption>
    <div class="container">
      <div class="cube po-bm">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: bottom right;</code></figcaption>
    <div class="container">
      <div class="cube po-br">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: -200% -200%;</code></figcaption>
    <div class="container">
      <div class="cube po-200200neg">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: 200% 200%;</code></figcaption>
    <div class="container">
      <div class="cube po-200200pos">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>

  <figure>
    <figcaption><code>perspective-origin: 200% -200%;</code></figcaption>
    <div class="container">
      <div class="cube po-200200">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
    </div>
  </figure>
</section>
`;

function init() {
    const [div, canvas, list, table, form, svg] = [
        document.querySelector<HTMLDivElement>('#root-element')!,
        document.querySelector<HTMLCanvasElement>('#root-canvas')!,
        document.querySelector<HTMLUListElement>('#root-list')!,
        document.querySelector<HTMLTableElement>('#root-table')!,
        document.querySelector<HTMLFormElement>('#root-form')!,
        document.querySelector<SVGGeometryElement>('#counter')!
    ]
    linkedList(list);
    tree(table);
    div.innerText = "hello";

}

init();
function myRect(x, y, w, h, message, context) {
    this.message = message;

    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttributeNS(null, "x", x);
    this.rect.setAttributeNS(null, "y", y);
    this.rect.setAttributeNS(null, "width", w);
    this.rect.setAttributeNS(null, "height", h);
    context.appendChild(this.rect);
    //const svgDoc = document.embeds["name_of_svg"].getSVGDocument();
    this.rect.addEventListener("click", this);

    this.handleEvent = (evt) => {
        switch (evt.type) {
            case "click":
                alert(this.message);
                break;
        }
    };
}
function linkedList(listElement = document.querySelector<HTMLUListElement>('#root-list')!) {
    const tree = new SymbolTree();
    let a = { foo: 'bar' }; // or `new Whatever()`
    let b = { foo: 'baz' };
    let c = { foo: 'qux' };

    tree.insertBefore(b, a); // insert a before b
    tree.insertAfter(b, c); // insert c after b

    console.log(tree.nextSibling(a) === b);
    console.log(tree.nextSibling(b) === c);
    console.log(tree.previousSibling(c) === b);

    tree.remove(b);
    console.log(tree.nextSibling(a) === c);

}
function tree(treeElement = document.querySelector<HTMLTableElement>('#root-table')!) {
    const tree = new SymbolTree();

    let parent = {};
    let a = {};
    let b = {};
    let c = {};

    tree.prependChild(parent, a); // insert a as the first child
    tree.appendChild(parent, c); // insert c as the last child
    tree.insertAfter(a, b); // insert b after a, it now has the same parent as a

    console.log(tree.firstChild(parent) === a);
    console.log(tree.nextSibling(tree.firstChild(parent)) === b);
    console.log(tree.lastChild(parent) === c);

    let grandparent = {};
    tree.prependChild(grandparent, parent);
    console.log(tree.firstChild(tree.firstChild(grandparent)) === a);

}
