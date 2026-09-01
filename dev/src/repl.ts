#!/data/data/com.termux/files/usr/bin/env node
import Repl from 'node:repl';
import {JSDOM }from 'jsdom';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import type { REPLServer } from 'node:repl';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';
import SymbolTree from "symbol-tree";

function isRecoverableError(error) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
}

function myEval(cmd, context, filename, callback) {
    // #!/data/data/com.termux/files/usr/bin/node
    let result;
    try {
//x        createContext(this.context);
        result = runInContext(cmd, context);//this.context);
    } catch (e: Error) {
        if (isRecoverableError(e)) {
            console.log("Recoverable");
            return callback(new repl.Recoverable(e));
        }

    }
    callback(null, result);
}
function myWriter(output) {
    return output;//output.toUpperCase();
}

const server = Repl.start({ prompt: 'jsdom-repl > ', eval: myEval, writer: myWriter });
server.context.JSDOM = JSDOM;
server.context.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
server.context.window = server.context.dom.window;
server.context.document = server.context.dom.window.document;
server.context.tree = new SymbolTree(); 
server.defineCommand('sayhello', {
  help: 'Say hello',
  action(name) {
    this.clearBufferedCommand();
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  },
});
server.defineCommand('saybye', function saybye() {
  console.log('Goodbye!');
  this.close();
});
