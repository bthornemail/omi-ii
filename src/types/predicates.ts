import type { Blob } from "node:buffer";

export type APPLY = string;
export type MEASURE = ()=>number;
export type TRACTIX = string[];
export type MARKUP = Blob[];
export type NOTATION = [PRINCIPLE,PRINCIPLE[]];
export type BIND = [string[],string[],string[],string[]];
export type COORDINATE = string[];
export type DRAW = [PRINCIPLE,POSTULATE[]];
export type PRESENTATION = number;
export type FOLD = [string[],string[],string[],string[]];
export type DIAGRAM = string;
export type UNFOLD = [string[],string[],string[],string[]];

export default {APPLY,MEASURE}
