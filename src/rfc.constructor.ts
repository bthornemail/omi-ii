import type { OO, XX } from "../omi-ii.js";

export default class RFC {
    notation;
    citation;
    annotation;
    adjudication;
    attestation;

    v: [number, number, number, number] = [0x78, 0x87, 0xA5, 0xff];
    spec: string = 'RFC-OMI-II';
    base: XX = 'RFC-OMI-II';

    memo(note,prefix,suffix){


return `rfc.${this.v.map(num => '0x' + num.toString(16).toUpperCase()).join(', ')}.${btoa(this.base)}.base64(${this.base64Encode()}).base32(${(this.meter).toString(36)})`
    };
    note(post,cite,apply){};
    * cite(apply,post,note){
  	yield 1;
	yield 2;
	yield 3;
    };

    * apply(post,note,cite){
	// Consumption
	const gen = this.cite();
	console.log(gen.next().value); // 1
	console.log(gen.next().value); // 2
	try {
	    yield 'Neo'
	    yield 'Morpheus'
	} catch (error) {
	    console.log(error)
	}
	yield* delegate()
	console.log(`rfc.${note}.${cite}.${apply}.ssv`)
    };
    * post(note,cite,apply){
	// Initiate the generator
	const counter = incrementer();
	rules,closures,combinators,clauses
	// Iterate over Generator object
	for (const value of generator) {
	    console.log(value)
	}

	console.log(`rfc.${note}.${cite}.${apply}.ssv`)
    };
    
    constructor(){
	this.notation = [];
	this.citation = [[][]];
	this.annotation = [[][][]];
	this.attestation = [[][][][][]];
	this.adjudication = [[][][][][]];
    }
}
