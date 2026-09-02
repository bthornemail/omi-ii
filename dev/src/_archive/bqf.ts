export function quadratic(
    x: bigint,
    y: bigint
) {
    const direct =
        60n * x * x +
        16n * x * y +
        4n * y * y;

    const diagonal = 2n * x + y;

    const resolved =
        44n * x * x +
        4n * diagonal * diagonal;

    return {
        x,
        y,
        diagonal,
        direct,
        resolved,
        equal: direct === resolved
    } as const;
}
export const VECTORS = [
    [331n, 332n, 333n],
    [362n, 363n, 364n],
    [403n, 404n, 405n],
    [422n, 423n, 424n, 425n],
    [823n, 824n, 825n],
    [337n, 737n, 733n],
    [119n, 919n, 911n]
] as const satisfies ReadonlyArray<readonly bigint[]>;

export function original(
    x: bigint,
    y: bigint
): bigint {
    return (
        60n * x * x +
        16n * x * y +
        4n * y * y
    );
}

export function diagonalForm(
    x: bigint,
    y: bigint
): bigint {
    const diagonal = 2n * x + y;

    return (
        44n * x * x +
        4n * diagonal * diagonal
    );
}

export function xorVector(
    vector: readonly bigint[]
): bigint {
    return vector.reduce(
        (delta, value) => delta ^ value,
        0n
    );
}


export function isPrime(n: bigint): boolean {
    if (n < 2n) return false;
    if (n === 2n) return true;
    if (n % 2n === 0n) return false;

    for (
        let divisor = 3n;
        divisor * divisor <= n;
        divisor += 2n
    ) {
        if (n % divisor === 0n) {
            return false;
        }
    }

    return true;
}
export function sumPrimeXor(
    primes: readonly bigint[]
): bigint {
    return primes.reduce(
        (sum, prime) => sum + (100n ^ prime),
        0n
    );
}
(() => {

    const PRIME_EXPECTATIONS = new Map<bigint, boolean>([
        [17n, true],
        [19n, true],

        [337n, true],
        [37n, true],
        [737n, false],
        [733n, true],

        [119n, false],
        [919n, true],
        [911n, true]
    ]);

    for (const [value, expected] of PRIME_EXPECTATIONS) {
        const actual = isPrime(value);

        if (actual !== expected) {
            throw new Error(
                `Primality failure for ${value}: ` +
                `expected ${expected}, received ${actual}`
            );
        }
    }
    export const VECTORS = [
        [331n, 332n, 333n],
        [362n, 363n, 364n],
        [403n, 404n, 405n],
        [422n, 423n, 424n, 425n],
        [823n, 824n, 825n],
        [337n, 737n, 733n],
        [119n, 919n, 911n]
    ] as const satisfies ReadonlyArray<
        readonly bigint[]
    >;
    export const VECTORS2 = [
        [331n, 332n, 333n],
        [362n, 363n, 364n],
        [403n, 404n, 405n],
        [422n, 423n, 424n, 425n],
        [823n, 824n, 825n],
        [719n, 757n, 791n],
        [991n, 919n, 911n]
    ] as const;
    for (const vector of VECTORS) {
        for (
            let index = 0;
            index + 1 < vector.length;
            index++
        ) {
            const x = vector[index];
            const y = vector[index + 1];

            const direct = original(x, y);
            const diagonal = diagonalForm(x, y);

            if (direct !== diagonal) {
                throw new Error(
                    `Quadratic identity failed at (${x}, ${y})`
                );
            }
        }
    }


})();
