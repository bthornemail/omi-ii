import { DOMMatrix, DOMPoint, DOMRect } from 'node:dom-matrix';

function createProtocolClosure() {
    // Shared ArrayBuffer for the final 512-bit output
    const shared512 = new SharedArrayBuffer(512 / 8);
    const sharedView = new Uint8Array(shared512);

    // Closure state using DOM objects
    const matrix = new DOMMatrix();
    const rect = new DOMRect(0, 0, 0, 0);
    const point = new DOMPoint();

    // Pure functions over Buffers (no arithmetic inside)
    const rotl = (buf, n) => Buffer.from(buf.map((_, i) => buf[(i + n) % buf.length]));
    const rotr = (buf, n) => Buffer.from(buf.map((_, i) => buf[(i - n + buf.length) % buf.length]));
    const xor = (a, b) => Buffer.from(a.map((v, i) => v ^ b[i]));

    return function generate(coordinateArrayBuffer) {
        if (!(coordinateArrayBuffer instanceof ArrayBuffer)) {
            throw new TypeError('Coordinate must be an ArrayBuffer');
        }
        const byteLength = coordinateArrayBuffer.byteLength;
        if (byteLength < 2 || byteLength > 32) {
            throw new RangeError('Coordinate length must be between 2 and 32 bytes');
        }

        // Copy coordinate into a Buffer
        const coordinate = Buffer.from(coordinateArrayBuffer);

        // Update DOM objects using the coordinate
        matrix.translateSelf(coordinate[0], coordinate[1]);
        point.x = coordinate[0];
        point.y = coordinate[1];
        rect.width = byteLength;
        rect.height = byteLength;

        // Generate components as SharedArrayBuffers
        const matrixBuffer = new SharedArrayBuffer(6 * 8); // 6 floats = 48 bytes
        const rectBuffer = new SharedArrayBuffer(4 * 8);   // 4 floats = 32 bytes
        const pointBuffer = new SharedArrayBuffer(3 * 8);  // 3 floats = 24 bytes

        const matrixView = new Float64Array(matrixBuffer);
        matrixView.set(matrix.toFloat64Array());

        const rectView = new Float64Array(rectBuffer);
        rectView[0] = rect.x;
        rectView[1] = rect.y;
        rectView[2] = rect.width;
        rectView[3] = rect.height;

        const pointView = new Float64Array(pointBuffer);
        pointView[0] = point.x;
        pointView[1] = point.y;
        pointView[2] = point.z;

        // XOR all coordinate bytes into the shared 512-bit buffer
        for (let i = 0; i < coordinate.length; i++) {
            sharedView[i % sharedView.length] ^= coordinate[i];
        }

        // Return requested component definitions as SharedArrayBuffers
        return {
            matrix: matrixBuffer,
            rect: rectBuffer,
            point: pointBuffer,
            shared: shared512,
        };
    };
}

const generateComponents = createProtocolClosure();

// Example usage
const coord = new ArrayBuffer(8);
new Uint8Array(coord).set([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
const result = generateComponents(coord);
console.log(result);
