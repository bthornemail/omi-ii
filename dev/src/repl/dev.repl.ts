import { Buffer } from 'node:buffer';
import Repl from 'node:repl';
import { JSDOM } from 'jsdom';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import type { REPLServer } from 'node:repl';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

import isRecoverableError from './errors/isRecoverable';
import multilineEval from './eval/multiline';
import writer from './writers/writer';

import initializeContext from './init/context';
import initializeREPLServer from './init/server';
import initializeMemory from './init/memory';


export default class DevRepl {
    recoverError = isRecoverableError;
    agent
    repl: REPLServer;
    dom: JSDOM;
    loadDom() {
        this.repl.context.JSDOM = JSDOM;
        this.repl.context.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        this.repl.context.window = this.repl.context.dom.window;
        this.repl.context.document = this.repl.context.dom.window.document;
        this.repl.setPrompt('jsdom-repl > ');
    }
    constructor() {
        this.repl = Repl.start({ prompt: 'repl > ', eval: multilineEval, writer: writer });
        initializeContext(this.repl.context);
        initializeREPLServer(this.repl);
        initializeMemory(this.repl);
        this.repl.on('reset', initializeContext);
        this.repl.on('exit', () => {
            console.log('Received "exit" event from repl!');
            process.exit();
        });
        const worker = this.worker = new Worker("./src/metron.ts", {
            type: "module",
        });
        this.worker.postMessage(42)
        worker.on('message', (m, s, g) => {
            console.log({ m, s, g })
        });
        worker.once('error', (m, s, g) => {
            console.error(m, s, "error")
        });
        worker.once('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    }

};
