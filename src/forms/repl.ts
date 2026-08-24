import repl, { Repl } from 'node:repl';
import process from 'node:process';
import net from 'node:net';
import fs from 'node:fs';
import { createContext, runInContext } from 'node:vm';
function isRecoverableError(error) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
}
export default class REPL {
    repl?: Repl;
    connections: number = 0;
    context = {};
    myEval(cmd, context, filename, callback) {
        let result;
        try {
            createContext(this.context);
            result = runInContext(cmd, context);//this.context);
        } catch (e: Error) {
            if (isRecoverableError(e)) {
                console.log("Recoverable");
                return callback(new repl.Recoverable(e));
            }

        }
        callback(null, result);
    }
    myWriter(output) {
        return output.toUpperCase();
    }
    async socket(port?: number) {
        return new Promise((resolve, reject) => {
            try {
                const sock = net.connect(port ?? 1337);
                process.stdin.pipe(sock);
                sock.pipe(process.stdout);

                sock.on('connect', () => {
                    process.stdin.resume();
                    process.stdin.setRawMode(true);
                });

                sock.on('close', () => {
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    sock.removeListener('close'); //done);
                });

                process.stdin.on('end', () => {
                    sock.destroy();
                    console.log();
                });

                process.stdin.on('data', (b) => {
                    if (b.length === 1 && b[0] === 4) {
                        process.stdin.emit('end');
                    }
                });
                resolve(sock);
            }
            catch (e) {
                reject(Error(e));
            }
        })
    }

    async serve(port?: number) {
        return new Promise((resolve, reject) => {
            try {
                net.createServer((socket) => {
                    const r = repl.start({
                        prompt: `socket ${socket.remoteAddress}:${socket.remotePort}> `,
                        input: socket,
                        output: socket,
                        terminal: true,
                        useGlobal: false,
                    });
                    r.on('exit', () => {
                        socket.end();
                    });
                    r.context.socket = socket;
                    resolve(r);
                })
                    .listen(port ?? 1337);
            } catch (e) {
                reject(Error(e));
            }
        });
    }
    initializeContext(context) {
        context.m = 'test';
        this.repl.defineCommand('upgrade', {
            help: 'Upgrade Eval and Writer',
            action() {
                this.clearBufferedCommand();
                console.log(`Upgrading Writer`);
                this.repl = repl.start({ prompt: 'imo> ', eval: this.myEval, writer: this.myWriter });
                this.displayPrompt();
            },
        });
        this.repl.defineCommand('sayhello', {
            help: 'Say hello',
            action(name) {
                this.clearBufferedCommand();
                console.log(`Hello, ${name}!`);
                this.displayPrompt();
            },
        });
        this.repl.defineCommand('saybye', function saybye() {
            console.log('Goodbye!');
            this.close();
        });
    }
    init() {
        this.repl = repl.start({ prompt: 'imo> ', eval: this.myEval });
        this.repl.on('reset', this.initializeContext);
        this.repl.on('exit', () => {
            console.log('Received "exit" event from repl!');
            process.exit();
        });
        this.initializeContext(this.repl.context);
        return;
    }
    async fifo() {
        return new Promise((resolve, reject) => {
            try {
                const unixSocketPath = '/tmp/node-repl-sock';
                // If the socket file already exists let's remove it
                fs.rmSync(unixSocketPath, { force: true });
                const server = net.createServer((socket) => {
                    this.connections += 1;
                    this.repl.start({
                        prompt: 'Node.js via Unix socket> ',
                        useGlobal: true,
                        input: socket,
                        output: socket,
                    }).on('exit', () => {
                        socket.end();
                        fs.rmSync(unixSocketPath, { force: true });
                    });
                })
                server.listen(unixSocketPath);
                resolve(server);
            } catch (e) {
                reject(e);
            }
        });
    }
}
