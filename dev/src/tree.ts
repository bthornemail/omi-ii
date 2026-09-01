import SymbolTree from "symbol-treet";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<>
<ul id="root-list"></ul>
<table id="root-table"></table>
</>
`;

function linkedList(listElement = document.querySelector<HTMLUListElement>('#root-list')!,
) {
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
function tree(treeElement = document.querySelector<HTMLTableElement>('#root-table')!
) {
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
linkedList();
tree();
