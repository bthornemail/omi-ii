// Range declaration framework for WebVTT protocol components

function createProtocolDeclarations() {
    const declarations = [];

    function declareRange(name, operator, value) {
        const declaration = {
            feature: name,
            operator: operator,
            value: value,
            toString() {
                if (this.operator === 'between') {
                    return `(${this.value[0]} < ${this.feature} < ${this.value[1]})`;
                }
                return `(${this.feature} ${this.operator} ${this.value})`;
            },
            test(actualValue) {
                switch (this.operator) {
                    case '>':
                        return actualValue > this.value;
                    case '<':
                        return actualValue < this.value;
                    case '>=':
                        return actualValue >= this.value;
                    case '<=':
                        return actualValue <= this.value;
                    case '=':
                        return actualValue === this.value;
                    case 'between':
                        return actualValue > this.value[0] && actualValue < this.value[1];
                    default:
                        return false;
                }
            },
        };
        declarations.push(declaration);
        return declaration;
    }

    function createVTTDeclaration(feature, operator, value, startTime, endTime, cueNumber) {
        const decl = declareRange(feature, operator, value);
        const payload = `<c.omi-declaration>${decl.toString()}</c>`;
        return `${cueNumber}\n${formatTimestamp(startTime)} --> ${formatTimestamp(endTime)}\n${payload}\n`;
    }

    function formatTimestamp(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const secWhole = Math.floor(secs);
        const millis = Math.floor((secs - secWhole) * 1000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secWhole).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
    }

    function createDeclarationMacro(declarationList) {
        const cues = [];
        declarationList.forEach((decl, i) => {
            const start = i * 0.5;
            const end = start + 0.5;
            cues.push(createVTTDeclaration(decl.feature, decl.operator, decl.value, start, end, i + 1));
        });
        return 'WEBVTT\n\n' + cues.join('\n');
    }

    function parseDeclarationCue(payload) {
        const text = payload.replace(/<c\.omi-declaration>|<\/c>/g, '');
        const match = text.match(/\((\S+)\s+([<>]=?|=)\s+(\S+)\)|\((\S+)\s+<\s+(\S+)\s+<\s+(\S+)\)/);
        if (!match) return null;
        if (match[1]) {
            return {
                feature: match[1],
                operator: match[2],
                value: parseFloat(match[3]),
            };
        } else {
            return {
                feature: match[4],
                operator: 'between',
                value: [parseFloat(match[5]), parseFloat(match[6])],
            };
        }
    }

    function testDeclarations(declarations, context) {
        const results = {};
        declarations.forEach((decl, i) => {
            results[decl.feature || `decl_${i}`] = decl.test(context[decl.feature]);
        });
        return results;
    }

    return {
        declareRange,
        createVTTDeclaration,
        createDeclarationMacro,
        parseDeclarationCue,
        testDeclarations,
        formatTimestamp,
    };
};

function main() {

    const protocolDecl = createProtocolDeclarations();

    // Example: declare ranges for protocol components
    const decl1 = protocolDecl.declareRange('matrix_width', '>=', 6);
    const decl2 = protocolDecl.declareRange('rect_width', 'between', [2, 64]);
    const decl3 = protocolDecl.declareRange('shared512', '=', 64);

    // Create WebVTT declaration macro
    const macro = protocolDecl.createDeclarationMacro([decl1, decl2, decl3]);
    console.log(macro);

    // Test against actual component values
    const actualContext = {
        matrix_width: 6,
        rect_width: 32,
        shared512: 64,
    };
    const testResults = protocolDecl.testDeclarations([decl1, decl2, decl3], actualContext);
    console.log('Test results:', testResults);
};

if (import.meta.main) main();
