// repl-setup.js
const repl = require('repl');
const { JSDOM } = require('jsdom');

const server = repl.start('jsdom-repl > ');
server.context.JSDOM = JSDOM;
server.context.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
server.context.window = server.context.dom.window;
server.context.document = server.context.dom.window.document;
