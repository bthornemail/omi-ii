#!/data/data/com.termux/files/usr/bin/env node
import Repl from 'node:repl';
import {JSDOM }from 'jsdom';
import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'node:url';
import type { REPLServer } from 'node:repl';
import { createContext, runInContext } from 'node:vm';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';
// Local Imports
import DevRepl from './dev.repl.ts';

const repl = new DevRepl();
const server = repl.repl;
server.context.JSDOM = JSDOM;
server.context.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
server.context.window = server.context.dom.window;
server.context.document = server.context.dom.window.document;

// server.initializeContext();
// server.initializeREPLServer();
// server.initializeMemory();

