export default function meter(meter: number) {
        // Core Lossless 16-bit Bit Operations
    function rotl16(x: number, bits: number) { return (((x << bits) | (x >>> (16 - bits))) & 0xFFFF); }
    function rotr16(x: number, bits: number) { return (((x >>> bits) | (x << (16 - bits))) & 0xFFFF); }

    function applyDeltaLaw(delta: number) {
        const r1 = rotl16(delta, 1);
        const r3 = rotl16(delta, 3);
        const rr2 = rotr16(delta, 2);
        return (r1 ^ r3 ^ rr2 ^ meter) & 0xFFFF;
    }
    return [meter,applyDeltaLaw(meter)];
}