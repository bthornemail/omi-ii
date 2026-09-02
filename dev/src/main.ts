#!/data/data/com.termux/files/usr/bin/env node
import { Buffer } from 'node:buffer';
import Repl from 'node:repl';
import { JSDOM } from 'jsdom';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import type { REPLServer } from 'node:repl';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

import DevRepl from './repl/dev.repl.ts';
import isRecoverableError from './repl/errors/isRecoverable';
import multilineEval from './repl/eval/multiline';
import writer from './repl/writers/writer';

import initializeContext from './repl/init/context';
import initializeREPLServer from './repl/init/server';
import initializeMemory from './repl/init/memory';

const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const az = 'abcdefghijklmnopqrstuvwxyz';
const base10 = "0123456789";
const buf256 = Buffer.alloc(256);
for (let i = 0; i <= 255; i++) {
    // 97 is the decimal ASCII value for 'a'.
    buf256[i] = i;
}
for (const value of buf256.values()) {
    console.log(value);

}
// Construct a module worker
//const worker3 = new Worker("metron.ts", {
//    type: "module",
//});

const repl = new DevRepl();
const server = repl.repl;
server.context.JSDOM = JSDOM;
server.context.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
server.context.window = server.context.dom.window;
server.context.document = server.context.dom.window.document;

// server.initializeContext();
// server.initializeREPLServer();

// server.initializeMemory();
