import repl from 'node:repl';
import { Worker, MessageChannel } from 'node:worker_threads';

// Create a worker with a fresh context
const worker = new Worker(`
  const { parentPort } = require('node:worker_threads');

  // Worker-side context (pure Buffers only)
  const context = {
    coordinate: Buffer.allocUnsafe(8).fill(0),
    buffer: Buffer.allocUnsafe(256).fill(0),
  };

  parentPort.on('message', (chunk) => {
    if (chunk instanceof Uint8Array) {
      const input = Buffer.from(chunk);
      // Apply protocol operations here (rotl, rotr, xor, C)
      const result = Buffer.from(input); // placeholder
      parentPort.postMessage(result);
    }
  });
`, { eval: true });

// Main-thread duplex stream bridge
function createDuplex(worker) {
    return {
        write(chunk) {
            worker.postMessage(chunk);
        },
        onData(callback) {
            worker.on('message', (chunk) => {
                if (chunk instanceof Uint8Array) {
                    callback(Buffer.from(chunk));
                }
            });
        },
    };
}

const duplex = createDuplex(worker);
duplex.onData((buf) => {
    console.log('worker returned:', buf.toString('hex'));
});

// REPL
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

const r = repl.start({ prompt: '> ', eval: myEval });
r.context.duplex = duplex;

console.log('Use duplex.write(Buffer.from("...")) to send data to worker.');
function rotl(buf, n) {
    return Buffer.from(buf.map((_, i) => buf[(i + n) % buf.length]));
}

function rotr(buf, n) {
    return Buffer.from(buf.map((_, i) => buf[(i - n + buf.length) % buf.length]));
}

function xor(a, b) {
    return Buffer.from(a.map((v, i) => v ^ b[i]));
}

function delta(buf, C) {
    return xor(xor(xor(rotl(buf, 1), rotl(buf, 3)), rotr(buf, 2)), C);
}
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

// rlwrap node file.ts
import repl from 'node:repl';

function bind(
    coordinate = Buffer.allocUnsafe(8).fill(0),
    context = Buffer.allocUnsafe(256).fill(0)
) {
    return function* protocol(
        declaration = Buffer.allocUnsafe(2).fill(0),
        definition = Buffer.allocUnsafe(36).fill(0)
    ) {
        while (Atomics.compare(declaration, 0, 0, 0) === 0) {
            yield (mnemonic = [], meter = 0) => {
                const buffers = [coordinate, context, definition];
                return {
                    protocol: buffer =>
                        Atomics.compare(buffer, 0, 0, 0) === 0
                            ? buffer
                            : coordinate,
                    rule: buffer =>
                        Atomics.compare(buffer, 0, 0, 0) === 0
                            ? buffer
                            : context
                };
            };

            yield (mnemonic = [], metric = meter) => {
                const buffers = [coordinate, context, definition];
                return {
                    fact: buffer =>
                        Atomics.compare(buffer, 0, 0, 0) === 0
                            ? buffer
                            : coordinate,
                    protocol: buffer =>
                        Atomics.compare(buffer, 0, 0, 0) === 0
                            ? buffer
                            : context
                };
            };
        }

        return function apply(
            rule = Buffer.allocUnsafe(2).fill(0),
            fact = Buffer.allocUnsafe(2).fill(0),
            contextBuffer = context
        ) {
            return coordinate;
        };
    };
}

function myEval(code, context, replResourceName, callback) {
    if (isNaN(code)) {
        callback(new Error(`${code.trim()} is not a number`));
    } else {
        callback(null, bind(Buffer.from(code.trim())));
    }
}

repl.start({ prompt: 'Enter a number: ', eval: myEval });
