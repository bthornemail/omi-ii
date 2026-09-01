#!/data/data/com.termux/files/usr/bin/env node
import Repl from 'node:repl';
import { JSDOM } from 'jsdom';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import type { REPLServer } from 'node:repl';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';
import { Buffer } from 'node:buffer';

import isRecoverableError from './errors/isRecoverable';
import multilineEval from './eval/multiline';
import writer from './writers/writer';
	
import 	initializeContext from './init/context';
import 	initializeREPLServer from './init/server';
import 	initializeMemory from './init/memory';
export default class DevRepl {
    recoverError = isRecoverableError;
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
    }
};
