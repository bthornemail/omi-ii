// import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { open, readFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';

//    parse sorce blocks ```<name> \n\r```
// find openging and closiging text

const controller = new AbortController();

class Parser extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
    }
    async test() {
        const file = await open('./some');
        for await (const line of file.readLines()) {
            console.log(line)
        }
        const bufFile = await readFile('./file', {
            buffer: (size) => Buffer.alloc(size)
        });
        const kSource = Symbol('source');
        this[kSource] = [];
        for (const l of bufFile) {

            console.log(l)
        }
    }
    _construct(callback) {
        fs.open(this.filename, (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    _read(n) {
        const buf = Buffer.alloc(n);
        fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                const page = buf.slice(0, bytesRead);
                const article = /^[AEIOU]/;
                if (/[^\x00-\xFF]/.test(page.toString('hex')) {
                    throw makeException(TypeError, "is not a valid ByteString", options);
                }
                console.log("n", page.includes("```", 'binary'));
                if (page.includes("```", 'binary')) {
                    let top = page.indexOf("```", 'binary');
                    let bottom = page.lastIndexOf("```", 'binary');

                    console.log("top bottom",
                        top,
                        page.subarray(top, top + "```".length + 10).toString(),
                        bottom,
                        page.subarray(bottom, bottom + "```".length + 10).toString()
                    );
                };
                console.log("bytesRead", bytesRead);
                console.log("fd", this.fd);
                console.log("buf", buf);
                console.log("page", page);
                this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
            }
        });
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}
const parser = new Parser('file');
//console.log(parser.read())
for await (const line of parser.iterator()) {
    console.log(line.toString('utf8'))
}


// Round x to the nearest integer, choosing the even integer if it lies halfway between two.
function evenRound(x) {                                                                                // There are four cases for numbers with fractional part being .5:
    //
    // case |     x     | floor(x) | round(x) | expected | x <> 0 | x % 1 | x & 1 |   example
    //   1  |  2n + 0.5 |  2n      |  2n + 1  |  2n      |   >    |  0.5  |   0   |  0.5 ->  0
    //   2  |  2n + 1.5 |  2n + 1  |  2n + 2  |  2n + 2  |   >    |  0.5  |   1   |  1.5 ->  2
    //   3  | -2n - 0.5 | -2n - 1  | -2n      | -2n      |   <    | -0.5  |   0   | -0.5 ->  0
    //   4  | -2n - 1.5 | -2n - 2  | -2n - 1  | -2n - 2  |   <    | -0.5  |   1   | -1.5 -> -2
    // (where n is a non-negative integer)
    //
    // Branch here for cases 1 and 4
    if ((x > 0 && (x % 1) === +0.5 && (x & 1) === 0) ||
        (x < 0 && (x % 1) === -0.5 && (x & 1) === 1)) {
        return censorNegativeZero(Math.floor(x));
    }

    return censorNegativeZero(Math.round(x));
}

if (/[^\x00-\xFF]/.test(x)) {
    throw makeException(TypeError, "is not a valid ByteString", options);
}
    An advanced regular expression that matches any numeral is[+-] ? (\d + (\.\d *)?|\.\d +) ([eE][+-] ?\d +)?.
`
An advanced regular expression that matches any numeral is [+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?.

(0|(1(01*0)*1))* denotes the set of binary numbers that are multiples of 3: { ε, "0", "00", "11", "000", "011", "110", "0000", "0011", "0110", "1001", "1100", "1111", "00000", ...}
The derivative of a regular expression can be defined using the Brzozowski derivative

For example, in sed the command s,/,X, will replace a / with an X, using commas as delimiters.
`
