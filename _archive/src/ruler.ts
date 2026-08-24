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

export class Ruler{}(

  meter: OO = 0o0;
  BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

base36Encode() {
    return (this.meter).toString(36)
  }
  base36Decode() {
    return (this.meter).toString(36)
  }
  base64Encode() {
    return btoa(this.base);
  }

  base64Decode() {
    return atob(this.base);
  }


  // Encode a standard string to Base32
  base32Encode() {
    const encoder = new TextEncoder();
    const data = encoder.encode(this.base);
    let bits = 0;
    let value = 0;
    let output = '';

    for (let i = 0; i < data.length; i++) {
      value = (value << 8) | data[i];
      bits += 8;
      while (bits >= 5) {
        output += this.BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }
    if (bits > 0) {
      output += this.BASE32_ALPHABET[(value << (5 - bits)) & 31];
    }
    while (output.length % 8 !== 0) {
      output += '=';
    }
    return output;
  }

  // Decode a Base32 string back to a standard string
  base32Decode(base) {
    const cleaned = base.replace(/=+$/, '').toUpperCase();
    let bits = 0;
    let value = 0;
    const decoded = [];

    for (let i = 0; i < cleaned.length; i++) {
      const idx = this.BASE32_ALPHABET.indexOf(cleaned[i]);
      if (idx === -1) throw new Error('Invalid Base32 character');
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        decoded.push((value >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }
    return new TextDecoder().decode(new Uint8Array(decoded));
  }
)
