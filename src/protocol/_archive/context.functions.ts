import repl from 'node:repl';

const replServer = repl.start({ prompt: '> ' });

const contextFunctions = {
    rotl: {
        help: 'Rotate buffer left by n bits',
        action(bufferHex, n) {
            const buf = Buffer.from(bufferHex, 'hex');
            const result = Buffer.from(buf.map((_, i) => buf[(i + Number(n)) % buf.length]));
            console.log(result.toString('hex'));
            this.displayPrompt();
        },
    },
    rotr: {
        help: 'Rotate buffer right by n bits',
        action(bufferHex, n) {
            const buf = Buffer.from(bufferHex, 'hex');
            const result = Buffer.from(buf.map((_, i) => buf[(i - Number(n) + buf.length) % buf.length]));
            console.log(result.toString('hex'));
            this.displayPrompt();
        },
    },
    xor: {
        help: 'XOR two hex buffers',
        action(aHex, bHex) {
            const a = Buffer.from(aHex, 'hex');
            const b = Buffer.from(bHex, 'hex');
            const result = Buffer.from(a.map((v, i) => v ^ b[i]));
            console.log(result.toString('hex'));
            this.displayPrompt();
        },
    },
    delta: {
        help: 'Apply delta law: rotl1 xor rotl3 xor rotr2 xor C',
        action(stateHex, CHex) {
            const state = Buffer.from(stateHex, 'hex');
            const C = Buffer.from(CHex, 'hex');
            const rotl = (buf, n) => Buffer.from(buf.map((_, i) => buf[(i + n) % buf.length]));
            const rotr = (buf, n) => Buffer.from(buf.map((_, i) => buf[(i - n + buf.length) % buf.length]));
            const xor = (a, b) => Buffer.from(a.map((v, i) => v ^ b[i]));
            const result = xor(xor(xor(rotl(state, 1), rotl(state, 3)), rotr(state, 2)), C);
            console.log(result.toString('hex'));
            this.displayPrompt();
        },
    },
    carry: {
        help: 'Update carry: C = C XOR state',
        action(CHex, stateHex) {
            const C = Buffer.from(CHex, 'hex');
            const state = Buffer.from(stateHex, 'hex');
            const result = Buffer.from(C.map((v, i) => v ^ state[i]));
            console.log(result.toString('hex'));
            this.displayPrompt();
        },
    },
    orbit: {
        help: 'Generate orbit from zero state until closure',
        action(widthHex) {
            const width = parseInt(widthHex, 16) || 8;
            const rotl = (buf, n) => Buffer.from(buf.map((_, i) => buf[(i + n) % buf.length]));
            const rotr = (buf, n) => Buffer.from(buf.map((_, i) => buf[(i - n + buf.length) % buf.length]));
            const xor = (a, b) => Buffer.from(a.map((v, i) => v ^ b[i]));
            let state = Buffer.alloc(width).fill(0);
            let C = Buffer.alloc(width).fill(0);
            const orbit = [];
            let steps = 0;
            do {
                state = xor(xor(xor(rotl(state, 1), rotl(state, 3)), rotr(state, 2)), C);
                C = xor(C, state);
                orbit.push(state.toString('hex'));
                steps++;
            } while (state.toString('hex') !== '00'.repeat(width) && steps < 1000);
            console.log(orbit.join('\n'));
            console.log('steps:', steps);
            this.displayPrompt();
        },
    },
};

for (const [keyword, cmd] of Object.entries(contextFunctions)) {
    replServer.defineCommand(keyword, cmd);
}

replServer.defineCommand('helpContext', {
    help: 'List custom context functions',
    action() {
        console.log(Object.keys(contextFunctions).join(', '));
        this.displayPrompt();
    },
});
