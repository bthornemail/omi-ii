// ============================================================
// OMI REVERSE OMICRON — FULL FORM
// ============================================================

import { Buffer } from 'node:buffer';

// ------------------------------------------------------------
// PRIMITIVES
// ------------------------------------------------------------

function rotl(buf, n) {
    return Buffer.from(buf.map((_, i) => buf[(i + n) % buf.length]));
}

function rotr(buf, n) {
    return Buffer.from(buf.map((_, i) => buf[(i - n + buf.length) % buf.length]));
}

function xor(a, b) {
    return Buffer.from(a.map((v, i) => v ^ b[i]));
}

function delta(x, c) {
    return xor(xor(xor(rotl(x, 1), rotl(x, 3)), rotr(x, 2)), c);
}

function delta16Full(ruler) {
    const x = Buffer.from(ruler.subarray(0, 8));
    const c = Buffer.from(ruler.subarray(8, 16));
    const next = delta(x, c);
    ruler.set(next, 0);
    ruler.set(x, 8);
    return ruler;
}

// ------------------------------------------------------------
// PROOF32 — DALI CROSS
// ------------------------------------------------------------

function proof32(t, b, r, l, f, br) {
    return (
        (((t ** 2) + (b ** 2) === r ** 2) ? 1 : 0) |
        (((t ** 2) + (f ** 2) === r ** 2) ? 2 : 0) |
        (((t ** 2) + (br ** 2) === r ** 2) ? 4 : 0) |
        (((b ** 2) + (f ** 2) === r ** 2) ? 8 : 0) |
        (((b ** 2) + (br ** 2) === r ** 2) ? 16 : 0) |
        (((f ** 2) + (br ** 2) === r ** 2) ? 32 : 0) |
        (((t ** 2) + (b ** 2) === l ** 2) ? 64 : 0) |
        (((t ** 2) + (f ** 2) === l ** 2) ? 128 : 0) |
        (((t ** 2) + (br ** 2) === l ** 2) ? 256 : 0) |
        (((b ** 2) + (f ** 2) === l ** 2) ? 512 : 0) |
        (((b ** 2) + (br ** 2) === l ** 2) ? 1024 : 0) |
        (((f ** 2) + (br ** 2) === l ** 2) ? 2048 : 0)
    );
}

function isRight(mask) {
    return (mask & 0x3F) === 0x3F;
}

function isLeft(mask) {
    return (mask & 0xFC0) === 0xFC0;
}

// ------------------------------------------------------------
// SWAP ROTATIONS — 3D GROUP
// ------------------------------------------------------------

function applySwapOrder(ruler, order) {
    switch (order) {
        case 0: ruler.swap16().swap64().swap32(); break;
        case 1: ruler.swap32().swap16().swap64(); break;
        case 2: ruler.swap64().swap32().swap16(); break;
        case 3: ruler.swap16().swap32().swap64(); break;
        case 4: ruler.swap32().swap64().swap16(); break;
        case 5: ruler.swap64().swap16().swap32(); break;
    }
    return ruler;
}

// ------------------------------------------------------------
// ARC COLLECTION
// ------------------------------------------------------------

function collectArcs(up, down, front, back, right, left, xy) {
    const arcs = [];

    for (let t = 0; t < up.length; t += up.BYTES_PER_ELEMENT) {
        for (let b = 0; b < down.length; b += down.BYTES_PER_ELEMENT) {
            for (let r = 0; r < right.length; r += right.BYTES_PER_ELEMENT) {
                for (let l = 0; l < left.length; l += left.BYTES_PER_ELEMENT) {
                    for (let f = 0; f < front.length; f += front.BYTES_PER_ELEMENT) {
                        for (let br = 0; br < back.length; br += back.BYTES_PER_ELEMENT) {
                            const diagonal = up[t] ^ down[b] ^ right[r] ^ left[l] ^ front[f] ^ back[br];
                            if (diagonal % xy === 0) {
                                arcs.push(Buffer.from([
                                    up[t], down[b], right[r], left[l], front[f], back[br]
                                ]));
                            }
                        }
                    }
                }
            }
        }
    }

    return arcs;
}

// ------------------------------------------------------------
// ARC DELTA — CARRY FORWARD ARC TO ARC
// ------------------------------------------------------------

function arcDelta2(arcs, index) {
    const first = arcs[index % arcs.length];
    const second = arcs[(index + 1) % arcs.length];
    const third = arcs[(index + 2) % arcs.length];

    const delta1 = xor(first, second);
    const delta2 = xor(second, third);

    return xor(delta1, delta2);
}

// ------------------------------------------------------------
// FULL STEP — Q FORM + DELTA + SWAP
// ------------------------------------------------------------

function step(ruler, arcs, arcIndex, block, context) {
    const x = ruler[0] ^ ruler[2];
    const y = ruler[3] ^ ruler[5];

    const arcChange = arcDelta2(arcs, arcIndex);

    // Q(x,y) = arcs * x² + 16xy + 4y²
    const q = arcChange * x * x + 16 * x * y + 4 * y * y;

    ruler[7] = q & 0xFF;

    let next = delta16Full(ruler);

    const proof = proof32(
        ruler[0], ruler[1], ruler[2],
        ruler[3], ruler[4], ruler[5]
    );

    let order = 0;
    if (isRight(proof)) order = 0;
    else if (isLeft(proof)) order = 1;
    else order = proof % 6;

    next = applySwapOrder(next, order);

    return {
        next,
        arcIndex: (arcIndex + 2) % arcs.length,
    };
}

// ------------------------------------------------------------
// INITIALIZATION
// ------------------------------------------------------------

function createProtocol(mnemonic = Buffer.allocUnsafe(26).fill("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    block = Buffer.allocUnsafe(2).fill(0),
    context = Buffer.allocUnsafe(8).fill(0)) {

    const wordform = mnemonic.toString('binary');

    const x = block.length * block.BYTES_PER_ELEMENT;
    const y = context.length * context.BYTES_PER_ELEMENT;
    const z = mnemonic.length * mnemonic.BYTES_PER_ELEMENT;
    const xy = x * y;

    const up = Buffer.allocUnsafe(xy).fill(wordform.toUpperCase(), 'binary');
    const down = Buffer.allocUnsafe(xy).fill(wordform.toLowerCase(), 'binary').reverse();
    const front = Buffer.allocUnsafe(xy).fill(mnemonic.toString('hex'), 'binary');
    const back = Buffer.allocUnsafe(xy).fill(mnemonic.toString('hex'), 'binary').reverse();
    const right = Buffer.allocUnsafe(xy).fill(mnemonic.toString('binary'), 'binary');
    const left = Buffer.allocUnsafe(xy).fill(mnemonic.toString('binary'), 'binary').reverse();

    const arcs = collectArcs(up, down, front, back, right, left, xy);

    const initialRuler = Buffer.allocUnsafe(16).fill(0);
    initialRuler[7] = xy;
    initialRuler[6] = z;

    return {
        arcs,
        initialRuler,
        xy,
        z,
    };
}

// ------------------------------------------------------------
// RECALL — COMPUTE ON CALL
// ------------------------------------------------------------

function createRecaller(protocol) {
    const { arcs, initialRuler } = protocol;

    return function recall(targetKey, maxSteps = 0xFFFF) {
        let ruler = Buffer.from(initialRuler);
        let arcIndex = 0;

        for (let i = 0; i < maxSteps; i++) {
            if (ruler.toString('hex') === targetKey) {
                return {
                    found: true,
                    steps: i,
                    ruler: ruler.toString('hex'),
                    nextArc: arcs[arcIndex]?.toString('hex'),
                };
            }

            const result = step(ruler, arcs, arcIndex);
            ruler = result.next;
            arcIndex = result.arcIndex;
        }

        return { found: false };
    };
}

// ------------------------------------------------------------
// EXPORT
// ------------------------------------------------------------

export {
    rotl,
    rotr,
    xor,
    delta,
    delta16Full,
    proof32,
    isRight,
    isLeft,
    applySwapOrder,
    collectArcs,
    arcDelta2,
    step,
    createProtocol,
    createRecaller,
};
