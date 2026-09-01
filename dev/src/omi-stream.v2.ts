// ============================================================
// OMI REVERSE OMICRON — STREAMING FULL FORM
// ============================================================

import { Buffer } from 'node:buffer';
import { Transform } from 'node:stream';


// ============================================================
// REGEX VOCABULARY
// ============================================================

// ------------------------------------------------------------
// Inclusion / exclusion
// ------------------------------------------------------------

const INCLUDE =
    /^[A-Za-z0-9_:+.\-(){}\[\]<>'`",]$/;

const EXCLUDE =
    /^[^A-Za-z0-9_:+.\-(){}\[\]<>'`",]$/;


// ------------------------------------------------------------
// Escape / redaction
// ------------------------------------------------------------

const ESCAPE =
    /^\\(.)$/;


// ------------------------------------------------------------
// Closure
// ------------------------------------------------------------

const CLOSURE =
    /^[(){}\[\]<>'`",]$/;

const ROUND_OPEN = /^\($/;
const ROUND_CLOSE = /^\)$/;

const CURLY_OPEN = /^\{$/;
const CURLY_CLOSE = /^\}$/;

const SQUARE_OPEN = /^\[$/;
const SQUARE_CLOSE = /^\]$/;

const ANGLE_OPEN = /^<$/;
const ANGLE_CLOSE = /^>$/;

const QUOTE_MARK = /^'$/;
const QUASIQUOTE_MARK = /^`$/;
const UNQUOTE_MARK = /^,$/;
const STRING_MARK = /^"$/;


// ------------------------------------------------------------
// Character orientation
// ------------------------------------------------------------

const FRONT =
    /^[A-Za-z0-9:+]$/;

const BACK =
    /^[A-Za-z0-9.-]$/;

const INSIDE =
    /^[A-Za-z0-9_]$/;

const OUTSIDE =
    /^[^A-Za-z0-9_]$/;

const UP =
    /^[A-Z_]$/;

const DOWN =
    /^[a-z_]$/;


// ------------------------------------------------------------
// Position
// ------------------------------------------------------------

const LEFT =
    /^[0-9+-]\.[^0-9+-]$/;

const RIGHT =
    /^[^0-9+-]\.[0-9+-]$/;

const CENTER =
    /^[0-9]\.[0-9]$/;


// ------------------------------------------------------------
// Reflection
// ------------------------------------------------------------

const DEFLECT =
    /^([^".]+):\1$/;

const REFLECT =
    /^([".]+):\1$/;

const INFLECT =
    /^([".]+):([".]+):\2:\1$/;


// ------------------------------------------------------------
// Higher forms
// ------------------------------------------------------------

// AA x BB : BB y AA
const AXIS =
    /^(\d\d)[A-Za-z_](\d\d):\2[0-9+-]\1$/;


// AA WORD BB : BB WORD AA
const MNEMONIC =
    /^(\d\d)([A-Z_]?[a-z_]+)(\d\d):\3\2\1$/;


// ============================================================
// FLAT REGEX TESTS
// ============================================================

const isIncluded = value =>
    INCLUDE.test(value);

const isExcluded = value =>
    EXCLUDE.test(value);

const isEscape = value =>
    ESCAPE.test(value);

const isClosure = value =>
    CLOSURE.test(value);


const isRoundOpen = value =>
    ROUND_OPEN.test(value);

const isRoundClose = value =>
    ROUND_CLOSE.test(value);

const isCurlyOpen = value =>
    CURLY_OPEN.test(value);

const isCurlyClose = value =>
    CURLY_CLOSE.test(value);

const isSquareOpen = value =>
    SQUARE_OPEN.test(value);

const isSquareClose = value =>
    SQUARE_CLOSE.test(value);

const isAngleOpen = value =>
    ANGLE_OPEN.test(value);

const isAngleClose = value =>
    ANGLE_CLOSE.test(value);


const isQuoteMark = value =>
    QUOTE_MARK.test(value);

const isQuasiquoteMark = value =>
    QUASIQUOTE_MARK.test(value);

const isUnquoteMark = value =>
    UNQUOTE_MARK.test(value);

const isStringMark = value =>
    STRING_MARK.test(value);


const isFront = value =>
    FRONT.test(value);

const isBack = value =>
    BACK.test(value);

const isInside = value =>
    INSIDE.test(value);

const isOutside = value =>
    OUTSIDE.test(value);

const isUp = value =>
    UP.test(value);

const isDown = value =>
    DOWN.test(value);


const isLeft = value =>
    LEFT.test(value);

const isRightSyntax = value =>
    RIGHT.test(value);

const isCenter = value =>
    CENTER.test(value);


const isDeflect = value =>
    DEFLECT.test(value);

const isReflect = value =>
    REFLECT.test(value);

const isInflect = value =>
    INFLECT.test(value);

const isAxis = value =>
    AXIS.test(value);

const isMnemonic = value =>
    MNEMONIC.test(value);


// ============================================================
// REGEX REDUCTION TRANSFORM
//
// source bytes
//      │
//      ├── included ──────► emit
//      │
//      ├── \included ────► emit redacted character
//      │
//      └── excluded ──────► reduce/drop
//
// Escape state survives stream chunk boundaries.
// ============================================================

class RegexReductionTransform extends Transform {

    constructor(options = {}) {
        super(options);

        this.escapePending = false;

        this.inputCount = 0;
        this.outputCount = 0;
        this.excludedCount = 0;
        this.redactedCount = 0;
    }


    _transform(chunk, encoding, callback) {

        try {

            if (!Buffer.isBuffer(chunk)) {
                chunk = Buffer.from(chunk, encoding);
            }

            const output = [];


            for (const byte of chunk) {

                this.inputCount++;

                const char =
                    String.fromCharCode(byte);


                // ----------------------------------------------------
                // Previous byte was "\"
                //
                // Emit this byte as data without interpreting it
                // as active syntax.
                // ----------------------------------------------------

                if (this.escapePending) {

                    output.push(byte);

                    this.outputCount++;
                    this.redactedCount++;

                    this.escapePending = false;

                    continue;
                }


                // ----------------------------------------------------
                // Escape introducer
                // ----------------------------------------------------

                if (char === '\\') {

                    this.escapePending = true;

                    continue;
                }


                // ----------------------------------------------------
                // Included vocabulary
                // ----------------------------------------------------

                if (isIncluded(char)) {

                    output.push(byte);

                    this.outputCount++;

                    continue;
                }


                // ----------------------------------------------------
                // Excluded vocabulary
                // ----------------------------------------------------

                this.excludedCount++;
            }


            callback(
                null,
                Buffer.from(output)
            );

        }

        catch (error) {
            callback(error);
        }
    }


    _flush(callback) {

        // A trailing "\" has no operand.
        //
        // Treat it as excluded syntax.

        if (this.escapePending) {
            this.excludedCount++;
            this.escapePending = false;
        }

        callback();
    }
}


// ============================================================
// REGEX REDUCTION FACTORY
// ============================================================

function createRegexReduction(options) {

    return new RegexReductionTransform(
        options
    );
}


// ============================================================
// BUFFER PRIMITIVES
// ============================================================

function rotl(buf, n) {

    if (buf.length === 0) {
        return Buffer.alloc(0);
    }

    n =
        ((n % buf.length) + buf.length) %
        buf.length;

    return Buffer.from(
        buf.map(
            (_, i) =>
                buf[(i + n) % buf.length]
        )
    );
}


function rotr(buf, n) {

    if (buf.length === 0) {
        return Buffer.alloc(0);
    }

    n =
        ((n % buf.length) + buf.length) %
        buf.length;

    return Buffer.from(
        buf.map(
            (_, i) =>
                buf[
                (i - n + buf.length) %
                buf.length
                ]
        )
    );
}


// ------------------------------------------------------------
// XOR
//
// Equal-width buffers only.
// ------------------------------------------------------------

function xor(a, b) {

    if (!Buffer.isBuffer(a) ||
        !Buffer.isBuffer(b)) {

        throw new TypeError(
            'xor requires two Buffers'
        );
    }


    if (a.length !== b.length) {

        throw new RangeError(
            `xor length mismatch: ` +
            `${a.length} !== ${b.length}`
        );
    }


    return Buffer.from(
        a.map(
            (value, i) =>
                value ^ b[i]
        )
    );
}


// ============================================================
// DELTA
// ============================================================

function delta(x, c) {

    return xor(
        xor(
            xor(
                rotl(x, 1),
                rotl(x, 3)
            ),

            rotr(x, 2)
        ),

        c
    );
}


// ------------------------------------------------------------
// Full 16-byte ruler delta
//
// ruler:
//
// [ current : 8 ][ context : 8 ]
//
// becomes:
//
// [ next    : 8 ][ current : 8 ]
// ------------------------------------------------------------

function delta16Full(ruler) {

    if (!Buffer.isBuffer(ruler) ||
        ruler.length !== 16) {

        throw new RangeError(
            'delta16Full requires a 16-byte Buffer'
        );
    }


    const x =
        Buffer.from(
            ruler.subarray(0, 8)
        );


    const c =
        Buffer.from(
            ruler.subarray(8, 16)
        );


    const next =
        delta(x, c);


    ruler.set(next, 0);

    ruler.set(x, 8);


    return ruler;
}


// ============================================================
// PROOF32 — DALI CROSS
// ============================================================

function proof32(
    t,
    b,
    r,
    l,
    f,
    br
) {

    return (

        (
            t ** 2 + b ** 2 === r ** 2
                ? 1
                : 0
        ) |

        (
            t ** 2 + f ** 2 === r ** 2
                ? 2
                : 0
        ) |

        (
            t ** 2 + br ** 2 === r ** 2
                ? 4
                : 0
        ) |

        (
            b ** 2 + f ** 2 === r ** 2
                ? 8
                : 0
        ) |

        (
            b ** 2 + br ** 2 === r ** 2
                ? 16
                : 0
        ) |

        (
            f ** 2 + br ** 2 === r ** 2
                ? 32
                : 0
        ) |

        (
            t ** 2 + b ** 2 === l ** 2
                ? 64
                : 0
        ) |

        (
            t ** 2 + f ** 2 === l ** 2
                ? 128
                : 0
        ) |

        (
            t ** 2 + br ** 2 === l ** 2
                ? 256
                : 0
        ) |

        (
            b ** 2 + f ** 2 === l ** 2
                ? 512
                : 0
        ) |

        (
            b ** 2 + br ** 2 === l ** 2
                ? 1024
                : 0
        ) |

        (
            f ** 2 + br ** 2 === l ** 2
                ? 2048
                : 0
        )
    );
}


// ------------------------------------------------------------
// Proof orientation
// ------------------------------------------------------------

function isProofRight(mask) {
    return (mask & 0x03F) === 0x03F;
}


function isProofLeft(mask) {
    return (mask & 0xFC0) === 0xFC0;
}


// ============================================================
// SWAP ROTATIONS — SIX ORDERS
// ============================================================

function applySwapOrder(
    ruler,
    order
) {

    if (!Buffer.isBuffer(ruler) ||
        ruler.length % 8 !== 0) {

        throw new RangeError(
            'swap ruler length must be a multiple of 8'
        );
    }


    switch (order) {

        case 0:

            ruler
                .swap16()
                .swap64()
                .swap32();

            break;


        case 1:

            ruler
                .swap32()
                .swap16()
                .swap64();

            break;


        case 2:

            ruler
                .swap64()
                .swap32()
                .swap16();

            break;


        case 3:

            ruler
                .swap16()
                .swap32()
                .swap64();

            break;


        case 4:

            ruler
                .swap32()
                .swap64()
                .swap16();

            break;


        case 5:

            ruler
                .swap64()
                .swap16()
                .swap32();

            break;


        default:

            throw new RangeError(
                `invalid swap order: ${order}`
            );
    }


    return ruler;
}


// ============================================================
// ARC COLLECTION
// ============================================================

function collectArcs(
    up,
    down,
    front,
    back,
    right,
    left,
    xy
) {

    if (!Number.isInteger(xy) ||
        xy <= 0) {

        throw new RangeError(
            'xy must be a positive integer'
        );
    }


    const arcs = [];


    for (
        let t = 0;
        t < up.length;
        t++
    ) {

        for (
            let b = 0;
            b < down.length;
            b++
        ) {

            for (
                let r = 0;
                r < right.length;
                r++
            ) {

                for (
                    let l = 0;
                    l < left.length;
                    l++
                ) {

                    for (
                        let f = 0;
                        f < front.length;
                        f++
                    ) {

                        for (
                            let br = 0;
                            br < back.length;
                            br++
                        ) {

                            const diagonal =
                                up[t] ^
                                down[b] ^
                                right[r] ^
                                left[l] ^
                                front[f] ^
                                back[br];


                            if (
                                diagonal % xy === 0
                            ) {

                                arcs.push(
                                    Buffer.from([
                                        up[t],
                                        down[b],
                                        right[r],
                                        left[l],
                                        front[f],
                                        back[br]
                                    ])
                                );
                            }
                        }
                    }
                }
            }
        }
    }


    return arcs;
}


// ============================================================
// ARC DELTA²
//
// previous → present → forward
//
// incoming = previous XOR present
// outgoing = present  XOR forward
//
// scope    = incoming XOR outgoing
//
// Algebraically:
//
// scope = previous XOR forward
//
// but the expanded form intentionally retains the
// three-position environmental scope.
// ============================================================

function arcDelta2(
    arcs,
    index
) {

    if (!Array.isArray(arcs) ||
        arcs.length === 0) {

        throw new Error(
            'arcDelta2 requires at least one arc'
        );
    }


    const previous =
        arcs[
        index %
        arcs.length
        ];


    const present =
        arcs[
        (index + 1) %
        arcs.length
        ];


    const forward =
        arcs[
        (index + 2) %
        arcs.length
        ];


    const incoming =
        xor(
            previous,
            present
        );


    const outgoing =
        xor(
            present,
            forward
        );


    return xor(
        incoming,
        outgoing
    );
}


// ============================================================
// Q SCOPE
//
// Q(a,x,y)
//
//      = ax² + 16xy + 4y²
//
// scope remains a Buffer.
//
// Every environmental coordinate receives the same x/y
// relation while retaining its own coefficient a.
// ============================================================

function qScope(
    scope,
    x,
    y
) {

    if (!Buffer.isBuffer(scope)) {

        throw new TypeError(
            'qScope requires a Buffer scope'
        );
    }


    return Buffer.from(
        scope.map(
            a =>
                (
                    a * x * x +
                    16 * x * y +
                    4 * y * y
                ) & 0xFF
        )
    );
}


// ============================================================
// XOR REDUCTION
// ============================================================

function xorReduce(buffer) {

    let parity = 0;


    for (const byte of buffer) {
        parity ^= byte;
    }


    return parity;
}


// ============================================================
// STEP
// ============================================================

function step(
    ruler,
    arcs,
    arcIndex
) {

    if (!Buffer.isBuffer(ruler) ||
        ruler.length !== 16) {

        throw new RangeError(
            'step requires a 16-byte ruler'
        );
    }


    // ----------------------------------------------------------
    // Coordinate relation
    // ----------------------------------------------------------

    const x =
        ruler[0] ^
        ruler[2];


    const y =
        ruler[3] ^
        ruler[5];


    // ----------------------------------------------------------
    // previous / present / forward parity scope
    // ----------------------------------------------------------

    const scope =
        arcDelta2(
            arcs,
            arcIndex
        );


    // ----------------------------------------------------------
    // Q over complete scope
    // ----------------------------------------------------------

    const q =
        qScope(
            scope,
            x,
            y
        );


    // ----------------------------------------------------------
    // Scope → parity byte
    // ----------------------------------------------------------

    const qParity =
        xorReduce(q);


    ruler[7] =
        qParity;


    // ----------------------------------------------------------
    // Delta
    // ----------------------------------------------------------

    let next =
        delta16Full(
            ruler
        );


    // ----------------------------------------------------------
    // Proof orientation
    // ----------------------------------------------------------

    const proof =
        proof32(
            ruler[0],
            ruler[1],
            ruler[2],
            ruler[3],
            ruler[4],
            ruler[5]
        );


    let order;


    if (isProofRight(proof)) {

        order = 0;
    }

    else if (isProofLeft(proof)) {

        order = 1;
    }

    else {

        order =
            proof % 6;
    }


    // ----------------------------------------------------------
    // Six-way swap orientation
    // ----------------------------------------------------------

    next =
        applySwapOrder(
            next,
            order
        );


    return {

        next,

        scope,

        q,

        qParity,

        proof,

        order,

        arcIndex:
            (arcIndex + 2) %
            arcs.length
    };
}


// ============================================================
// PROTOCOL INITIALIZATION
// ============================================================

function createProtocol(
    mnemonic =
        Buffer.from(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'latin1'
        ),

    block =
        Buffer.alloc(2),

    context =
        Buffer.alloc(8)
) {

    if (!Buffer.isBuffer(mnemonic)) {

        mnemonic =
            Buffer.from(
                String(mnemonic),
                'latin1'
            );
    }


    if (!Buffer.isBuffer(block)) {

        block =
            Buffer.from(block);
    }


    if (!Buffer.isBuffer(context)) {

        context =
            Buffer.from(context);
    }


    const x =
        block.length;


    const y =
        context.length;


    const z =
        mnemonic.length;


    const xy =
        x * y;


    if (xy === 0) {

        throw new Error(
            'block and context must be non-empty'
        );
    }


    // ----------------------------------------------------------
    // Mnemonic environmental source
    // ----------------------------------------------------------

    const wordform =
        mnemonic.toString(
            'latin1'
        );


    // ----------------------------------------------------------
    // UP
    // ----------------------------------------------------------

    const up =
        Buffer.alloc(xy);


    up.fill(
        wordform.toUpperCase(),
        'latin1'
    );


    // ----------------------------------------------------------
    // DOWN
    // ----------------------------------------------------------

    const down =
        Buffer.alloc(xy);


    down.fill(
        wordform.toLowerCase(),
        'latin1'
    );


    down.reverse();


    // ----------------------------------------------------------
    // FRONT
    // ----------------------------------------------------------

    const hex =
        mnemonic.toString(
            'hex'
        );


    const front =
        Buffer.alloc(xy);


    front.fill(
        hex,
        'latin1'
    );


    // ----------------------------------------------------------
    // BACK
    // ----------------------------------------------------------

    const back =
        Buffer.alloc(xy);


    back.fill(
        hex,
        'latin1'
    );


    back.reverse();


    // ----------------------------------------------------------
    // RIGHT
    // ----------------------------------------------------------

    const right =
        Buffer.alloc(xy);


    right.fill(
        mnemonic
    );


    // ----------------------------------------------------------
    // LEFT
    // ----------------------------------------------------------

    const left =
        Buffer.alloc(xy);


    left.fill(
        mnemonic
    );


    left.reverse();


    // ----------------------------------------------------------
    // Arc environment
    // ----------------------------------------------------------

    const arcs =
        collectArcs(
            up,
            down,
            front,
            back,
            right,
            left,
            xy
        );


    if (arcs.length === 0) {

        throw new Error(
            'protocol produced no arcs'
        );
    }


    // ----------------------------------------------------------
    // Initial 16-byte ruler
    // ----------------------------------------------------------

    const initialRuler =
        Buffer.alloc(16);


    initialRuler[7] =
        xy & 0xFF;


    initialRuler[6] =
        z & 0xFF;


    return {

        arcs,

        initialRuler,

        xy,

        z
    };
}


// ============================================================
// OMICRON TRANSFORM
//
// This is the byte/environment transform.
//
// It deliberately knows nothing about regex syntax.
// ============================================================

class OmicronTransform
    extends Transform {

    constructor(
        protocol,
        options = {}
    ) {

        super(options);


        if (!protocol) {

            throw new TypeError(
                'OmicronTransform requires a protocol'
            );
        }


        if (!Array.isArray(protocol.arcs) ||
            protocol.arcs.length === 0) {

            throw new TypeError(
                'protocol requires arcs'
            );
        }


        this.arcs =
            protocol.arcs;


        this.ruler =
            Buffer.from(
                protocol.initialRuler
            );


        this.arcIndex = 0;

        this.position = 0;
    }


    _transform(
        chunk,
        encoding,
        callback
    ) {

        try {

            if (!Buffer.isBuffer(chunk)) {

                chunk =
                    Buffer.from(
                        chunk,
                        encoding
                    );
            }


            const output =
                Buffer.allocUnsafe(
                    chunk.length
                );


            for (
                let i = 0;
                i < chunk.length;
                i++
            ) {

                // ----------------------------------------------------
                // Advance transform/parity environment
                // ----------------------------------------------------

                const result =
                    step(
                        this.ruler,
                        this.arcs,
                        this.arcIndex
                    );


                this.ruler =
                    result.next;


                this.arcIndex =
                    result.arcIndex;


                // ----------------------------------------------------
                // Select current ruler coordinate
                // ----------------------------------------------------

                const scopeByte =
                    this.ruler[
                    this.position %
                    this.ruler.length
                    ];


                // ----------------------------------------------------
                // Duplex XOR relation
                // ----------------------------------------------------

                output[i] =
                    chunk[i] ^
                    scopeByte;


                this.position++;
            }


            callback(
                null,
                output
            );
        }

        catch (error) {

            callback(error);
        }
    }
}


// ============================================================
// OMICRON FACTORY
// ============================================================

function createOmicronTransform(
    mnemonic,
    block,
    context,
    options
) {

    const protocol =
        createProtocol(
            mnemonic,
            block,
            context
        );


    return new OmicronTransform(
        protocol,
        options
    );
}


// ============================================================
// COMPLETE REDUCTION TRANSFORM
//
// This composes:
//
//     RegexReductionTransform
//               ↓
//         OmicronTransform
//
// as two stream stages.
//
// Usage:
//
// input
//   .pipe(createRegexReduction())
//   .pipe(createOmicronTransform(...))
//   .pipe(output)
//
// Keeping these stages separate is intentional:
// regex owns syntax; Omicron owns byte transformation.
// ============================================================


// ============================================================
// RECALL
// ============================================================

function createRecaller(
    protocol
) {

    const {
        arcs,
        initialRuler
    } = protocol;


    return function recall(
        targetKey,
        maxSteps = 0xFFFF
    ) {

        let ruler =
            Buffer.from(
                initialRuler
            );


        let arcIndex = 0;


        for (
            let i = 0;
            i < maxSteps;
            i++
        ) {

            const key =
                ruler.toString(
                    'hex'
                );


            if (key === targetKey) {

                return {

                    found: true,

                    steps: i,

                    ruler: key,

                    nextArc:
                        arcs[
                            arcIndex %
                            arcs.length
                        ].toString(
                            'hex'
                        )
                };
            }


            const result =
                step(
                    ruler,
                    arcs,
                    arcIndex
                );


            ruler =
                result.next;


            arcIndex =
                result.arcIndex;
        }


        return {
            found: false
        };
    };
}


// ============================================================
// EXPORT
// ============================================================

export {

    // ----------------------------------------------------------
    // Regex vocabulary
    // ----------------------------------------------------------

    INCLUDE,
    EXCLUDE,
    ESCAPE,
    CLOSURE,

    ROUND_OPEN,
    ROUND_CLOSE,

    CURLY_OPEN,
    CURLY_CLOSE,

    SQUARE_OPEN,
    SQUARE_CLOSE,

    ANGLE_OPEN,
    ANGLE_CLOSE,

    QUOTE_MARK,
    QUASIQUOTE_MARK,
    UNQUOTE_MARK,
    STRING_MARK,

    FRONT,
    BACK,

    INSIDE,
    OUTSIDE,

    UP,
    DOWN,

    LEFT,
    RIGHT,
    CENTER,

    DEFLECT,
    REFLECT,
    INFLECT,

    AXIS,
    MNEMONIC,


    // ----------------------------------------------------------
    // Regex tests
    // ----------------------------------------------------------

    isIncluded,
    isExcluded,
    isEscape,
    isClosure,

    isRoundOpen,
    isRoundClose,

    isCurlyOpen,
    isCurlyClose,

    isSquareOpen,
    isSquareClose,

    isAngleOpen,
    isAngleClose,

    isQuoteMark,
    isQuasiquoteMark,
    isUnquoteMark,
    isStringMark,

    isFront,
    isBack,

    isInside,
    isOutside,

    isUp,
    isDown,

    isLeft,
    isRightSyntax,
    isCenter,

    isDeflect,
    isReflect,
    isInflect,

    isAxis,
    isMnemonic,


    // ----------------------------------------------------------
    // Regex stream
    // ----------------------------------------------------------

    RegexReductionTransform,
    createRegexReduction,


    // ----------------------------------------------------------
    // Buffer primitives
    // ----------------------------------------------------------

    rotl,
    rotr,
    xor,

    delta,
    delta16Full,


    // ----------------------------------------------------------
    // Proof
    // ----------------------------------------------------------

    proof32,
    isProofRight,
    isProofLeft,


    // ----------------------------------------------------------
    // Orientation
    // ----------------------------------------------------------

    applySwapOrder,


    // ----------------------------------------------------------
    // Environment
    // ----------------------------------------------------------

    collectArcs,
    arcDelta2,

    qScope,
    xorReduce,

    step,


    // ----------------------------------------------------------
    // Protocol
    // ----------------------------------------------------------

    createProtocol,
    createRecaller,


    // ----------------------------------------------------------
    // Transform
    // ----------------------------------------------------------

    OmicronTransform,
    createOmicronTransform
};
