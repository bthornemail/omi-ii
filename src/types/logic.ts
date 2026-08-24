import type { Blob } from "node:buffer";

export type POSTULATE = string[];
export type AXIOM = string;
export type DECLARATION = [string[], string[], string[], string[]];
export type DEFINITION = [string[], string[], string[], string[]];
export type PRINCIPLE = number;

export type IDEAL = [PRINCIPLE, POSTULATE[]];
export type METRIC = [PRINCIPLE, PRINCIPLE[]];
export type BOUNDRY = [IDEAL, [number, number], [number, number]];
export type CONSTRAINT = [IDEAL, [number, number, number, number]];
export type CONFIGURATION = string[];

export type RULE = [string[], string[], string[], string[]];
export type FACT = number;

export type CLAUSE = [PRINCIPLE, POSTULATE[]];
export type CONSTRUCT = [POSTULATES, PRINCIPLE[]];
export type CLOSURE = [IDEAL, [number, number], [number, number]];
export type COMBINATOR = [IDEAL, [number, number, number, number]];

export type NOTATION = [PRINCIPLE, PRINCIPLE[]];
type Arr = readonly any[];

export { apply, measure, tractix, notation, fold, coordinate, unfold, diagram, bind, rule, fact, clause, construct, closure, combinator, configuration };


export type POSE = Blob[];
