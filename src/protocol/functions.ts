// ============= PURE FACTORIAL =============

// Pure factorial using recursion (tail-call optimized)
export const factorial = (n: number): number => {
    if (n < 0) throw new Error('Factorial undefined for negative numbers');
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
};

// Iterative factorial (pure, no recursion)
export const factorialIterative = (n: number): number => {
    if (n < 0) throw new Error('Factorial undefined for negative numbers');
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
};

// Bit-wise factorial using bit operations (for n <= 12)
export const factorialBitwise = (n: number): number => {
    if (n < 0) throw new Error('Factorial undefined for negative numbers');
    if (n === 0 || n === 1) return 1;

    // Use bit shifting for multiplication by powers of 2
    // 2! = 2, 3! = 6, 4! = 24, 5! = 120, 6! = 720, 7! = 5040
    const factTable = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600];
    return factTable[n] || factorial(n);
};

// ============= PURE POLYNOMIAL ORDERS =============

// Generate polynomial coefficients for a given order
export const generateCoefficients = (n: number): number[] => {
    if (n < 0) throw new Error('Order must be non-negative');
    const coeffs: number[] = new Array(n + 1).fill(0);
    coeffs[n] = 1; // Leading coefficient is 1
    return coeffs;
};

// Format polynomial as string
export const formatPolynomial = (coefficients: number[]): string => {
    const terms: string[] = [];
    const n = coefficients.length - 1;

    for (let i = n; i >= 0; i--) {
        const coeff = coefficients[i];
        if (coeff === 0) continue;

        let term = coeff === 1 ? '' : coeff.toString();
        if (i === 0) {
            term += coeff === 1 ? '1' : '';
        } else if (i === 1) {
            term += 'x';
        } else {
            term += `x^${i}`;
        }
        terms.push(term || '1');
    }

    return terms.length > 0 ? terms.join(' + ') : '0';
};

// Church numeral encoding (pure)
export const churchNumeral = (n: number): string => {
    if (n === 0) return 'λf.λx.x'; // 0
    if (n === 1) return 'λf.λx.f x'; // 1
    return `λf.λx.f${' (f'.repeat(n - 1)} x${')'.repeat(n - 1)}`; // n
};

// Octonion basis (pure)
export const octonionBasis = (n: number): string => {
    if (n === 0) return '1';
    if (n >= 1 && n <= 7) return `e${n}`;
    throw new Error('Octonion basis must be 0..7');
};

// Generate filename (pure)
export const generateFilename = (n: number): string => {
    const seed = n === 0 ? 'seed' : `${n - 1}→${n === 7 ? 0 : n + 1}`;
    return `polynomial-${n}_dimension-${n}_selfref-${seed}.jsonl`;
};

// Complete polynomial order creation (pure)
export const createPolynomialOrder = (n: number) => {
    if (n < 0 || n > 7) throw new Error('Order must be 0..7');

    const coefficients = generateCoefficients(n);
    const polynomial = formatPolynomial(coefficients);

    return {
        order: n,
        dimensionality: n,
        polynomial: polynomial,
        coefficients: coefficients,
        church: churchNumeral(n),
        octonion: octonionBasis(n),
        file: generateFilename(n),
        // Additional properties
        factorial: factorial(n),
        binary: n.toString(2),
        hex: n.toString(16).toUpperCase()
    };
};

// Create all orders 0..7 (pure)
export const createAllPolynomialOrders = (): ReturnType<typeof createPolynomialOrder>[] => {
    const orders: ReturnType<typeof createPolynomialOrder>[] = [];
    for (let n = 0; n <= 7; n++) {
        orders.push(createPolynomialOrder(n));
    }
    return orders;
};

// ============= FANO PLANE MULTIPLICATION (PURE) =============

// Fano plane lines (points 1..7)
const FANO_LINES: [number, number, number][] = [
    [1, 2, 3],
    [1, 4, 5],
    [1, 6, 7],
    [2, 4, 6],
    [2, 5, 7],
    [3, 4, 7],
    [3, 5, 6]
];

// Find Fano line containing two points (pure)
export const findFanoLine = (i: number, j: number): [number, number, number] | null => {
    if (i === j) return null;
    for (const line of FANO_LINES) {
        if (line.includes(i) && line.includes(j)) {
            return line;
        }
    }
    return null;
};

// Get third point on Fano line (pure)
export const getThirdPoint = (i: number, j: number): number | null => {
    const line = findFanoLine(i, j);
    if (!line) return null;
    return line.find(p => p !== i && p !== j) || null;
};

// Fano multiplication (pure)
export const fanoMultiply = (i: number, j: number): [number, number] => {
    if (i === 0) return [1, j]; // 1 * ej = ej
    if (j === 0) return [1, i]; // ei * 1 = ei
    if (i === j) return [-1, 0]; // ei * ei = -1

    const third = getThirdPoint(i, j);
    if (third === null) return [0, 0]; // Not on same Fano line

    // Determine sign: orientation of (i, j, third)
    // If (i, j, third) is cyclic in the line, result is positive
    const line = findFanoLine(i, j)!;
    const idx = line.indexOf(i);
    const nextIdx = (idx + 1) % 3;
    const next = line[nextIdx];

    const sign = next === j ? 1 : -1;
    return [sign, third];
};

// ============= OCTONION MULTIPLICATION TABLE =============

// Generate full octonion multiplication table (pure)
export const generateOctonionTable = (): [number, number][][] => {
    const table: [number, number][][] = [];

    for (let i = 0; i < 8; i++) {
        table[i] = [];
        for (let j = 0; j < 8; j++) {
            table[i][j] = fanoMultiply(i, j);
        }
    }

    return table;
};

// Get multiplication result (pure)
export const octonionMultiply = (i: number, j: number): [number, number] => {
    return fanoMultiply(i, j);
};

// ============= BIT-WISE OPERATIONS FOR OCTONIONS =============

// Pack octonion result into a single number (pure)
export const packOctonion = (sign: number, index: number): number => {
    // sign: 0 for positive, 1 for negative
    // index: 0..7
    return (sign << 3) | index;
};

// Unpack octonion result (pure)
export const unpackOctonion = (packed: number): [number, number] => {
    const sign = (packed >> 3) & 1;
    const index = packed & 7;
    return [sign === 0 ? 1 : -1, index];
};

// Octonion multiplication using bit operations (pure)
export const octonionMultiplyBitwise = (i: number, j: number): number => {
    if (i === 0) return packOctonion(0, j); // 1 * ej = ej
    if (j === 0) return packOctonion(0, i); // ei * 1 = ei
    if (i === j) return packOctonion(1, 0); // ei * ei = -1

    const third = getThirdPoint(i, j);
    if (third === null) return packOctonion(0, 0); // Not on Fano line

    const line = findFanoLine(i, j)!;
    const idx = line.indexOf(i);
    const nextIdx = (idx + 1) % 3;
    const next = line[nextIdx];
    const sign = next === j ? 0 : 1; // 0 for positive, 1 for negative

    return packOctonion(sign, third);
};

// ============= NESTED TUPLE POLYNOMIALS =============

// Create nested tuple representation of polynomial (pure)
export const polynomialToTuple = (coefficients: number[]): any => {
    if (coefficients.length === 0) return null;
    if (coefficients.length === 1) return coefficients[0];

    const head = coefficients[0];
    const rest = coefficients.slice(1);

    // Tuple: [head, polynomialToTuple(rest)]
    return [head, polynomialToTuple(rest)];
};

// Create nested tuple with degree (pure)
export const polynomialToTupleWithDegree = (coefficients: number[]): any => {
    const degree = coefficients.length - 1;
    const tuple = polynomialToTuple(coefficients);
    return [degree, tuple];
};

// Flatten tuple back to coefficients (pure)
export const tupleToPolynomial = (tuple: any): number[] => {
    if (typeof tuple === 'number') return [tuple];
    if (!Array.isArray(tuple)) return [];

    const [head, rest] = tuple;
    if (rest === null || rest === undefined) return [head];

    return [head, ...tupleToPolynomial(rest)];
};

// ============= FACTORIAL-BASED POLYNOMIAL GENERATION =============

// Generate polynomial from factorial basis (pure)
export const factorialPolynomial = (n: number): number[] => {
    const coeffs: number[] = [];
    for (let k = 0; k <= n; k++) {
        coeffs.push(factorial(n) / (factorial(k) * factorial(n - k)));
    }
    return coeffs;
};

// Generate polynomial from bitwise operations (pure)
export const factorialPolynomialBitwise = (n: number): number[] => {
    const coeffs: number[] = [];
    const factN = factorialBitwise(n);

    for (let k = 0; k <= n; k++) {
        const factK = factorialBitwise(k);
        const factNK = factorialBitwise(n - k);
        coeffs.push(factN / (factK * factNK));
    }
    return coeffs;
};

// ============= COMPOSITION FUNCTIONS =============

// Compose two polynomials (pure)
export const composePolynomials = (p: number[], q: number[]): number[] => {
    const result: number[] = new Array(p.length * q.length).fill(0);

    for (let i = 0; i < p.length; i++) {
        for (let j = 0; j < q.length; j++) {
            result[i + j] += p[i] * q[j];
        }
    }

    return result;
};

// Compose with factorial basis (pure)
export const composeFactorialPolynomials = (p: number[], q: number[]): number[] => {
    // Scale coefficients by factorials
    const scaledP = p.map((coeff, i) => coeff * factorial(i));
    const scaledQ = q.map((coeff, i) => coeff * factorial(i));

    const composed = composePolynomials(scaledP, scaledQ);

    // Unscale by factorials
    return composed.map((coeff, i) => coeff / factorial(i));
};

// ============= DEMONSTRATION =============

export const demonstrate = (): void => {
    console.log('=== PURE FUNCTIONAL POLYNOMIAL ORDERS ===\n');

    // 1. Factorials
    console.log('Factorials (0..7):');
    for (let n = 0; n <= 7; n++) {
        console.log(`  ${n}! = ${factorial(n)}`);
    }
    console.log();

    // 2. Polynomial orders
    console.log('Polynomial Orders (0..7):');
    const orders = createAllPolynomialOrders();
    orders.forEach(order => {
        console.log(`  f${order.order}(x) = ${order.polynomial}`);
        console.log(`    Coefficients: [${order.coefficients.join(', ')}]`);
        console.log(`    Church: ${order.church}`);
        console.log(`    Octonion: ${order.octonion}`);
        console.log(`    File: ${order.file}`);
        console.log(`    Factorial: ${order.factorial}`);
        console.log();
    });

    // 3. Octonion table
    console.log('Octonion Multiplication Table (Fano plane):');
    const table = generateOctonionTable();
    console.log('      e0  e1  e2  e3  e4  e5  e6  e7');
    for (let i = 0; i < 8; i++) {
        let row = `e${i}` + ' '.repeat(3 - i.toString().length);
        for (let j = 0; j < 8; j++) {
            const [sign, idx] = table[i][j];
            let cell = '';
            if (i === 0 && j === 0) cell = ' 1 ';
            else if (sign === 0 && idx === 0) cell = ' 0 ';
            else if (sign === -1 && idx === 0) cell = '-1 ';
            else cell = `${sign === -1 ? '-' : ' '}e${idx}`;
            row += ' '.repeat(4 - cell.length) + cell;
        }
        console.log(row);
    }
    console.log();

    // 4. Nested tuple polynomials
    console.log('Nested Tuple Polynomials:');
    orders.forEach(order => {
        const tuple = polynomialToTuple(order.coefficients);
        console.log(`  f${order.order}(x) -> ${JSON.stringify(tuple)}`);
    });
    console.log();

    // 5. Factorial polynomials
    console.log('Factorial-based Polynomials:');
    for (let n = 0; n <= 4; n++) {
        const coeffs = factorialPolynomial(n);
        console.log(`  ${n}! expansion: [${coeffs.join(', ')}]`);
    }
    console.log();

    // 6. Composition example
    console.log('Polynomial Composition:');
    const p = [1, 2, 1]; // x^2 + 2x + 1 = (x+1)^2
    const q = [1, -1];   // x - 1
    const composed = composePolynomials(p, q);
    console.log(`  (x^2 + 2x + 1) ∘ (x - 1) = ${formatPolynomial(composed)}`);

    const factorialComposed = composeFactorialPolynomials(p, q);
    console.log(`  Factorial composition: ${formatPolynomial(factorialComposed)}`);

    // 7. Bitwise operations
    console.log('\nBit-wise Operations:');
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const packed = octonionMultiplyBitwise(i, j);
            const [sign, idx] = unpackOctonion(packed);
            if (i === 0 && j === 0) continue;
            if (sign === 0 && idx === 0) continue;
            const signChar = sign === -1 ? '-' : '';
            console.log(`  e${i} × e${j} = ${signChar}e${idx} (packed: ${packed.toString(2).padStart(4, '0')})`);
        }
        if (i < 7) console.log();
    }
};

// ============= EXPORTS =============

export default {
    factorial,
    factorialIterative,
    factorialBitwise,
    generateCoefficients,
    formatPolynomial,
    createPolynomialOrder,
    createAllPolynomialOrders,
    generateOctonionTable,
    octonionMultiply,
    octonionMultiplyBitwise,
    packOctonion,
    unpackOctonion,
    polynomialToTuple,
    tupleToPolynomial,
    factorialPolynomial,
    factorialPolynomialBitwise,
    composePolynomials,
    composeFactorialPolynomials,
    demonstrate
};

// Run demonstration
if (require.main === module) {
    demonstrate();
}
