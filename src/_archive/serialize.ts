// CSSOM Serialization Rules for OMI Protocol Constants
// Implements the Common Serializing Idioms from the CSS specification

const CSS_OMI_CONSTANTS = {
    // Character code points
    NULL: 0x0000,
    REPLACEMENT_CHARACTER: 0xFFFD,
    BACKSLASH: 0x005C,
    DOUBLE_QUOTE: 0x0022,
    SPACE: 0x0020,
    HYPHEN_MINUS: 0x002D,
    UNDERSCORE: 0x005F,

    // Ranges
    CONTROL_LOW: 0x0001,
    CONTROL_HIGH: 0x001F,
    DELETE_CHAR: 0x007F,
    DIGIT_START: 0x0030,
    DIGIT_END: 0x0039,
    UPPER_START: 0x0041,
    UPPER_END: 0x005A,
    LOWER_START: 0x0061,
    LOWER_END: 0x007A,
    NON_ASCII_START: 0x0080,
};

function escapeCharacter(char) {
    const codePoint = typeof char === 'string' ? char.codePointAt(0) : char;
    return String.fromCodePoint(CSS_OMI_CONSTANTS.BACKSLASH) + String.fromCodePoint(codePoint);
}

function escapeAsCodePoint(char) {
    const codePoint = typeof char === 'string' ? char.codePointAt(0) : char;
    const hex = codePoint.toString(16).toLowerCase();
    return String.fromCodePoint(CSS_OMI_CONSTANTS.BACKSLASH) + hex + ' ';
}

function serializeIdentifier(identifier) {
    let result = '';
    const chars = Array.from(identifier);
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const codePoint = char.codePointAt(0);

        if (codePoint === CSS_OMI_CONSTANTS.NULL) {
            result += String.fromCodePoint(CSS_OMI_CONSTANTS.REPLACEMENT_CHARACTER);
        } else if (
            (codePoint >= CSS_OMI_CONSTANTS.CONTROL_LOW && codePoint <= CSS_OMI_CONSTANTS.CONTROL_HIGH) ||
            codePoint === CSS_OMI_CONSTANTS.DELETE_CHAR
        ) {
            result += escapeAsCodePoint(char);
        } else if (
            i === 0 &&
            codePoint >= CSS_OMI_CONSTANTS.DIGIT_START &&
            codePoint <= CSS_OMI_CONSTANTS.DIGIT_END
        ) {
            result += escapeAsCodePoint(char);
        } else if (
            i === 1 &&
            codePoint >= CSS_OMI_CONSTANTS.DIGIT_START &&
            codePoint <= CSS_OMI_CONSTANTS.DIGIT_END &&
            chars[0] === String.fromCodePoint(CSS_OMI_CONSTANTS.HYPHEN_MINUS)
        ) {
            result += escapeAsCodePoint(char);
        } else if (
            i === 0 &&
            char === String.fromCodePoint(CSS_OMI_CONSTANTS.HYPHEN_MINUS) &&
            chars.length === 1
        ) {
            result += escapeCharacter(char);
        } else if (
            codePoint >= CSS_OMI_CONSTANTS.NON_ASCII_START ||
            char === String.fromCodePoint(CSS_OMI_CONSTANTS.HYPHEN_MINUS) ||
            char === String.fromCodePoint(CSS_OMI_CONSTANTS.UNDERSCORE) ||
            (codePoint >= CSS_OMI_CONSTANTS.DIGIT_START && codePoint <= CSS_OMI_CONSTANTS.DIGIT_END) ||
            (codePoint >= CSS_OMI_CONSTANTS.UPPER_START && codePoint <= CSS_OMI_CONSTANTS.UPPER_END) ||
            (codePoint >= CSS_OMI_CONSTANTS.LOWER_START && codePoint <= CSS_OMI_CONSTANTS.LOWER_END)
        ) {
            result += char;
        } else {
            result += escapeCharacter(char);
        }
    }
    return result;
}

function serializeString(str) {
    let result = String.fromCodePoint(CSS_OMI_CONSTANTS.DOUBLE_QUOTE);
    const chars = Array.from(str);
    for (const char of chars) {
        const codePoint = char.codePointAt(0);
        if (codePoint === CSS_OMI_CONSTANTS.NULL) {
            result += String.fromCodePoint(CSS_OMI_CONSTANTS.REPLACEMENT_CHARACTER);
        } else if (
            (codePoint >= CSS_OMI_CONSTANTS.CONTROL_LOW && codePoint <= CSS_OMI_CONSTANTS.CONTROL_HIGH) ||
            codePoint === CSS_OMI_CONSTANTS.DELETE_CHAR
        ) {
            result += escapeAsCodePoint(char);
        } else if (
            codePoint === CSS_OMI_CONSTANTS.DOUBLE_QUOTE ||
            codePoint === CSS_OMI_CONSTANTS.BACKSLASH
        ) {
            result += escapeCharacter(char);
        } else {
            result += char;
        }
    }
    result += String.fromCodePoint(CSS_OMI_CONSTANTS.DOUBLE_QUOTE);
    return result;
}

function serializeURL(url) {
    return 'url(' + serializeString(url) + ')';
}

function serializeLOCAL(local) {
    return 'local(' + serializeString(local) + ')';
}

function serializeCommaSeparatedList(list) {
    return list.join(', ');
}

function serializeWhitespaceSeparatedList(list) {
    return list.join(' ');
}

// Export for use with VTT serializer
const cssSerializer = {
    escapeCharacter,
    escapeAsCodePoint,
    serializeIdentifier,
    serializeString,
    serializeURL,
    serializeLOCAL,
    serializeCommaSeparatedList,
    serializeWhitespaceSeparatedList,
    constants: CSS_OMI_CONSTANTS,
};

export { cssSerializer };
// WebVTT Serializer for OMI Protocol Macros
// Serializes protocol component definitions into WebVTT cue payloads

function createVTTSerializer() {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    function toHex(buffer) {
        return Buffer.from(buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer).toString('hex');
    }

    function fromHex(hexString) {
        return Buffer.from(hexString, 'hex');
    }

    function escapeHTML(text) {
        return String(text).replace(/[&<>"]/g, c => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
        }[c]));
    }

    function formatTimestamp(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const secWhole = Math.floor(secs);
        const millis = Math.floor((secs - secWhole) * 1000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secWhole).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
    }

    function serializeComponent(component, startTime, endTime, cueNumber) {
        const { name, buffer, tags = [] } = component;
        const hex = toHex(buffer);
        const tagText = tags.length > 0
            ? tags.map(t => `<c.omi-${escapeHTML(t)}>`).join('') + hex + tags.map(() => '</c>').join('')
            : hex;
        return `${cueNumber}\n${formatTimestamp(startTime)} --> ${formatTimestamp(endTime)}\n${tagText}\n`;
    }

    function serializeMacro(macro) {
        const cues = [];
        macro.components.forEach((component, i) => {
            const start = macro.startTime + i * 0.5;
            const end = start + 0.5;
            cues.push(serializeComponent(component, start, end, i + 1));
        });
        return 'WEBVTT\n\n' + cues.join('\n');
    }

    function parseCuePayload(payload) {
        // Remove custom class tags
        const hex = payload.replace(/<c\.omi-[^>]*>|<\/c>/g, '');
        return fromHex(hex);
    }

    function deserializeMacro(vttString) {
        const lines = vttString.split('\n');
        const components = [];
        let currentName = '';
        let currentBuffer = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('WEBVTT') || line === '') continue;
            if (line.includes('-->')) {
                currentName = `component_${components.length}`;
                // Next line is payload
                if (i + 1 < lines.length) {
                    const payload = lines[i + 1];
                    currentBuffer = parseCuePayload(payload);
                    components.push({ name: currentName, buffer: currentBuffer });
                }
            }
        }
        return { components };
    }

    return {
        serializeMacro,
        deserializeMacro,
        serializeComponent,
    };
}

const vttSerializer = createVTTSerializer();

// Example usage
const macro = {
    startTime: 0,
    components: [
        { name: 'matrix', buffer: new Float64Array(6).buffer, tags: ['matrix'] },
        { name: 'rect', buffer: new Float64Array(4).buffer, tags: ['rect'] },
        { name: 'point', buffer: new Float64Array(3).buffer, tags: ['point'] },
        { name: 'shared512', buffer: new ArrayBuffer(64), tags: ['shared'] },
    ],
};

const vttString = vttSerializer.serializeMacro(macro);
console.log(vttString);

const parsed = vttSerializer.deserializeMacro(vttString);
console.log(parsed);
(() => {
    import { cssSerializer } from './css-serializer.js';

    const protoName = cssSerializer.serializeIdentifier('omi-matrix');
    const protoValue = cssSerializer.serializeString('60x²+16xy+4y²');
    const protoURL = cssSerializer.serializeURL('https://omi.protocol/matrix');

    const vttCue = `<c.${protoName}>${protoValue}</c>`;
    console.log(vttCue);

})();
