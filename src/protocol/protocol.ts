import repl from 'node:repl';
//import protocol from './index.ts';
function getProtocol(protocol = {}) {
    try {

        protocol.zero.origin = 0;
        protocol.rotation.left.amount = 1;
        protocol.rotation.three.amount = 3;
        protocol.rotation.right.amount = 2;
        protocol.width.bit = 64;

        protocol.quadratic.form.coefficient.sixty = 60;
        protocol.quadratic.form.coefficient.sixteen = 16;
        protocol.quadratic.form.coefficient.four = 4;

        protocol.variant.fifteen = 15;
        protocol.variant.eleven = 11;
        protocol.variant.four = 4;

        protocol.period.rotation = 240;
        protocol.nomogram.size = 4320;
        protocol.ring.factorial.seven = 5040;
        protocol.binary.closure.bits = 16;
        protocol.binary.maximum.bits = 64;
        protocol.buffer.size.bytes = 3840;
        protocol.block.base = 800;
        protocol.prime.center.mertens.zero = 825;
        protocol.prime.quadruplet.start = 821;
        protocol.prime.quadruplet.end = 829;

        protocol.anchor.zero = 0;

        if (import.meta.main) {
            const r = repl.start('> ');

            for (const [key, value] of Object.entries(protocol)) {
                Object.defineProperty(r.context, key, {
                    configurable: false,
                    enumerable: true,
                    value,
                });
            }

            console.log('Protocol constants defined with fully qualified names.');
            console.log('Example: protocol.quadratic.form.coefficient.sixty');
        }
    }
    catch (e) {
        if (e instanceof TypeError) {
            console.error(`${e.name}: ${e.message}`);
            console.error(`${e.name}: ${e.message.split("'")[1]}`);
            protocol[e.message.split("'")[1]] = {};
            getProtocol(protocol);
        } else if (e instanceof RangeError) {
            console.error(`${e.name}: ${e.message}`);
        }
        // etc.
        else {
            // If none of our cases matched leave the Error unhandled
            console.log(e);
        }
    }
    return protocol;
}

getProtocol()
