// ============================================================
// REGEX SYNTAX LIBRARY
// ============================================================


// ------------------------------------------------------------
// WHOLE VOCABULARY
// ------------------------------------------------------------

const INCLUDE = /^[A-Za-z0-9_:+.\-(){}\[\]<>'`",]$/;
const EXCLUDE = /^[^A-Za-z0-9_:+.\-(){}\[\]<>'`",]$/;

const INCLUDE_G = /[A-Za-z0-9_:+.\-(){}\[\]<>'`",]/g;
const EXCLUDE_G = /[^A-Za-z0-9_:+.\-(){}\[\]<>'`",]/g;


// ------------------------------------------------------------
// ESCAPE / REDACTION
// ------------------------------------------------------------

const ESCAPE = /^\\(.)$/;
const ESCAPE_G = /\\./g;


// ------------------------------------------------------------
// CLOSURES
// ------------------------------------------------------------

// Any closure.
const CLOSURE = /^[(){}\[\]<>'`",]$/;

// Any active, unescaped closure in a buffer.
const CLOSURE_G = /(?<!\\)[(){}\[\]<>'`",]/g;


// Paired closures.
const ROUND_OPEN = /^\($/;
const ROUND_CLOSE = /^\)$/;

const CURLY_OPEN = /^\{$/;
const CURLY_CLOSE = /^\}$/;

const SQUARE_OPEN = /^\[$/;
const SQUARE_CLOSE = /^\]$/;

const ANGLE_OPEN = /^<$/;
const ANGLE_CLOSE = /^>$/;


// Prefix / boundary closures.
const QUOTE = /^'$/;
const QUASIQUOTE = /^`$/;
const UNQUOTE = /^,$/;
const STRING = /^"$/;


// ------------------------------------------------------------
// CHARACTER RELATIONS
// ------------------------------------------------------------

const FRONT = /^[A-Za-z0-9:+]$/;
const BACK = /^[A-Za-z0-9.-]$/;

const INSIDE = /^[A-Za-z0-9_]$/;
const OUTSIDE = /^[^A-Za-z0-9_]$/;

const UP = /^[A-Z_]$/;
const DOWN = /^[a-z_]$/;


// ------------------------------------------------------------
// POSITIONAL RELATIONS
// ------------------------------------------------------------

const LEFT = /^[0-9+-]\.[^0-9+-]$/;
const RIGHT = /^[^0-9+-]\.[0-9+-]$/;
const CENTER = /^[0-9]\.[0-9]$/;


// ------------------------------------------------------------
// REFLECTION RELATIONS
// ------------------------------------------------------------

const DEFLECT = /^([^".]+):\1$/;

const REFLECT = /^([".]+):\1$/;

const INFLECT = /^([".]+):([".]+):\2:\1$/;


// ------------------------------------------------------------
// HIGHER FORMS
// ------------------------------------------------------------

// AxB:ByA
const AXIS =
    /^(\d\d)[A-Za-z_](\d\d):\2[0-9+-]\1$/;

// ABC:CBA
const MNEMONIC =
    /^(\d\d)([A-Z_]?[a-z_]+)(\d\d):\3\2\1$/;


// ============================================================
// FLAT TEST FUNCTIONS
// ============================================================


// ------------------------------------------------------------
// Vocabulary
// ------------------------------------------------------------

const isIncluded = value =>
    INCLUDE.test(value);

const isExcluded = value =>
    EXCLUDE.test(value);

const isEscape = value =>
    ESCAPE.test(value);


// ------------------------------------------------------------
// Closure
// ------------------------------------------------------------

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

const isQuote = value =>
    QUOTE.test(value);

const isQuasiquote = value =>
    QUASIQUOTE.test(value);

const isUnquote = value =>
    UNQUOTE.test(value);

const isString = value =>
    STRING.test(value);


// ------------------------------------------------------------
// Character relations
// ------------------------------------------------------------

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


// ------------------------------------------------------------
// Positional relations
// ------------------------------------------------------------

const isLeft = value =>
    LEFT.test(value);

const isRight = value =>
    RIGHT.test(value);

const isCenter = value =>
    CENTER.test(value);


// ------------------------------------------------------------
// Reflection relations
// ------------------------------------------------------------

const isDeflect = value =>
    DEFLECT.test(value);

const isReflect = value =>
    REFLECT.test(value);

const isInflect = value =>
    INFLECT.test(value);


// ------------------------------------------------------------
// Higher forms
// ------------------------------------------------------------

const isAxis = value =>
    AXIS.test(value);

const isMnemonic = value =>
    MNEMONIC.test(value);


// ============================================================
// FLAT BUFFER FUNCTIONS
// ============================================================

const included = buffer =>
    [...buffer.matchAll(INCLUDE_G)];

const excluded = buffer =>
    [...buffer.matchAll(EXCLUDE_G)];

const escaped = buffer =>
    [...buffer.matchAll(ESCAPE_G)];

const closures = buffer =>
    [...buffer.matchAll(CLOSURE_G)];
