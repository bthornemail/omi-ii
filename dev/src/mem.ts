#!/data/data/com.termux/files/usr/bin/env node
import { Buffer } from 'node:buffer';

const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const az = 'abcdefghijklmnopqrstuvwxyz';
const base10 = "0123456789";
const buf256 = Buffer.alloc(256);
for (let i = 0; i <= 255; i++) {
    // 97 is the decimal ASCII value for 'a'.
    buf256[i] = i;
}
for (const value of buf256.values()) {
    console.log(value);	

}
console.log(0,30,buf256.subarray(0, 31).toString('binary'));
    console.log(buf256.subarray(-31, 0).toString('binary'));
    // Prints: buffe
    // (Equivalent to buf.subarray(0, 5).

    console.log(buf256.subarray(32, 63).toString('binary'));
    console.log(buf256.subarray(-63, -32).toString('binary'));
    // Prints: buff
    // (Equivalent to buf.subarray(0, 4).)

    console.log(buf256.subarray(64, 95).toString('binary'));
    console.log(buf256.subarray(-95, -64).toString('binary'));

    console.log(buf256.subarray(96, 127).toString('binary'));
    console.log(buf256.subarray(-127, -96).toString('binary'));
    // Prints: uff
    // (Equivalent to buf.subarray(1, 4).)

    const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);

    console.log(buf1);
    // Prints: <Buffer 01 02 03 04 05 06 07 08>

    buf1.swap16();

    console.log(buf1);
    // Prints: <Buffer 02 01 04 03 06 05 08 07>
    const buf2 = Buffer.from('This is little-endian UTF-16', 'utf16le');
    buf2.swap16(); // Convert to big-endian UTF-16 text.
    const buf4 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
    console.log(buf4);
    // Prints: <Buffer 01 02 03 04 05 06 07 08>
    buf4.swap32();
    console.log(buf4);
    // Prints: <Buffer 04 03 02 01 08 07 06 05>
    const buf8 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
    console.log(buf8);
    // Prints: <Buffer 01 02 03 04 05 06 07 08>
    buf8.swap64();
    console.log(buf8);
