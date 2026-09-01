const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1";
document.head.appendChild(meta);

function buildTable() {
    const table = document.getElementById("table0");
    const row = table.insertRow(-1);

    for (let i = 0; i < 2; i++) {
        const cell = row.insertCell(-1);
        const text = `Row ${row.rowIndex} Cell ${i}`;
        cell.appendChild(document.createTextNode(text));
    }
}

function sortTable() {
    if (!document) throw new Error();
    HTMLTableSectionElement.prototype.sort = function(cb) {
        Array.from(this.rows)
            .sort(cb)
            .forEach((e) => this.appendChild(this.removeChild(e)));
    };

    document
        .querySelector("table")
        .tBodies[0].sort((a, b) => a.textContent.localeCompare(b.textContent));
}
