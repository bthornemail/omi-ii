const ruler = function(event) {
    const { sab, totalSlots, constantC, base60, B } = event.data;
    const atomicView = new Int32Array(sab);

    // Core Lossless 16-bit Bit Operations
    function rotl16(x, bits) { return (((x << bits) | (x >>> (16 - bits))) & 0xFFFF); }
    function rotr16(x, bits) { return (((x >>> bits) | (x << (16 - bits))) & 0xFFFF); }

    function applyDeltaLaw(y) {
        const r1 = rotl16(y, 1);
        const r3 = rotl16(y, 3);
        const rr2 = rotr16(y, 2);
        return (r1 ^ r3 ^ rr2 ^ constantC) & 0xFFFF;
    }

    console.log("Ruler");
    return (K)=>{
        for (let slot = 0; slot < totalSlots; slot++) {
            const baseOffset = (slot * 128) / 4;
            
            // Atomically load the 2^10 Omicron Prefix Anchor (First 32-bit slot position)
            const prefixValue = Atomics.load(atomicView, baseOffset) >>> 16;
	    if (prefixValue !== K && prefixValue !== K) continue;

	    // Extract the 2^4 Low matrix word (y) and 2^9 Joint Cross-Pointer (x)
	    const firstWord = Atomics.load(atomicView, baseOffset);
	    const y = firstWord & 0xFFFF;
	    
	    const pointerWord = Atomics.load(atomicView, baseOffset + 16); // Byte offset 64
	    const x = pointerWord & 0xFFFFFF;

	    const combinatorWord = Atomics.load(atomicView, baseOffset + 1); // Byte offset 4
	    const asciiCombinator = (combinatorWord >>> 24) & 0xFF;

            // Execute the Binary Quadratic Form Surface Calculation: 60x² + 16xy + 4y²
            const quadraticSum = (60 * (x ** 2)) + (16 * asciiCombinator * y) + (4 * (y ** 2));
            const sexagesimalTick = Math.abs(quadraticSum) % base60;

            // Run the Delta Law calculation pass over the isolated y register
            const nextDeltaState = applyDeltaLaw(y);

            // Atomically store the calculated outputs back inside the synchronization registers
            Atomics.store(atomicView, baseOffset + 31, sexagesimalTick); // Store tick in terminal block
            Atomics.store(atomicView, baseOffset + 30, nextDeltaState);   // Store delta loop state
	    return {
		tick: {
		    atom: atomicView,
		    base: baseOffset + 31,
		    tick: sexagesimalTick
		}, 

		tock: {
		    atom: atomicView,
		    base: asciiCombinator0
		    tick: x
		},
		
		tick: {
		    atom: atomicView,
		    base: baseOffset + 30,
		    tick: nextDeltaState
		}, 
	    };
        }

    }
};
