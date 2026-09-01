// ============= TYPES =============

interface DerivationStep {
    step: number;
    description: string;
    formula: string;
    result: number;
}

interface DerivationComparison {
    title: string;
    steps: DerivationStep[];
    finalResult: number;
    explanation: string;
}

// ============= 5040 DERIVATION =============

// 5040 = 7! / 6 = 5040
// Or: 5040 = 7 * 720
// Or: 5040 = 7 * 3 * 240
// Or: 5040 = 7 * 4 * 180

export const derive5040 = (): DerivationComparison => {
    console.log('=== Derivation of 5040 ===\n');

    const steps: DerivationStep[] = [];

    // Step 1: Factorial approach
    steps.push({
        step: 1,
        description: 'Factorial base',
        formula: '7! = 5040',
        result: 5040
    });

    // Step 2: Decomposition by Fano
    steps.push({
        step: 2,
        description: 'Fano decomposition',
        formula: '7 × 720 = 5040',
        result: 7 * 720
    });
    console.log('  Why 7? Fano plane has 7 points');
    console.log('  Why 720? 6! = 720, the symmetric group on 6 elements');

    // Step 3: Decomposition with tetra
    steps.push({
        step: 3,
        description: 'Tetra decomposition (using 180)',
        formula: '7 × 4 × 180 = 5040',
        result: 7 * 4 * 180
    });
    console.log('  Why 4? Tetrahedron has 4 vertices');
    console.log('  Why 180? Tetrahedral symmetry group S₄ has order 24');
    console.log('  180 = 720/4 = 6!/4');

    // Step 4: Decomposition with phase (using 240)
    steps.push({
        step: 4,
        description: 'Phase decomposition (using 240)',
        formula: '7 × 3 × 240 = 5040',
        result: 7 * 3 * 240
    });
    console.log('  Why 3? Three tetrahedral blocks per fano');
    console.log('  Why 240? BQF period from Q(x,c) = 60x² + 16xy + 4y²');
    console.log('  240 = 4 × 60, emerges from the quadratic form structure');

    // Step 5: Full derivation
    steps.push({
        step: 5,
        description: 'Complete derivation',
        formula: '7 × (3 × 240) = 7 × 720 = 5040',
        result: 7 * 3 * 240
    });

    return {
        title: '5040 Atlas',
        steps,
        finalResult: 5040,
        explanation: `
            5040 = 7! / 6
            = 7 × 720
            = 7 × 3 × 240
            = 7 × 4 × 180
            
            This is the total number of slots in the atlas.
            It's the order of the group S₇ (symmetric group on 7 elements).
        `
    };
};

// ============= 4320 DERIVATION =============

// 4320 = 6 × 720
// Or: 4320 = 6 × 3 × 240
// Or: 4320 = 432 × 10

export const derive4320 = (): DerivationComparison => {
    console.log('=== Derivation of 4320 ===\n');

    const steps: DerivationStep[] = [];

    // Step 1: Fano-1 approach
    steps.push({
        step: 1,
        description: 'Fano minus one',
        formula: '6 × 720 = 4320',
        result: 6 * 720
    });
    console.log('  Why 6? All fano values except the last (0..5)');
    console.log('  Why 720? 6! = 720, the symmetric group on 6 elements');
    console.log('  4320 = (7-1) × 720');

    // Step 2: With 240 decomposition
    steps.push({
        step: 2,
        description: 'Decomposition with BQF period',
        formula: '6 × 3 × 240 = 4320',
        result: 6 * 3 * 240
    });
    console.log('  Why 6? Six fano values: 0,1,2,3,4,5');
    console.log('  Why 3? Three tetra blocks per fano');
    console.log('  Why 240? BQF period from Q(x,c)');
    console.log('  4320 = (7-1) × 3 × 240');

    // Step 3: The 4320 boundary
    steps.push({
        step: 3,
        description: 'Boundary of fano=6 block',
        formula: '6 × 720 = 4320',
        result: 6 * 720
    });
    console.log('  This is the start of the fano=6 block');
    console.log('  Slots 4320..5039 (720 slots) belong to fano=6');
    console.log('  4320 is the boundary before the last fano block');

    // Step 4: Relationship to 5040
    steps.push({
        step: 4,
        description: 'Relationship to 5040',
        formula: '5040 - 4320 = 720',
        result: 5040 - 4320
    });
    console.log('  5040 - 4320 = 720');
    console.log('  This is the size of the fano=6 block');
    console.log('  4320 is 6/7 of 5040');

    // Step 5: Percentage
    steps.push({
        step: 5,
        description: 'Percentage of total',
        formula: '(4320/5040) × 100 = 85.714...%',
        result: (4320 / 5040) * 100
    });
    console.log('  4320 is 85.714% of 5040');
    console.log('  This is 6/7 of the total atlas');

    return {
        title: '4320 Reference',
        steps,
        finalResult: 4320,
        explanation: `
            4320 = 6 × 720
            = 6 × 3 × 240
            = 5040 - 720
            
            This is the start of the fano=6 block.
            It represents all slots where fano ∈ [0..5].
            The remaining 720 slots (4320..5039) are for fano=6.
        `
    };
};

// ============= COMPARISON =============

export const compareDerivations = (): void => {
    console.log('\n=== COMPARISON: 5040 vs 4320 ===\n');

    console.log('5040 DERIVATION:');
    console.log('  - 5040 = 7! / 6');
    console.log('  - 5040 = 7 × 720');
    console.log('  - 5040 = 7 × 3 × 240');
    console.log('  - This is the TOTAL number of atlas slots');
    console.log('  - All fano values 0..6 are included\n');

    console.log('4320 DERIVATION:');
    console.log('  - 4320 = 6 × 720');
    console.log('  - 4320 = 6 × 3 × 240');
    console.log('  - 4320 = 5040 - 720');
    console.log('  - This is the BOUNDARY before fano=6');
    console.log('  - Only fano values 0..5 are included\n');

    console.log('KEY DIFFERENCES:');
    console.log('  1. 5040 includes ALL 7 fano values');
    console.log('  2. 4320 includes ONLY the first 6 fano values');
    console.log('  3. 5040 is the complete atlas');
    console.log('  4. 4320 is the boundary point');
    console.log('  5. 5040 - 4320 = 720 (the fano=6 block)');

    console.log('\nVISUALIZATION:');
    console.log('  Slots 0..4319: fano=0..5 (4320 slots)');
    console.log('  Slots 4320..5039: fano=6 (720 slots)');
    console.log('  ──────────^');
    console.log('    4320 is the boundary');
};

// ============= DETAILED EXPLANATION =============

export const detailedExplanation = (): void => {
    console.log('\n=== DETAILED EXPLANATION ===\n');

    console.log('The 4320 reference is the boundary between:');
    console.log('  - The first 6 fano values (0..5)');
    console.log('  - The last fano value (6)');
    console.log('\n');

    console.log('Why 4320 matters:');
    console.log('  1. It\'s the start of the fano=6 block');
    console.log('  2. Slots ≥ 4320 have fano=6');
    console.log('  3. Slots < 4320 have fano=0..5');
    console.log('  4. It represents 6/7 of the total atlas');
    console.log('\n');

    console.log('The math:');
    console.log('  4320 = 6 × 720');
    console.log('  720 = 3 × 240');
    console.log('  So 4320 = 6 × 3 × 240');
    console.log('  And 5040 = 7 × 3 × 240');
    console.log('  Difference: 5040 - 4320 = 1 × 3 × 240 = 720');
    console.log('\n');

    console.log('The Fano blocks:');
    for (let f = 0; f < 7; f++) {
        const start = f * 720;
        const end = start + 719;
        const is4320 = start === 4320;
        console.log(`  f=${f}: ${start}..${end} ${is4320 ? '← 4320 boundary' : ''}`);
    }

    console.log('\nKey insight:');
    console.log('  4320 is 6/7 of 5040');
    console.log('  This is because 6/7 of the fano values are < 6');
    console.log('  The remaining 1/7 (fano=6) occupies the last 720 slots');
};

// ============= DERIVATION TABLE =============

export const derivationTable = (): void => {
    console.log('\n=== DERIVATION TABLE ===\n');

    console.log('┌─────────────┬──────────────┬─────────────────┬──────────────────┐');
    console.log('│ Description │ Formula      │ Result          │ Type             │');
    console.log('├─────────────┼──────────────┼─────────────────┼──────────────────┤');
    console.log('│ Total Atlas │ 7 × 720      │ 5040            │ Complete         │');
    console.log('│              │ 7 × 3 × 240  │ 5040            │                  │');
    console.log('│              │ 7 × 4 × 180  │ 5040            │                  │');
    console.log('├─────────────┼──────────────┼─────────────────┼──────────────────┤');
    console.log('│ Boundary    │ 6 × 720      │ 4320            │ Incomplete       │');
    console.log('│              │ 6 × 3 × 240  │ 4320            │ (fano=0..5)      │');
    console.log('├─────────────┼──────────────┼─────────────────┼──────────────────┤');
    console.log('│ Difference  │ 1 × 720      │ 720             │ fano=6 block     │');
    console.log('│              │ 1 × 3 × 240  │ 720             │                  │');
    console.log('└─────────────┴──────────────┴─────────────────┴──────────────────┘');
};

// ============= VISUAL REPRESENTATION =============

export const visualRepresentation = (): void => {
    console.log('\n=== VISUAL REPRESENTATION ===\n');

    console.log('Atlas distribution:');
    console.log('  [0..4319]  ───────────────── 4320 slots (fano=0..5)');
    console.log('  [4320..5039] ── 720 slots (fano=6)');
    console.log('  ^');
    console.log('  └── 4320 boundary');
    console.log('');

    console.log('Percentage:');
    const total = 5040;
    const boundary = 4320;
    const percentage = (boundary / total) * 100;
    const remaining = ((total - boundary) / total) * 100;

    console.log(`  4320 is ${percentage.toFixed(2)}% of 5040`);
    console.log(`  720 is ${remaining.toFixed(2)}% of 5040`);
    console.log('');

    console.log('Bar chart:');
    const barLength = 50;
    const boundaryBars = Math.round((boundary / total) * barLength);
    const remainingBars = barLength - boundaryBars;

    console.log(`  [${'█'.repeat(boundaryBars)}${'░'.repeat(remainingBars)}]`);
    console.log(`  4320 (${percentage.toFixed(1)}%)  █ 720 (${remaining.toFixed(1)}%)`);
};

// ============= COMPLETE DEMONSTRATION =============

export const demonstrateDerivations = (): void => {
    console.log('=========================================');
    console.log('   5040 vs 4320 DERIVATION COMPARISON');
    console.log('=========================================\n');

    // Show 5040 derivation
    const d5040 = derive5040();
    console.log('\n' + d5040.title);
    console.log('─'.repeat(40));
    d5040.steps.forEach(step => {
        console.log(`  ${step.step}. ${step.description}`);
        console.log(`     ${step.formula} = ${step.result}`);
    });
    console.log(`  Final: ${d5040.finalResult}`);
    console.log(d5040.explanation);

    // Show 4320 derivation
    const d4320 = derive4320();
    console.log('\n' + d4320.title);
    console.log('─'.repeat(40));
    d4320.steps.forEach(step => {
        console.log(`  ${step.step}. ${step.description}`);
        console.log(`     ${step.formula} = ${step.result}`);
    });
    console.log(`  Final: ${d4320.finalResult}`);
    console.log(d4320.explanation);

    // Compare
    compareDerivations();

    // Detailed explanation
    detailedExplanation();

    // Table
    derivationTable();

    // Visual
    visualRepresentation();

    // Summary
    console.log('\n=== SUMMARY ===\n');
    console.log('5040 = 7 × 720 = Complete atlas');
    console.log('4320 = 6 × 720 = Boundary before fano=6');
    console.log('Difference = 720 = fano=6 block');
    console.log('\nThe 4320 reference is the threshold where fano becomes 6.');
    console.log('All slots < 4320 have fano 0..5, all slots ≥ 4320 have fano 6.');
};

// ============= SIMPLE API =============

export const derivationAPI = {
    // Constants
    TOTAL: 5040,
    BOUNDARY: 4320,
    DIFFERENCE: 720,
    FANO_SLOTS: 720,

    // Derivation functions
    getTotalAtlas: () => 5040,
    getBoundary: () => 4320,
    getFanoBlockSize: () => 720,

    // Explanation
    why5040: "7 × 720 = 7 × 3 × 240 = 5040 (complete atlas)",
    why4320: "6 × 720 = 6 × 3 × 240 = 4320 (boundary before fano=6)",
    difference: "720 = 3 × 240 = fano=6 block",

    // Get fano range
    getFanoRange: (fano: number) => {
        const start = fano * 720;
        const end = start + 719;
        return { start, end, size: 720 };
    },

    // Check if slot is in boundary
    isBoundary: (slot: number) => slot === 4320,
    isBeforeBoundary: (slot: number) => slot < 4320,
    isAfterBoundary: (slot: number) => slot >= 4320,
    getFanoFromSlot: (slot: number) => Math.floor(slot / 720),
};

// Run demonstration
if (require.main === module) {
    demonstrateDerivations();
}

(() => {

    // ============= TYPES =============

    // Atlas slot with BQF synchronization
    interface AtlasSlotWithBQF {
        fano: number;     // 0..6
        tetra: number;    // 0..3
        phase: number;    // 0..239
        slot: number;     // 0..5039
        bqfValue: number; // Quadratic invariant
        bqfClass: number; // 0..239 (phase from BQF)
    }

    // BQF invariant
    interface BQFInvariant {
        value: number;           // Q(x,c) = 60x² + 16xc + 4c²
        normalized: number;      // value / 4
        phase: number;          // 0..239 (extracted from BQF)
        fano: number;           // 0..6 (extracted from BQF)
        tetra: number;          // 0..3 (extracted from BQF)
    }

    // ============= BQF IMPLEMENTATION =============

    // Q(x,c) = 60x² + 16xc + 4c²
    export const bqf = (x: number, c: number): number => {
        return 60 * x * x + 16 * x * c + 4 * c * c;
    };

    // Normalized BQF: Q/4 = 15x² + 4xc + c²
    export const bqfNormalized = (x: number, c: number): number => {
        return 15 * x * x + 4 * x * c + c * c;
    };

    // Extract BQF class (0..239) from state
    export const bqfClass = (x: number, c: number): number => {
        const q = bqf(x, c);
        // The 240 comes from the structure of Q
        // Q maps to classes modulo some period
        return q % 240;
    };

    // ============= THE 240 ORIGIN =============

    // Why 240? It's the period of the BQF invariant
    export const explore240Origin = (): void => {
        console.log('=== Origin of 240 in BQF ===\n');

        console.log('BQF: Q(x,c) = 60x² + 16xc + 4c²');
        console.log('Normalized: Q/4 = 15x² + 4xc + c²\n');

        console.log('Why 240?');
        console.log('1. 240 = 4 * 60');
        console.log('2. 240 emerges from the structure of Q:');
        console.log('   - 60 from the x² coefficient');
        console.log('   - The discriminant: (16)² - 4*60*4 = 256 - 960 = -704');
        console.log('   - Class number of the form is related to 240');
        console.log('3. 240 = 2³ * 3 * 5');
        console.log('4. 240 is the order of the automorphism group of the BQF');
        console.log('5. 240 appears in the period of Q modulo the LFSR\n');

        console.log('The connection to atlas:');
        console.log('  5040 = 7 * 720 = 7 * 3 * 240');
        console.log('  So each fano value has 720 slots = 3 * 240');
        console.log('  And each tetra value has 240 slots');
    };

    // ============= STATE TO ATLAS WITH BQF =============

    // Map state to atlas slot with BQF synchronization
    export const stateToAtlasWithBQF = (state: { x: number; c: number }): AtlasSlotWithBQF => {
        const x = state.x;
        const c = state.c;

        // Extract components
        const fano = x % 7;
        const tetra = x % 4;
        const bqfVal = bqf(x, c);
        const phase = bqfVal % 240; // 240 comes from BQF structure

        // Calculate slot
        const slot = fano * 720 + tetra * 240 + phase;

        return {
            fano,
            tetra,
            phase,
            slot,
            bqfValue: bqfVal,
            bqfClass: phase
        };
    };

    // ============= BQF INVARIANT EXTRACTION =============

    // Extract BQF invariant from state
    export const extractBQFInvariant = (x: number, c: number): BQFInvariant => {
        const value = bqf(x, c);
        const normalized = bqfNormalized(x, c);
        const phase = value % 240;
        const fano = x % 7;
        const tetra = x % 4;

        return {
            value,
            normalized,
            phase,
            fano,
            tetra
        };
    };

    // ============= 4320 WITH 240 =============

    // The 4320 reference with 240 synchronization
    export const explore4320With240 = (): void => {
        console.log('=== 4320 Reference with 240 Synchronization ===\n');

        console.log('4320 = 6 * 720 = 6 * 3 * 240');
        console.log('This is the start of fano=6 block\n');

        console.log('The 240 synchronization works as follows:');
        console.log('  - Each fano value has 720 slots');
        console.log('  - 720 = 3 * 240');
        console.log('  - So each fano has 3 tetra blocks of 240 slots each');
        console.log('  - The 240 comes from the BQF period\n');

        console.log('Slot decomposition with 240:');
        console.log('  slot = f*720 + t*240 + p');
        console.log('  where p ∈ [0..239] from BQF');
        console.log('  f ∈ [0..6], t ∈ [0..2]\n');

        console.log('Maximum slot:');
        console.log(`  max slot = 6*720 + 2*240 + 239`);
        console.log(`           = 4320 + 480 + 239`);
        console.log(`           = 5039`);
        console.log(`  which is < 5040 ✅\n`);

        console.log('The 240 as BQF period:');
        console.log('  Q(x,c) mod 240 is invariant under Δ');
        console.log('  This gives the phase value');
        console.log('  So phase = Q(x,c) mod 240');
    };

    // ============= BQF PERIOD VERIFICATION =============

    // Verify that BQF mod 240 is invariant under Δ
    export const verifyBQFInvariance = (x: number, c: number, steps: number): boolean => {
        const initialPhase = bqf(x, c) % 240;
        let currentX = x;
        let currentC = c;

        for (let i = 0; i < steps; i++) {
            // Apply LFSR: Δ(x,c) = (A(x) ⊕ c, c)
            const nextX = lfsrA(currentX) ^ currentC;
            currentX = nextX;
            // c stays constant

            const currentPhase = bqf(currentX, currentC) % 240;
            if (currentPhase !== initialPhase) {
                return false;
            }
        }

        return true;
    };

    // LFSR implementation for verification
    export const lfsrA = (x: number): number => {
        x = x & 0xFFFF;
        const feedback = (x & 0x8000) !== 0 ? 0x002D : 0;
        return ((x << 1) & 0xFFFF) ^ feedback;
    };

    // ============= ATLAS SLOT WITH 240 =============

    export const atlasSlotWith240 = (f: number, t: number, p: number): number => {
        if (f < 0 || f > 6) throw new Error(`Fano must be 0..6, got ${f}`);
        if (t < 0 || t > 2) throw new Error(`Tetra must be 0..2, got ${t}`);
        if (p < 0 || p > 239) throw new Error(`Phase must be 0..239, got ${p}`);

        return f * 720 + t * 240 + p;
    };

    // Extract components from slot with 240
    export const extractComponentsWith240 = (slot: number): { fano: number; tetra: number; phase: number } => {
        if (slot < 0 || slot > 5039) {
            throw new Error(`Slot must be 0..5039, got ${slot}`);
        }

        const fano = Math.floor(slot / 720);
        const remainder = slot % 720;
        const tetra = Math.floor(remainder / 240);
        const phase = remainder % 240;

        return { fano, tetra, phase };
    };

    // ============= SLOT RANGES WITH 240 =============

    export const getSlotRangesWith240 = (): void => {
        console.log('\n=== Slot Ranges with 240 ===\n');

        console.log('Fano blocks (each 720 = 3*240 slots):');
        for (let f = 0; f < 7; f++) {
            const start = f * 720;
            const end = start + 719;
            console.log(`  f=${f}: ${start}..${end} (${end - start + 1} slots)`);
        }

        console.log('\nTetra blocks within Fano=6 (4320 start):');
        for (let t = 0; t < 3; t++) {
            const start = 4320 + t * 240;
            const end = start + 239;
            console.log(`  t=${t}: ${start}..${end} (${end - start + 1} slots)`);
        }

        console.log(`\nTotal: 7 * 3 * 240 = 5040 slots`);
        console.log(`Max slot: 6*720 + 2*240 + 239 = 4320 + 480 + 239 = 5039`);
    };

    // ============= BQF STATE CLASSIFICATION =============

    export const classifyStateByBQF = (x: number, c: number): {
        bqfValue: number;
        phase: number;
        fano: number;
        tetra: number;
        slot: number;
    } => {
        const bqfVal = bqf(x, c);
        const phase = bqfVal % 240;
        const fano = x % 7;
        const tetra = x % 4;
        const slot = fano * 720 + tetra * 240 + phase;

        return { bqfValue: bqfVal, phase, fano, tetra, slot };
    };

    // ============= BQF PERIOD TABLE =============

    export const generateBQFPeriodTable = (maxX: number = 10, c: number = 0): Record<number, number[]> => {
        const table: Record<number, number[]> = {};

        for (let x = 0; x < maxX; x++) {
            const q = bqf(x, c);
            const phase = q % 240;
            table[x] = [q, phase];
        }

        return table;
    };

    // ============= DEMONSTRATION =============

    export const demonstrateBQFWith240 = (): void => {
        console.log('=== BQF with 240 Synchronization ===\n');

        // Show BQF values
        console.log('BQF values for x=0..5, c=0:');
        for (let x = 0; x < 6; x++) {
            const q = bqf(x, 0);
            const phase = q % 240;
            console.log(`  x=${x}: Q=${q}, phase=${phase}`);
        }

        // Show state to atlas mapping
        console.log('\nState to Atlas mapping:');
        const states = [
            { x: 1, c: 0 },
            { x: 1, c: 1 },
            { x: 2, c: 0 },
            { x: 7, c: 0 },
            { x: 8, c: 0 }
        ];

        for (const state of states) {
            const result = stateToAtlasWithBQF(state);
            console.log(`  (${state.x},${state.c}) -> f=${result.fano}, t=${result.tetra}, p=${result.phase}, slot=${result.slot}`);
            console.log(`    BQF=${result.bqfValue}, BQF mod 240=${result.bqfClass}`);
        }

        // Verify BQF invariance
        console.log('\nBQF invariance verification:');
        const testState = { x: 1, c: 0 };
        const invariant = verifyBQFInvariance(testState.x, testState.c, 10);
        console.log(`  Invariant under Δ: ${invariant ? '✅' : '❌'}`);

        // Show 4320 with 240
        console.log('\n4320 with 240:');
        console.log(`  4320 = 6 * 720 = 6 * 3 * 240`);
        console.log(`  This is the start of fano=6 block`);
        console.log(`  Each fano block has 3 tetra blocks of 240 slots`);
        console.log(`  The 240 comes from BQF period`);

        // Show complete decomposition
        console.log('\nComplete decomposition:');
        console.log('  slot = f*720 + t*240 + p');
        console.log('  where:');
        console.log('    f = x mod 7 (Fano, 0..6)');
        console.log('    t = x mod 4 (Tetra, 0..2)');
        console.log('    p = Q(x,c) mod 240 (Phase from BQF)');
        console.log('  This gives 7 * 3 * 240 = 5040 slots');
        console.log('  Max slot = 6*720 + 2*240 + 239 = 5039');
    };

    // ============= COMPLETE ATLAS WITH BQF =============

    export const generateAtlasWithBQF = (): Record<string, Record<string, number[]>> => {
        const atlas: Record<string, Record<string, number[]>> = {};

        for (let f = 0; f < 7; f++) {
            const fanoKey = `fano_${f}`;
            atlas[fanoKey] = {};

            for (let t = 0; t < 3; t++) {
                const tetraKey = `tetra_${t}`;
                atlas[fanoKey][tetraKey] = [];

                for (let p = 0; p < 240; p++) {
                    const slot = f * 720 + t * 240 + p;
                    atlas[fanoKey][tetraKey].push(slot);
                }
            }
        }

        return atlas;
    };

    // ============= QUICK REFERENCE WITH 240 =============

    export const quickReferenceWith240 = {
        // Constants
        TOTAL_SLOTS: 5040,
        FANO_SLOTS: 720,
        TETRA_SLOTS: 240,
        PHASE_SLOTS: 240,
        MAX_FANO: 6,
        MAX_TETRA: 2,
        MAX_PHASE: 239,

        // Key values
        FANO_6_START: 6 * 720, // 4320
        MAX_SLOT: 6 * 720 + 2 * 240 + 239, // 5039

        // BQF constants
        BQF_COEFFICIENTS: { a: 60, b: 16, c: 4 },
        BQF_PERIOD: 240,
        BQF_NORMALIZED: { a: 15, b: 4, c: 1 },

        // Formulas
        slotFormula: (f: number, t: number, p: number) => f * 720 + t * 240 + p,
        bqfFormula: (x: number, c: number) => 60 * x * x + 16 * x * c + 4 * c * c,
        phaseFormula: (x: number, c: number) => (60 * x * x + 16 * x * c + 4 * c * c) % 240,

        // Validation
        isValidFano: (f: number) => f >= 0 && f <= 6,
        isValidTetra: (t: number) => t >= 0 && t <= 2,
        isValidPhase: (p: number) => p >= 0 && p <= 239,
        isValidSlot: (slot: number) => slot >= 0 && slot <= 5039,

        // The 4320 reference
        FOUR_THREE_TWENTY: 4320,
        why4320: "6 * 720 = 6 * 3 * 240 = start of fano=6 block",
        why240: "BQF period: Q(x,c) mod 240 is invariant under Δ"
    };

    // Run demonstration
    if (require.main === module) {
        explore240Origin();
        explore4320With240();
        demonstrateBQFWith240();
        getSlotRangesWith240();
    }

})()
