// ============================================================
// omi-regex.js
//
// OMI / Reverse Omicron
// Flat lexical + syntax validation library for Buffer input.
//
// Regex classifies syntax.
// It does NOT perform protocol transforms.
// ============================================================


// ============================================================
// 1. WHOLE VOCABULARY
// ============================================================

// One admitted vocabulary character.
const INCLUDE =
    /^[A-Za-z0-9_:+.\-(){}\[\]<>'`",]$/;

// One character outside the admitted vocabulary.
const EXCLUDE =
    /^[^A-Za-z0-9_:+.\-(){}\[\]<>'`",]$/;

// Global forms for scanning a complete buffer.
const INCLUDE_G =
    /[A-Za-z0-9_:+.\-(){}\[\]<>'`",]/g;

const EXCLUDE_G =
    /[^A-Za-z0-9_:+.\-(){}\[\]<>'`",]/g;


// ============================================================
// 2. ESCAPE / REDACTION
// ============================================================

// One escaped character.
//
// Examples:
//
// \(
// \"
// \:
// \A
//
const ESCAPE =
    /^\\(.)$/;

// All escaped characters in a source buffer.
const ESCAPE_G =
    /\\./g;


// ============================================================
// 3. CLOSURE ALPHABET
// ============================================================

// Any single closure/control mark.
const CLOSURE =
    /^[(){}\[\]<>'`",]$/;

// Active closure marks across a buffer.
//
// A mark immediately preceded by "\" is redacted from
// the active closure scan.
const CLOSURE_G =
    /(?<!\\)[(){}\[\]<>'`",]/g;


// ============================================================
// 4. PAIRED CLOSURES
// ============================================================

const ROUND =
    /^\((.*)\)$/;

const CURLY =
    /^\{(.*)\}$/;

const SQUARE =
    /^\[(.*)\]$/;

const ANGLE =
    /^<(.*)>$/;


// Individual endpoints.

const ROUND_OPEN =
    /^\($/;

const ROUND_CLOSE =
    /^\)$/;

const CURLY_OPEN =
    /^\{$/;

const CURLY_CLOSE =
    /^\}$/;

const SQUARE_OPEN =
    /^\[$/;

const SQUARE_CLOSE =
    /^\]$/;

const ANGLE_OPEN =
    /^<$/;

const ANGLE_CLOSE =
    /^>$/;


// ============================================================
// 5. PREFIX / BOUNDARY FORMS
// ============================================================

const QUOTE =
    /^'(.+)$/;

const QUASIQUOTE =
    /^`(.+)$/;

const UNQUOTE =
    /^,(.+)$/;

const STRING =
    /^"([^"]*)"$/;


// Individual marks.

const QUOTE_MARK =
    /^'$/;

const QUASIQUOTE_MARK =
    /^`$/;

const UNQUOTE_MARK =
    /^,$/;

const STRING_MARK =
    /^"$/;


// ============================================================
// 6. CHARACTER ORIENTATION
// ============================================================

// FRONT and BACK overlap on alphanumeric characters.
//
// FRONT adds : +
// BACK  adds . -
//

const FRONT =
    /^[A-Za-z0-9:+]$/;

const BACK =
    /^[A-Za-z0-9.-]$/;


// ============================================================
// 7. INCLUSION SCOPE
// ============================================================

const INSIDE =
    /^[A-Za-z0-9_]$/;

const OUTSIDE =
    /^[^A-Za-z0-9_]$/;


// ============================================================
// 8. VERTICAL ORIENTATION
// ============================================================

const UP =
    /^[A-Z_]$/;

const DOWN =
    /^[a-z_]$/;


// ============================================================
// 9. HORIZONTAL / POSITIONAL RELATIONS
// ============================================================

// X . ¬X
const LEFT =
    /^[0-9+-]\.[^0-9+-]$/;

// ¬X . X
const RIGHT =
    /^[^0-9+-]\.[0-9+-]$/;

// D . D
const CENTER =
    /^[0-9]\.[0-9]$/;


// ============================================================
// 10. REFLECTION RELATIONS
// ============================================================

// A:A
//
// A is anything except:
//     "
//     .
//
// The repeated capture guarantees textual equality.
const DEFLECT =
    /^([^".]+):\1$/;


// A:A
//
// A consists only of:
//     "
//     .
//
const REFLECT =
    /^([".]+):\1$/;


// A:B:B:A
const INFLECT =
    /^([".]+):([".]+):\2:\1$/;


// ============================================================
// 11. AXIS
// ============================================================

// Abstract:
//
// AA x BB : BB y AA
//
// x ∈ [A-Za-z_]
// y ∈ [0-9+-]
//
const AXIS =
    /^(\d\d)[A-Za-z_](\d\d):\2[0-9+-]\1$/;


// ============================================================
// 12. MNEMONIC
// ============================================================

// Exact component reversal:
//
// AA WORD BB : BB WORD AA
//
const MNEMONIC =
    /^(\d\d)([A-Z_]?[a-z_]+)(\d\d):\3\2\1$/;


// ============================================================
// 13. FLAT VOCABULARY TESTS
// ============================================================

const isIncluded = value =>
    INCLUDE.test(value);

const isExcluded = value =>
    EXCLUDE.test(value);

const isEscape = value =>
    ESCAPE.test(value);


// ============================================================
// 14. FLAT CLOSURE TESTS
// ============================================================

const isClosure = value =>
    CLOSURE.test(value);

const isRound = value =>
    ROUND.test(value);

const isCurly = value =>
    CURLY.test(value);

const isSquare = value =>
    SQUARE.test(value);

const isAngle = value =>
    ANGLE.test(value);


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


// ============================================================
// 15. FLAT PREFIX / BOUNDARY TESTS
// ============================================================

const isQuote = value =>
    QUOTE.test(value);

const isQuasiquote = value =>
    QUASIQUOTE.test(value);

const isUnquote = value =>
    UNQUOTE.test(value);

const isString = value =>
    STRING.test(value);


const isQuoteMark = value =>
    QUOTE_MARK.test(value);

const isQuasiquoteMark = value =>
    QUASIQUOTE_MARK.test(value);

const isUnquoteMark = value =>
    UNQUOTE_MARK.test(value);

const isStringMark = value =>
    STRING_MARK.test(value);


// ============================================================
// 16. FLAT ORIENTATION TESTS
// ============================================================

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


// ============================================================
// 17. FLAT POSITION TESTS
// ============================================================

const isLeft = value =>
    LEFT.test(value);

const isRight = value =>
    RIGHT.test(value);

const isCenter = value =>
    CENTER.test(value);


// ============================================================
// 18. FLAT REFLECTION TESTS
// ============================================================

const isDeflect = value =>
    DEFLECT.test(value);

const isReflect = value =>
    REFLECT.test(value);

const isInflect = value =>
    INFLECT.test(value);


// ============================================================
// 19. FLAT HIGHER-FORM TESTS
// ============================================================

const isAxis = value =>
    AXIS.test(value);

const isMnemonic = value =>
    MNEMONIC.test(value);


// ============================================================
// 20. BUFFER NORMALIZATION
// ============================================================

// Accept either:
//
//     Buffer
//     string
//
// Regex remains independent of Buffer internals.
function source(value) {
    return Buffer.isBuffer(value)
        ? value.toString('utf8')
        : String(value);
}


// ============================================================
// 21. GLOBAL BUFFER SCANS
// ============================================================

function included(buffer) {
    return [
        ...source(buffer).matchAll(INCLUDE_G)
    ];
}


function excluded(buffer) {
    return [
        ...source(buffer).matchAll(EXCLUDE_G)
    ];
}


function escaped(buffer) {
    return [
        ...source(buffer).matchAll(ESCAPE_G)
    ];
}


function closures(buffer) {
    return [
        ...source(buffer).matchAll(CLOSURE_G)
    ];
}


// ============================================================
// 22. BOOLEAN BUFFER VALIDATION
// ============================================================

// Every source character must belong to the vocabulary.
//
// Backslash is allowed specially as the escape introducer.
function isVocabulary(buffer) {
    const text = source(buffer);

    for (let i = 0; i < text.length; i++) {

        const char = text[i];

        // Escape consumes itself plus the next character.
        if (char === "\\") {
            if (i + 1 >= text.length) {
                return false;
            }

            i++;
            continue;
        }

        if (!isIncluded(char)) {
            return false;
        }
    }

    return true;
}


// Contains no excluded characters.
function hasNoExcluded(buffer) {
    return excluded(buffer).length === 0;
}


// Contains at least one redaction.
function hasEscape(buffer) {
    return escaped(buffer).length > 0;
}


// Contains at least one active closure.
function hasClosure(buffer) {
    return closures(buffer).length > 0;
}


// ============================================================
// 23. MATCH HELPERS
// ============================================================

// Useful when the caller needs capture groups rather than
// only true / false.

function matchDeflect(value) {
    return source(value).match(DEFLECT);
}


function matchReflect(value) {
    return source(value).match(REFLECT);
}


function matchInflect(value) {
    return source(value).match(INFLECT);
}


function matchAxis(value) {
    return source(value).match(AXIS);
}


function matchMnemonic(value) {
    return source(value).match(MNEMONIC);
}


// ============================================================
// 24. EXPORT
// ============================================================

export {

    // Vocabulary
    INCLUDE,
    EXCLUDE,
    INCLUDE_G,
    EXCLUDE_G,

    // Escape
    ESCAPE,
    ESCAPE_G,

    // Closure
    CLOSURE,
    CLOSURE_G,

    ROUND,
    CURLY,
    SQUARE,
    ANGLE,

    ROUND_OPEN,
    ROUND_CLOSE,
    CURLY_OPEN,
    CURLY_CLOSE,
    SQUARE_OPEN,
    SQUARE_CLOSE,
    ANGLE_OPEN,
    ANGLE_CLOSE,

    // Prefix / boundary
    QUOTE,
    QUASIQUOTE,
    UNQUOTE,
    STRING,

    QUOTE_MARK,
    QUASIQUOTE_MARK,
    UNQUOTE_MARK,
    STRING_MARK,

    // Orientation
    FRONT,
    BACK,
    INSIDE,
    OUTSIDE,
    UP,
    DOWN,

    // Position
    LEFT,
    RIGHT,
    CENTER,

    // Reflection
    DEFLECT,
    REFLECT,
    INFLECT,

    // Higher forms
    AXIS,
    MNEMONIC,

    // Vocabulary tests
    isIncluded,
    isExcluded,
    isEscape,

    // Closure tests
    isClosure,
    isRound,
    isCurly,
    isSquare,
    isAngle,

    isRoundOpen,
    isRoundClose,
    isCurlyOpen,
    isCurlyClose,
    isSquareOpen,
    isSquareClose,
    isAngleOpen,
    isAngleClose,

    // Prefix tests
    isQuote,
    isQuasiquote,
    isUnquote,
    isString,

    isQuoteMark,
    isQuasiquoteMark,
    isUnquoteMark,
    isStringMark,

    // Orientation tests
    isFront,
    isBack,
    isInside,
    isOutside,
    isUp,
    isDown,

    // Position tests
    isLeft,
    isRight,
    isCenter,

    // Reflection tests
    isDeflect,
    isReflect,
    isInflect,

    // Higher forms
    isAxis,
    isMnemonic,

    // Buffer operations
    source,
    included,
    excluded,
    escaped,
    closures,

    // Buffer predicates
    isVocabulary,
    hasNoExcluded,
    hasEscape,
    hasClosure,

    // Capture access
    matchDeflect,
    matchReflect,
    matchInflect,
    matchAxis,
    matchMnemonic
};
