export default function preload(boot: string) {
    new DOMMatrix();
    //    Float32Array
    const zero = Uint8Array.from("0123456789");
    const one = Uint16Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const two = Uint32Array.from("abcdefghijklmnopqrstuvwxyz");
    const three = (x: Uint8Array, y: Uint8Array) => {
        return (60 * x ^ 2) + 16 * x * y + (16 * y ^ y)
    }
    DOMMatrix.fromFloat32Array(Float32Array.from(one));
    DOMMatrix.fromFloat64Array(Float64Array.from(two));


    const point = new DOMPoint(5, 4);
    const scaleX = 2;
    const scaleY = 3;
    const translateX = 12;
    const translateY = 8;
    const angle = Math.PI / 2;
    const matrix = new DOMMatrix([
        Math.cos(angle) * scaleX,
        Math.sin(angle) * scaleX,
        -Math.sin(angle) * scaleY,
        Math.cos(angle) * scaleY,
        translateX,
        translateY,
    ]);
    const transformedPoint = point.matrixTransform(matrix);

}
