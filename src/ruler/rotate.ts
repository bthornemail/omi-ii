function rotl(buf, n) {
    return Buffer.from(buf.map((_, i) => buf[(i + n) % buf.length]));
}

function rotr(buf, n) {
    return Buffer.from(buf.map((_, i) => buf[(i - n + buf.length) % buf.length]));
}

function xor(a, b) {
    return Buffer.from(a.map((v, i) => v ^ b[i]));
}

function delta(buf, C) {
    return xor(xor(xor(rotl(buf, 1), rotl(buf, 3)), rotr(buf, 2)), C);
}