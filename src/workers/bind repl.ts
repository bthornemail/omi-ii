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