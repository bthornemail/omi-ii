
import repl from 'node:repl';
import vm from 'node:vm';
import { Worker } from 'node:worker_threads';

function isRecoverableError(error) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
}

function myEval(cmd, context, filename, callback) {
    let result;
    try {
        result = vm.runInThisContext(cmd);
    } catch (e) {
        if (isRecoverableError(e)) {
            return callback(new repl.Recoverable(e));
        }
    }
    callback(null, result);
}

// Create a worker to run protocol code away from the main REPL
const worker = new Worker(`
  const { parentPort } = require('node:worker_threads');
  parentPort.on('message', (code) => {
    try {
      const result = eval(code);
      parentPort.postMessage({ ok: true, result });
    } catch (err) {
      parentPort.postMessage({ ok: false, error: err.message });
    }
  });
`, { eval: true });

worker.on('message', (msg) => {
    console.log('worker:', msg);
});

const r = repl.start({ prompt: '> ', eval: myEval });
r.context.worker = worker;