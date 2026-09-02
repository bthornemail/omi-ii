function calc(block = Buffer.allocUnsafe(2).fill(0), context = Buffer.allocUnsafe(8).fill(0)) {
    let count = 0;
    const x = block.length * block.BYTES_PER_ELEMENT;
    const y = context.length * context.BYTES_PER_ELEMENT;
    const xy = x * y;
    const top = Buffer.allocUnsafe(xy).fill("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 'binary');
    const bottom = Buffer.allocUnsafe(xy).fill("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 'binary').reverse();
    const forward = Buffer.allocUnsafe(xy).fill("abcdefghijklmnopqrstuvwxyz", 'binary');
    const backward = Buffer.allocUnsafe(xy).fill("abcdefghijklmnopqrstuvwxyz", 'binary').reverse();
    const left = Buffer.allocUnsafe(xy).fill("0123456789", 'binary');
    const right = Buffer.allocUnsafe(xy).fill("0123456789", 'binary').reverse();
    const arcs = [];
    const lines = [];
    const rightRotations = [];
    const leftRotations = [];
    const ruler = Buffer.allocUnsafe(8).fill(0);
    let rules = {};
    for (let t = 0; t < top.length; t += top.BYTES_PER_ELEMENT) {
        for (let b = 0; b < bottom.length; b += bottom.BYTES_PER_ELEMENT) {
            for (let r = 0; r < right.length; r += right.BYTES_PER_ELEMENT) {
                for (let l = 0; l < left.length; l += left.BYTES_PER_ELEMENT) {
                    for (let f = 0; f < forward.length; f += forward.BYTES_PER_ELEMENT) {
                        for (let br = 0; br < backward.length; br += backward.BYTES_PER_ELEMENT) {
                            const diagonal = top[t] ^ bottom[b] ^ right[r] ^ left[l] ^ forward[f] ^ backward[br];
                            const linear = top[t] + bottom[b] + right[r] + left[l] + forward[f] + backward[br];
                            //const ruler = { top: top[t], bottom: bottom[b], right: right[r], left: left[l], forward: forward[f], backward: backward[br] };
                            //                            const rule = Buffer.from([
                            //                                top[t],
                            //                                bottom[b],
                            //                                right[r],
                            //                                left[l],
                            //                                forward[f],
                            //                                backward[br]]);

                            const ruler = Buffer.allocUnsafe(6).fill(0);
                            ruler[0] = t;
                            ruler[1] = b;
                            ruler[2] = r;
                            ruler[3] = l;
                            ruler[4] = f;
                            ruler[5] = br;
                            const rule = Buffer.allocUnsafe(6).fill(0);
                            rule[0] = top[t];
                            rule[1] = bottom[b];
                            rule[2] = right[r];
                            rule[3] = left[l];
                            rule[4] = forward[f];
                            rule[5] = backward[br];


                            if (linear % count === 0) {
                                lines.push(rule);
                            }

                            if ((t ** 2) + (b ** 2) === r ** 2 &&
                                (t ** 2) + (f ** 2) === r ** 2 &&
                                (t ** 2) + (br ** 2) == r ** 2 &&
                                (b ** 2) + (f ** 2) === r ** 2 &&
                                (b ** 2) + (br ** 2) == r ** 2 &&
                                (f ** 2) + (br ** 2) == r ** 2) {
                                rightRotations.push(rule)
                            }
                            else if ((t ** 2) + (b ** 2) === l ** 2 &&
                                (t ** 2) + (f ** 2) === l ** 2 &&
                                (t ** 2) + (br ** 2) === l ** 2 &&
                                (b ** 2) + (f ** 2) === l ** 2 &&
                                (b ** 2) + (br ** 2) === l ** 2 &&
                                (f ** 2) + (br ** 2) === l ** 2) {
                                leftRotations.push(rule)
                            } else if ((xy === diagonal) && ((xy ^ diagonal) === 0)) {
                                // if (diagonal % xy === 0) {
				ruler[0]
				arcs.push(rule);
                                rules = Object.assign({}, ruler, {
                                    top: top[t],
                                    bottom: bottom[b],
                                    right: right[r],
                                    left: left[l],
                                    forward: forward[f],
                                    backward: backward[br]
                                });
                            }
                        }
                        count++;
                    }
                }
            }
        }
    }
}


console.log("count", count);

console.log("top", top.length);
console.log("bottom", bottom.length);
console.log("left", left.length);
console.log("right", right.length);
console.log("arcs", arcs.length);


console.log("ruler", ruler.filter((rule) => { return (rule }));
console.log("lines", lines);
console.log("right rotations", rightRotations);
console.log("left rotations", leftRotations);
}


const buf16 = Buffer.allocUnsafe(2).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 'binary')
const buf64 = Buffer.allocUnsafe(8).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 'binary')
for (let i = 0; i < buf16.length; i++) {
    buf16[i] = i;
}
for (let i = 0; i < buf64.length; i++) {
    buf64[i] = i;
}
calc(buf16, buf64);
