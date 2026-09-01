const { Readable } = require('node:stream');
const controller = new AbortController();
const read = new Readable({
    read(size) {
        // ...
    },
    signal: controller.signal,
});
// Later, abort the operation closing the stream
controller.abort();
const { Readable } = require('node:stream');

class Counter extends Readable {
    constructor(opt) {
        super(opt);
        this._max = 1000000;
        this._index = 1;
    }

    _read() {
        const i = this._index++;
        if (i > this._max)
            this.push(null);
        else {
            const str = String(i);
            const buf = Buffer.from(str, 'ascii');
            this.push(buf);
        }
    }
}
// `_source` is an object with readStop() and readStart() methods,
// and an `ondata` member that gets called when it has data, and
// an `onend` member that gets called when the data is over.

class SourceWrapper extends Readable {
    constructor(options) {
        super(options);

        this._source = getLowLevelSourceObject();

        // Every time there's data, push it into the internal buffer.
        this._source.ondata = (chunk) => {
            // If push() returns false, then stop reading from source.
            if (!this.push(chunk))
                this._source.readStop();
        };

        // When the source ends, push the EOF-signaling `null` chunk.
        this._source.onend = () => {
            this.push(null);
        };
    }
    // _read() will be called when the stream wants to pull more data in.
    // The advisory size argument is ignored in this case.
    _read(size) {
        this._source.readStart();
    }
}

const { Readable } = require('node:stream');
const fs = require('node:fs');

class ReadStream extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
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
const { Duplex } = require('node:stream');
const kSource = Symbol('source');

class MyDuplex extends Duplex {
    constructor(source, options) {
        super(options);
        this[kSource] = source;
    }

    _write(chunk, encoding, callback) {
        // The underlying source only deals with strings.
        if (Buffer.isBuffer(chunk))
            chunk = chunk.toString();
        this[kSource].writeSomeData(chunk);
        callback();
    }

    _read(size) {
        this[kSource].fetchSomeData(size, (data, encoding) => {
            this.push(Buffer.from(data, encoding));
        });
    }
}
// Writeable
const fs = require("node:fs");
const writeStream = fs.createWriteStream("output.txt");
writeStream.write("Hello, World!");
writeStream.end();

const fs = require("node:fs");
const readStream = fs.createReadStream("input.txt");
readStream.on("data", (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
});

//duplex example
const net = require("node:net");
const server = net.createServer((socket) => {
    socket.write("Server: Hello!");
    socket.on("data", (data) => {
        console.log("Received:", data.toString());
    });
});
server.listen(8080);

//  transform
const { Transform } = require("node:stream");
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);

// drain high wayer
const fs = require("node:fs");

// Create a readable stream from a large file
const readStream = fs.createReadStream("bigfile.txt");

// Create a writable stream to an output file
const writeStream = fs.createWriteStream("output.txt");

// Pipe the readable stream into the writable stream
readStream.pipe(writeStream);

// Listen for the 'drain' event on the writable stream
writeStream.on("drain", () => {
    // This event is emitted when the writable stream buffer is drained
    console.log("Drained. Resuming read.");
    // Resume the readable stream to continue reading data
    readStream.resume();
});
// togglee streaming modd
const fs = require("node:fs");

const readStream = fs.createReadStream("sample.txt");

readStream.on("data", (chunk) => {
    console.log(`Received ${chunk.length} bytes`);
    readStream.pause(); // Switch to paused mode

    setTimeout(() => {
        readStream.resume(); // Switch back to flowing mode
    }, 1000);
});

// paused mode default
const fs = require("node:fs");

const readStream = fs.createReadStream("bigfile.txt");

// Start in paused mode (default)
readStream.on("readable", () => {
    let chunk;
    while (null !== (chunk = readStream.read())) {
        console.log("Processing data chunk:", chunk.length);
        // Simulate processing delay
        setTimeout(() => {
            console.log("Finished processing chunk");
        }, 1000);
    }
});

//piping
const fs = require("node:fs");
const zlib = require("node:zlib");
const { Transform } = require("node:stream");

// Create a transform stream to convert data to uppercase
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

// Create a readable stream from a source file
const readStream = fs.createReadStream("source.txt");

// Create a writable stream to a destination file
const writeStream = fs.createWriteStream("destination.txt.gz");

// Create a gzip transform stream
const gzip = zlib.createGzip();

// Pipe the streams together: read -> transform -> gzip -> write
readStream
    .pipe(upperCaseTransform) // Transform to uppercase
    .pipe(gzip) // Compress with gzip
    .pipe(writeStream); // Write to the destination file

// Handle events
writeStream.on("finish", () => {
    console.log(
        "File has been copied, transformed, and compressed successfully."
    );
});

writeStream.on("error", (err) => {
    console.error("Error writing to file:", err);
});

readStream.on("error", (err) => {
    console.error("Error reading from file:", err);
});


const fs = require("node:fs");
const { Transform } = require("node:stream");

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

readStream.pipe(upperCaseTransform).pipe(writeStream);

(() => {
    /*
      Create a writable stream with a 1KB buffer.
Write data to the stream.
If more than 1KB of data is written before it's processed, the write method will return false, indicating the buffer is full.
      */

    import { Writable } from "node:stream";

    const myWritable = new Writable({
        highWaterMark: 1024, // Set buffer size to 1KB
        write(chunk, encoding, callback) {
            console.log("Writing:", chunk.toString());
            // Simulate processing delay
            setTimeout(() => {
                callback();
            }, 100);
        },
    });

    // Write data to the writable stream
    const data = Buffer.from("This is some data to write to the stream.");

    for (let i = 0; i < 10; i++) {
        const canWrite = myWritable.write(data);

        if (!canWrite) {
            console.log("Buffer is full, applying backpressure.");
        } else {
            console.log("Data written to buffer.");
        }
    }

    // End the writable stream
    myWritable.end();
})();

// pipline
const { pipeline } = require("node:stream");
const fs = require("node:fs");
const zlib = require("node:zlib");
const { Transform } = require("node:stream");

// Create a transform stream to convert data to uppercase
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

// Create streams
const readStream = fs.createReadStream("source.txt");
const writeStream = fs.createWriteStream("destination.txt.gz");
const gzip = zlib.createGzip();

// Use pipeline to handle the streams
pipeline(
    readStream, // Read from the source file
    upperCaseTransform, // Transform to uppercase
    gzip, // Compress with gzip
    writeStream, // Write to the destination file
    (err) => {
        if (err) {
            console.error("Pipeline failed:", err);
        } else {
            console.log("Pipeline succeeded.");
        }
    }
);

// events
const fs = require("node:fs");

const readStream = fs.createReadStream("events.txt");

readStream.on("open", () => console.log("Stream opened"));
readStream.on("data", (chunk) => console.log(`Received ${chunk.length} bytes`));
readStream.on("end", () => console.log("Stream ended"));
readStream.on("close", () => console.log("Stream closed"));
readStream.on("error", (err) => console.error("Error:", err));


// test this
readStream.on("readable", (err) => console.error("Read is ready:", err));


///
const fs = require("node:fs");
const zlib = require("node:zlib");
const { Transform } = require("node:stream");

// Create a transform stream to convert data to uppercase
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

const readStream = fs.createReadStream("source.txt");
const writeStream = fs.createWriteStream("destination.txt.gz");
const gzip = zlib.createGzip();

// Pipe the streams together
readStream.pipe(upperCaseTransform).pipe(gzip).pipe(writeStream);

// Handle readable stream events
readStream.on("data", (chunk) => {
    console.log("Reading data:", chunk.length);
});

readStream.on("end", () => {
    console.log("Finished reading data.");
});

readStream.on("error", (err) => {
    console.error("Read error:", err);
});

// Handle writable stream events
writeStream.on("finish", () => {
    console.log("Finished writing data.");
});

writeStream.on("drain", () => {
    console.log("Writable stream drained.");
});

writeStream.on("error", (err) => {
    console.error("Write error:", err);
});

// Handle transform stream events
upperCaseTransform.on("error", (err) => {
    console.error("Transform error:", err);
});

gzip.on("error", (err) => {
    console.error("Gzip error:", err);
});

// object mode
const { Readable, Writable } = require("node:stream");

// Create a readable stream in objectMode
const readableStream = new Readable({
    objectMode: true,
    read() {
        this.push({ id: 1, name: "Alice" });
        this.push({ id: 2, name: "Bob" });
        this.push(null); // No more data
    },
});

// Create a writable stream in objectMode
const writableStream = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
        console.log("Received object:", chunk);
        callback();
    },
});

// Pipe the readable stream to the writable stream
readableStream.pipe(writableStream);

