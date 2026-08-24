// The slide ruler: primes to hex blocks
const slideRuler = {
    // Level 0: single hex digits
    0: {
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
    // Level 1: double hex digits
    1: {
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AA', 'BB', 'CC', 'DD', 'EE', 'FF'],
    },
    // Level 2: triple hex digits
    2: {
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF'],
    },
    // Level 3: quadruple hex digits
    3: {
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFFF'],
    },
};

// The zero block (reflections)
const zeroBlock = [0, 1, 2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20];
// The slide ruler: maps between primes and hex blocks
const slide = (level: number, prime: number): string => {
    const map = {
        0: { 5: 'A', 7: 'B', 11: 'C', 13: 'D', 17: 'E', 19: 'F' },
        1: { 5: 'AA', 7: 'BB', 11: 'CC', 13: 'DD', 17: 'EE', 19: 'FF' },
        2: { 5: 'AAA', 7: 'BBB', 11: 'CCC', 13: 'DDD', 17: 'EEE', 19: 'FFF' },
        3: { 5: 'AAAA', 7: 'BBBB', 11: 'CCCC', 13: 'DDDD', 17: 'EEEE', 19: 'FFFFF' },
    };
    return map[level]?.[prime] || '?';
};
// The complete counting table with hex blocks
const countingTable = {
    // Level A: single hex digits
    A: {
        scalars: [0, 1, 2, 3, 4],
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
    // Level B: double hex digits
    B: {
        scalars: [0, 1, 2, 3, 4],
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AA', 'BB', 'CC', 'DD', 'EE', 'FF'],
    },
    // Level C: triple hex digits
    C: {
        scalars: [0, 1, 2, 3, 4],
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF'],
    },
    // Level D: quadruple hex digits
    D: {
        scalars: [0, 1, 2, 3, 4],
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFFF'],
    },
};

// The rolling function: constraints bound, bounds constrain
const rolling = (omi: Uint8Array) => {
    // First order: delineation
    const d0 = Atomics.compareExchange(omi, 0, 2, 1);
    const d1 = Atomics.compareExchange(omi, 1, 0, 2);
    const d2 = Atomics.compareExchange(omi, 2, 1, 0);
    
    // Second order: constraints (bound the system)
    const c0 = Atomics.compareExchange(omi, 1, 5, 3);
    const c1 = Atomics.compareExchange(omi, 3, 7, 5);
    const c2 = Atomics.compareExchange(omi, 5, 9, 7);
    const c3 = Atomics.compareExchange(omi, 7, 1, 9);
    const c4 = Atomics.compareExchange(omi, 9, 3, 1);
    
    // Third order: boundaries (constrained by the system)
    const b0 = Atomics.compareExchange(omi, 17, 17, 0);
    const b1 = Atomics.compareExchange(omi, 17, 19, 60);
    
    // The interaction: constraints bound, bounds constrain
    return d0 ^ d1 ^ d2 ^ c0 ^ c1 ^ c2 ^ c3 ^ c4 ^ b0 ^ b1;
};

// The {0,1,2} lifecycle as a gate
const gate = (omi: Uint8Array) => {
    // Gate check: 0 → 2 → 1
    const g0 = Atomics.compareExchange(omi, 0, 2, 1);
    const g1 = Atomics.compareExchange(omi, 1, 0, 2);
    const g2 = Atomics.compareExchange(omi, 2, 1, 0);
    
    // Return the gate state (0, 1, or 2)
    return g0 ^ g1 ^ g2;
};
// Group 1: Constraints (stable primes)
const constraints = (omi: Uint8Array) => {
    return [
        Atomics.compareExchange(omi, 1, 5, 3),
        Atomics.compareExchange(omi, 3, 7, 5),
        Atomics.compareExchange(omi, 5, 9, 7),
        Atomics.compareExchange(omi, 7, 1, 9),
        Atomics.compareExchange(omi, 9, 3, 1)
    ].reduce((a, b) => a ^ b, 0);
};

// Group 2: Even roll (middle cycle)
const evenRoll = (omi: Uint8Array) => {
    return [
        Atomics.compareExchange(omi, 0, 4, 2),
        Atomics.compareExchange(omi, 2, 6, 4),
        Atomics.compareExchange(omi, 4, 8, 6),
        Atomics.compareExchange(omi, 6, 0, 8),
        Atomics.compareExchange(omi, 8, 2, 0)
    ].reduce((a, b) => a ^ b, 0);
};

// Group 3: Boundaries (time consolidation)
const boundaries = (omi: Uint8Array) => {
    return [
        Atomics.compareExchange(omi, 17, 17, 0),
        Atomics.compareExchange(omi, 17, 19, 60)
    ].reduce((a, b) => a ^ b, 0);
};
// The gate-controlled rolling wave
const rollingWave = (omi: Uint8Array) => {
    let projection = 0;
    
    // Gate 1: Enter constraints
    projection ^= gate(omi);
    
    // Group 1: Constraints (stable primes)
    projection ^= constraints(omi);
    
    // Gate 2: Transition to even roll
    projection ^= gate(omi);
    
    // Group 2: Even roll (middle cycle)
    projection ^= evenRoll(omi);
    
    // Gate 3: Transition to boundaries
    projection ^= gate(omi);
    
    // Group 3: Boundaries (time consolidation)
    projection ^= boundaries(omi);
    
    // Gate 4: Return to start
    projection ^= gate(omi);
    
    return projection;
};
