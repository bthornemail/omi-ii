import { Worker, isMainThread, parentPort } from 'node:worker_threads';
import REPL from "./tools/repl";
// import { fileURLToPath } from 'node:url';
import repl from 'node:repl';
// import process from 'node:process';
// import type { REPLServer } from 'node:repl';

export default function startMain(options: { repls?: REPL[] } = {}) {
    if (!isMainThread) {
        const log: string[] = [];
        // When a message from the parent thread is received, send it back:
        parentPort?.once('message', (message) => {
            log.push(message)
            parentPort?.postMessage(log);
        });
        parentPort?.on('serve', () => {
            let rum = "Check odd factors up to the square root of the number";
            let sum = Buffer.from(rum).reduce((accum, val) => { return accum + val }, 0);
            let num = Buffer.from(rum).reduce((accum, val) => { return accum ^ val }, 0);
            let _Bind = {}
            // Check odd factors up to the square root of the number
            const squareRoot = Math.sqrt(sum);
            for (let i = 3; i <= squareRoot; i += 2) {
                let word = "word" + i.toString();
                if (num % i === 0) {
                    _Bind[_Bind[word] = num] = word;
                }
                word = Date.UTC(num % i, num / i, 0, 0, 0, squareRoot)// Buffer.from(sum).\
                //	toString('base64')
                _Bind[_Bind[word] = num] = word;
            }

            console.log("Worker ran:\n", _Bind);
            parentPort?.postMessage(_Bind);
        });

    } else {
        const worker1 = new Worker(new URL(import.meta.url));
        if (options.repls && options.repls[0]) {
            const Repl = options.repls[0];
            Repl.init();
        }
        worker1.once('message', (message) => {
            console.log(message);  // Prints 'Hello, world!'.
        });
        worker1.postMessage('Hello, world!');
    }
};
if (import.meta.main) startMain();
