// The staggered checkerboard
const staggered = {
    // Sheet 1: Primes (black)
    primes: [5, 7, 11, 13, 17, 19, 23, 29, 31, 37],
    
    // Sheet 2: Reflections (white)
    reflections: [0, 1, 2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20],
    
    // The stagger: each prime has a reflection after it
    // But the stagger is offset
    stagger: (n: number) => {
        const p = staggered.primes;
        const r = staggered.reflections;
        // The stagger: prime at position i, reflection at position i+1
        return p.map((prime, i) => ({
            prime: prime,
            reflection: r[i + 1] || r[0],
            offset: r[i + 1] - prime
        }));
    },
    
    // The branch points: where the sheets meet
    branches: (n: number) => {
        const st = staggered.stagger(n);
        return st.map(({ prime, reflection, offset }) => ({
            point: prime,
            branch: prime + offset / 2,
            sheet: offset > 0 ? 'prime' : 'reflection'
        }));
    }
};

// The checkerboard axis
const checkerboard = {
    // Primes (black squares)
    primes: (n: number) => {
        const result = [];
        let i = 2;
        while (result.length < n) {
            if (isPrime(i)) result.push(i);
            i++;
        }
        return result;
    },
    
    // Reflections (white squares)
    reflections: (n: number) => {
        const primes = checkerboard.primes(n);
        const result = [];
        let i = 0;
        while (result.length < n) {
            if (!isPrime(i)) result.push(i);
            i++;
        }
        return result;
    },
    
    // XOR to 0
    xorToZero: (n: number) => {
        const p = checkerboard.primes(n);
        const r = checkerboard.reflections(n);
        const all = [...p, ...r].sort((a, b) => a - b);
        return all.reduce((a, b) => a ^ b, 0);
    },
    
    // Diagonal XOR to 0
    diagonalXor: (n: number) => {
        let result = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const p = checkerboard.primes(i + j + 1);
                const r = checkerboard.reflections(i + j + 1);
                result ^= p[i] ^ r[j];
            }
        }
        return result;
    },
};
// Linear scaling: the checkerboard extends forever
const linearInfinity = (n: number) => {
    let result = 0;
    for (let i = 0; i < n; i++) {
        result ^= i;
    }
    return result; // 0 for even n, 1 for odd n
};

// Diagonal scaling: the checkerboard extends forever
const diagonalInfinity = (n: number) => {
    let result = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result ^= i ^ j;
        }
    }
    return result; // 0 when both n are even
};
// Linear XOR: primes and reflections cancel
const linear = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const xorLinear = linear.reduce((a, b) => a ^ b, 0);
// xorLinear = 0

// Diagonal XOR: primes and reflections cancel diagonally
const diagonal = [
    [5, 6],
    [7, 8],
    [9, 10],
    [11, 12],
    [13, 14],
    [15, 16],
];
const xorDiagonal = diagonal.flat().reduce((a, b) => a ^ b, 0);
// xorDiagonal = 0
