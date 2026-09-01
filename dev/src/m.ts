import { Buffer } from 'node:buffer';

function createKnot(_Knot: Record<string, string> = {}) {
    //    const _Knot: Record<string, string> = {};

    return function bind(rule: Buffer = Buffer.allocUnsafe(8).fill(0), ruler: Buffer = Buffer.allocUnsafe(8).fill(0)) {
        const rulerKey = ruler.toString('hex');
        const ruleKey = rule.toString('hex');
        _Knot[rulerKey] = ruleKey;
        _Knot[ruleKey] = rulerKey;
        return _Knot;
    };
}
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
/*
  Then a right rotation is proof32(...) & 0x3F === 0x3F and left rotation is proof32(...) & 0xFC0 === 0xFC0.
*/

function getRotation(t, b, r, l, f, br, mask: number = 0) {
    // let mask = 0;
    const t2 = t ** 2;
    const b2 = b ** 2;
    const r2 = r ** 2;
    const l2 = l ** 2;
    const f2 = f ** 2;
    const br2 = br ** 2;

    const clauses = [
        (t2) + (b2) === r2,
        (t2) + (f2) === r2,
        (t2) + (br2) === r2,
        (b2) + (f2) === r2,
        (b2) + (br2) === r2,
        (f2) + (br2) === r2,
        (t2) + (b2) === l2,
        (t2) + (f2) === l2,
        (t2) + (br2) === l2,
        (b2) + (f2) === l2,
        (b2) + (br2) === l2,
        (f2) + (br2) === l2,
    ];

    for (let i = 0; i < clauses.length; i++) {
        if (clauses[i]) mask |= (1 << i);
    }

    return mask;
}
function rotate3D(ruler, order) {
    const next = delta16Full(ruler);
    switch (order) {
        case 0: next.swap16().swap64().swap32(); break;
        case 1: next.swap32().swap16().swap64(); break;
        case 2: next.swap64().swap32().swap16(); break;
        case 3: next.swap16().swap32().swap64(); break;
        case 4: next.swap32().swap64().swap16(); break;
        case 5: next.swap64().swap16().swap32(); break;
    }
    return next;
}
const rotations = [
    (ruler) => ruler.swap16().swap64().swap32(),
    (ruler) => ruler.swap32().swap16().swap64(),
    (ruler) => ruler.swap64().swap32().swap16(),
    (ruler) => ruler.swap16().swap32().swap64(),
    (ruler) => ruler.swap32().swap64().swap16(),
    (ruler) => ruler.swap64().swap16().swap32(),
];
function step3D(ruler, face) {
    const next = delta16Full(ruler);
    rotations[face](next);
    return next;
}

const face = qxy(rule) % 6;
const next = step3D(ruler, face);
function qxyz(rule) {
    const x = rule[0] ^ rule[2];
    const y = rule[3] ^ rule[5];
    const z = rule[6];
    return 60 * x * x + 16 * x * y + 4 * y * y + z;
}

function rotl(buf, n) {
    return Buffer.from(buf.map((_, i) => buf[(i + n) % buf.length]));
};
function rotr(buf, n) {
    return Buffer.from(buf.map((_, i) => buf[(i - n + buf.length) % buf.length]));
};

function xor(a, b) {
    return Buffer.from(a.map((v, i) => v ^ b[i]));
};
function isRight(t, b, r, l, f, br) {
    return (t ** 2) + (b ** 2) === r ** 2 &&
        (t ** 2) + (f ** 2) === r ** 2 &&
        (t ** 2) + (br ** 2) === r ** 2 &&
        (b ** 2) + (f ** 2) === r ** 2 &&
        (b ** 2) + (br ** 2) === r ** 2 &&
        (f ** 2) + (br ** 2) === r ** 2;
}

function isLeft(t, b, r, l, f, br) {
    return (t ** 2) + (b ** 2) === l ** 2 &&
        (t ** 2) + (f ** 2) === l ** 2 &&
        (t ** 2) + (br ** 2) === l ** 2 &&
        (b ** 2) + (f ** 2) === l ** 2 &&
        (b ** 2) + (br ** 2) === l ** 2 &&
        (f ** 2) + (br ** 2) === l ** 2;
}
function delta(buf, C) {
    return xor(xor(xor(rotl(buf, 1), rotl(buf, 3)), rotr(buf, 2)), C);
};
function delta16(ruler) {
    const state = Buffer.from(ruler.subarray(0, 8));
    const C = Buffer.from(ruler.subarray(8, 16));
    const next = delta(state, C);
    ruler.set(next, 0);
    ruler.set(state, 8);
    return ruler;
}
function calc(mnemonic = Buffer.allocUnsafe(26).fill("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), block = Buffer.allocUnsafe(2).fill(0), context = Buffer.allocUnsafe(8).fill(0)) {
    let count = 0;
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
    const left = Buffer.allocUnsafe(xy).fill(mnemonic.toString('binary'), 'binary').reverse();;
    //const bind = createKnot();
    const rules = [];
    for (let t = 0; t < up.length; t += up.BYTES_PER_ELEMENT) {
        for (let b = 0; b < down.length; b += down.BYTES_PER_ELEMENT) {
            for (let r = 0; r < right.length; r += right.BYTES_PER_ELEMENT) {
                for (let l = 0; l < left.length; l += left.BYTES_PER_ELEMENT) {
                    for (let f = 0; f < front.length; f += front.BYTES_PER_ELEMENT) {
                        for (let br = 0; br < back.length; br += back.BYTES_PER_ELEMENT) {
                            const diagonal = up[t] ^ down[b] ^ right[r] ^ left[l] ^ front[f] ^ back[br];
                            const linear = up[t] + down[b] + right[r] + left[l] + front[f] + back[br];

                            const ruler = Buffer.allocUnsafe(16).fill(0);
                            ruler[0] = t;
                            ruler[1] = b;
                            ruler[2] = r;
                            ruler[3] = l;
                            ruler[4] = f;
                            ruler[5] = br;
                            ruler[6] = z;
                            ruler[7] = xy;
                            const rule: Buffer = ruler.subarray(8);
                            rule[0] = up[t];
                            rule[1] = down[b];
                            rule[2] = right[r];
                            rule[3] = left[l];
                            rule[4] = front[f];
                            rule[5] = back[br];
                            rule[6] = linear;
                            rule[7] = diagonal;
                            switch (true) {

                                case isRight(t, b, r, l, f, br, xy):
                                    //                                case (t ** 2) + (b ** 2) === r ** 2:
                                    //                                case (t ** 2) + (f ** 2) === r ** 2:
                                    //                                case (t ** 2) + (br ** 2) == r ** 2:
                                    //                                case (b ** 2) + (f ** 2) === r ** 2:
                                    //                                case (b ** 2) + (br ** 2) == r ** 2:
                                    //                                case (f ** 2) + (br ** 2) == r ** 2:
                                    // right Rotation rule
                                    ruler[2] = ~ruler[2]; rule[2] = ~rule[2];


                                case isLeft(t, b, r, l, f, br, xy):
                                    //				  case (t ** 2) + (b ** 2) === l ** 2:
                                    //                                case (t ** 2) + (f ** 2) === l ** 2:
                                    //                                case (t ** 2) + (br ** 2) === l ** 2:
                                    //                                case (b ** 2) + (f ** 2) === l ** 2:
                                    //                                case (b ** 2) + (br ** 2) === l ** 2:
                                    //                                case (f ** 2) + (br ** 2) === l ** 2:
                                    // left Rotation rule
                                    ruler[3] = ~ruler[3];
                                    rule[3] = ~rule[3];

                                case linear % count === 0:
                                    ruler[6] = ~ruler[6];
                                //                                    lines.push(rule);

                                case xy === diagonal:
                                case (xy ^ diagonal) === 0:
                                    // case diagonal % xy === 0:
                                    //                                    arcs.push(rule);
                                    ruler[7] = ~ruler[7];
                                    rule[7] = ~rule[7];
                                //                                    console.log({ ruler: rules });
                                case diagonal % xy === 0:
                                    rules[count] = delta16(ruler).toString('hex');
                                    //                              console.log(rules[count]);
                                    break;
                                //                                default:
                                //   process.stdout.write('.');

                            }
                            count++;
                        }
                    }
                }
            }
        }
    }


    console.log("count", count);

    console.log("up", up.length);
    console.log("down", down.length);
    console.log("left", left.length);
    console.log("right", right.length);
    return rules;

}

const buf16 = Buffer.allocUnsafe(2).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 'binary')
const buf64 = Buffer.allocUnsafe(8).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 'binary')
for (let i = 0; i < buf16.length; i++) {
    buf16[i] = i;
}
for (let i = 0; i < buf64.length; i++) {
    buf64[i] = i;
}
console.log(calc(buf16, buf64));
