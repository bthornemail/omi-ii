import { Buffer } from 'node:buffer';
export type MANIFEST = Record<string, Record<string, number>>;
export type RECORD = Record<string, string | number | Array<string | number>>;
export type KNOWN = Buffer
export type UNKNOWN = Buffer

const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const az = 'abcdefghijklmnopqrstuvwxyz';
const base10 = "0123456789";

function buildManifest(lines: string[]) {
    const manifest = {};
    lines.forEach((v, num) => {
        const word = Buffer.from(v);
        word.forEach((form) => {
            const bind = {};
            //        bind[bind[word] = num] = word;
            bind[bind[form] = word.toString('hex')] = form;
            manifest[num] = bind;
        });
        console.log(manifest)
    });
    return manifest;
}
buildManifest([AZ, az, base10);
function popcount(n) {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n = n >>> 1;
    }
    return count;
}
function popcountfast(n) {
    let count = 0;
    while (n !== 0) {
        count &= n - 1;
        count++;
    }
    return count;
}



export default function initializeMemory(record: RECORD, manifest?: MANIFEST, known?: KNOWN, unknown?: UNKOWN) {
    unknown ? null :
        unknown = Buffer.allocUnsafe(2).fill(0);
    known ? null :
        known = Buffer.allocUnsafe(2).fill(1);
    manifest ? null :
        manifest = {};

    const memory = Buffer.alloc(buffer.length * buffer.BYTES_PER_ELEMENT);

    for (const v in {}.values(){
    }
    for (let i = 0; i <= 255; i++) {
        memory[i] = buffer[i];
    }
};
