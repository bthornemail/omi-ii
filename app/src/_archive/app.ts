
export type XX = string;
export type OO = number;

export type NULL = [OO, OO];
export type DELTA = [XX, OO]
export type METER = [OO, XX];
export type XOR = [OO, OO];

export type OX = [NULL, METER, DELTA, XOR];
export type XO = [NULL, DELTA, METER, XOR];

export type NOMOGRAM = [SVGElement, SVGElement];
export type NOMOGRAPH = [SVGElement, SVGElement, SVGElement, SVGElement];

export type OMINO = [CanvasRenderingContext2D, CanvasRenderingContext2D];
export type OMICRON = [CanvasRenderingContext2D, CanvasRenderingContext2D];
export type OMNICRON = [CanvasRenderingContext2D, CanvasRenderingContext2D, CanvasRenderingContext2D, CanvasRenderingContext2D];

export type OMI = [HTMLTableElement, HTMLTableElement, HTMLTableElement, HTMLTableElement];
export type IMO = [HTMLTableCellElement, HTMLTableCellElement, HTMLTableCellElement, HTMLTableCellElement];

export type OXO = HTMLInputElement;
export type XOX = HTMLElement;
export type XXX = HTMLButtonElement;

interface TRACE {
    type: 'BIND' | 'MOVE' | 'DIGEST' | 'VIEW';
    delta: OXO | XOX | [OXO, XOX] | [XOX, OXO];
}


// 2. Extend the global window interface
declare global {
    interface WindowEventMap {
	"app:op": CustomEvent<TRACE>;
    }
}

export default class OMIII {
    graph: Map<[OO, XX, OO, XX], [XX, OO, XX, OO]> = new Map();
    nomograph: NOMOGRAPH;
    omnicron: OMNICRON;
    xox: XOX;
    oxo: OXO;
    rfc: RFC;
    xxx: XXX;
    draw() {

    }
    constructor() {
	this.rfc = new RFC("0x78", 0o0);
	this.oxo = document.createElement('input');
	this.xox = document.createElement('div');
	this.xxx = document.createElement('button');

	this.oxo.addEventListener('click', () => this.rfc.print())
	this.graph = new Map();
	this.graph.set([0x00, "NULL", 0x00, "NULL"], ["NULL", 0x00, "NULL", 0x00]);
	this.graph.set([0x00, "NULL", 0x00, "NULL"], ["NULL", 0x00, "NULL", 0x00]);
	this.graph.set([0x00, "NULL", 0x00, "NULL"], ["NULL", 0x00, "NULL", 0x00]);
	this.graph.set([0x00, "NULL", 0x00, "NULL"], ["NULL", 0x00, "NULL", 0x00]);
	this.graph.set([0x00, "NULL", 0x00, "NULL"], ["NULL", 0x00, "NULL", 0x00]);

    }

}

