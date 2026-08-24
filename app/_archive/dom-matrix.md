new DOMMatrix()
new DOMMatrix(initString)
new DOMMatrix(initArray)

Parameters
initString Optional
A string representing a 2D or 3D matrix in CSS matrix() or matrix3d() format.

initArray Optional
An array containing either 6 or 16 numbers in column - major order.Other array lengths throw a TypeError.

    A 6 - element array is interpreted as the matrix components[m11, m12, m21, m22, m41, m42], creating a 2D matrix.
        A 16 - element array is interpreted as the matrix components[m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44], creating a 3D matrix.
If this argument is omitted, an identity matrix is created, i.e., equivalent to[1, 0, 0, 1, 0, 0].

    If this argument is provided as a Float32Array or Float64Array, consider using the more performant static methods DOMMatrix.fromFloat32Array() or DOMMatrix.fromFloat64Array() instead


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

Examples
Creating a 2D matrix from a Float32Array
This example creates a 2D matrix from a 6 - element Float32Array.

    js

Copy
const float32Array = new Float32Array([1, 0, 0, 1, 10, 20]);
const matrix2D = DOMMatrix.fromFloat32Array(float32Array);

console.log(matrix2D.toString());
// Output: matrix(1, 0, 0, 1, 10, 20)

console.log(matrix2D.is2D);
// Output: true
Creating a 3D matrix from a Float32Array
This example creates a 3D matrix from a 16 - element Float32Array.

    js

Copy
const float32Array = new Float32Array([
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1,
]);
const matrix3D = DOMMatrix.fromFloat32Array(float32Array);

console.log(matrix3D.is2D);
// Output: false

console.log(matrix3D.m41, matrix3D.m42, matrix3D.m43);
// Output: 10 20 30

Examples
Creating a 2D matrix from a Float64Array
This example creates a 2D matrix from a 6 - element Float64Array.

    js

Copy
const float64Array = new Float64Array([1, 0, 0, 1, 10, 20]);
const matrix2D = DOMMatrix.fromFloat64Array(float64Array);

console.log(matrix2D.toString());
// Output: matrix(1, 0, 0, 1, 10, 20)

console.log(matrix2D.is2D);
// Output: true

console.log(matrix2D.e, matrix2D.f);
// Output: 10 20
Creating a 3D matrix from a Float64Array
This example creates a 3D matrix from a 16 - element Float64Array.

    js

Copy
const float64Array = new Float64Array([
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1,
]);
const matrix3D = DOMMatrix.fromFloat64Array(float64Array);

console.log(matrix3D.is2D);
// Output: false

console.log(matrix3D.m41, matrix3D.m42, matrix3D.m43);
// Output: 10 20 30
