// CSS.escape() method as a pure function for use in bind()
function cssEscape(ident) {
    const NULL = 0x0000;
    const REPLACEMENT = 0xFFFD;
    const BACKSLASH = 0x005C;
    const DOUBLE_QUOTE = 0x0022;
    const SPACE = 0x0020;
    const HYPHEN = 0x002D;
    const UNDERSCORE = 0x005F;
    const CONTROL_LOW = 0x0001;
    const CONTROL_HIGH = 0x001F;
    const DELETE = 0x007F;
    const DIGIT_START = 0x0030;
    const DIGIT_END = 0x0039;
    const UPPER_START = 0x0041;
    const UPPER_END = 0x005A;
    const LOWER_START = 0x0061;
    const LOWER_END = 0x007A;
    const NON_ASCII = 0x0080;

    function escapeChar(char) {
        return String.fromCodePoint(BACKSLASH) + char;
    }

    function escapeCodePoint(char) {
        const codePoint = char.codePointAt(0);
        const hex = codePoint.toString(16).toLowerCase();
        return String.fromCodePoint(BACKSLASH) + hex + String.fromCodePoint(SPACE);
    }

    const chars = Array.from(String(ident));
    let result = '';

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const codePoint = char.codePointAt(0);

        if (codePoint === NULL) {
            result += String.fromCodePoint(REPLACEMENT);
        } else if (
            (codePoint >= CONTROL_LOW && codePoint <= CONTROL_HIGH) ||
            codePoint === DELETE
        ) {
            result += escapeCodePoint(char);
        } else if (
            i === 0 &&
            codePoint >= DIGIT_START &&
            codePoint <= DIGIT_END
        ) {
            result += escapeCodePoint(char);
        } else if (
            i === 1 &&
            codePoint >= DIGIT_START &&
            codePoint <= DIGIT_END &&
            chars[0] === String.fromCodePoint(HYPHEN)
        ) {
            result += escapeCodePoint(char);
        } else if (
            i === 0 &&
            char === String.fromCodePoint(HYPHEN) &&
            chars.length === 1
        ) {
            result += escapeChar(char);
        } else if (
            codePoint >= NON_ASCII ||
            char === String.fromCodePoint(HYPHEN) ||
            char === String.fromCodePoint(UNDERSCORE) ||
            (codePoint >= DIGIT_START && codePoint <= DIGIT_END) ||
            (codePoint >= UPPER_START && codePoint <= UPPER_END) ||
            (codePoint >= LOWER_START && codePoint <= LOWER_END)
        ) {
            result += char;
        } else {
            result += escapeChar(char);
        }
    }

    return result;
}

// Bind function with switch for export modes
function bind(coordinate = Buffer.alloc(8), context = Buffer.alloc(256)) {
    return function apply(rule, fact, mode = 'raw', contextBuffer = context) {
        switch (mode) {
            case 'css':
                return cssEscape(coordinate.toString('hex'));
            case 'css-string':
                return '"' + cssEscape(coordinate.toString('hex')) + '"';
            case 'css-url':
                return 'url("' + cssEscape(coordinate.toString('hex')) + '")';
            case 'css-local':
                return 'local("' + cssEscape(coordinate.toString('hex')) + '")';
            case 'css-selector':
                return '#' + cssEscape(coordinate.toString('hex'));
            case 'raw':
            default:
                return coordinate;
        }
    };
}

// Export
export { bind, cssEscape };
