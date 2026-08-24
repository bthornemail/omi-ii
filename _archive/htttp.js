import repl, { Repl } from 'node:repl';
import process from 'node:process';
import net from 'node:net';
import fs from 'node:fs';
import { createContext, runInContext } from 'node:vm';

import http from 'node:http';
import repl from 'node:repl';
function isRecoverableError(error) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
}
export default class REPL {
    repl?: Repl;
    connections: number = 0;
    context = {};
    myEval(cmd, context, filename, callback) {
        let result;
        try {
            createContext(this.context);
            result = runInContext(cmd, context);//this.context);
        } catch (e: Error) {
            if (isRecoverableError(e)) {
                console.log("Recoverable");
                return callback(new repl.Recoverable(e));
            }

        }
        callback(null, result);
    }
    myWriter(output) {
        return output.toUpperCase();
    }
    async socket(port?: number) {
        return new Promise((resolve, reject) => {
            try {
                const sock = net.connect(port ?? 1337);
                process.stdin.pipe(sock);
                sock.pipe(process.stdout);

                sock.on('connect', () => {
                    process.stdin.resume();
                    process.stdin.setRawMode(true);
                });

                sock.on('close', () => {
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    sock.removeListener('close'); //done);
                });

                process.stdin.on('end', () => {
                    sock.destroy();
                    console.log();
                });

                process.stdin.on('data', (b) => {
                    if (b.length === 1 && b[0] === 4) {
                        process.stdin.emit('end');
                    }
                });
                resolve(sock);
            }
            catch (e) {
                reject(Error(e));
            }
        })
    }

    async serve(port?: number) {
        return new Promise((resolve, reject) => {
            try {
                net.createServer((socket) => {
                    const r = repl.start({
                        prompt: `socket ${socket.remoteAddress}:${socket.remotePort}> `,
                        input: socket,
                        output: socket,
                        terminal: true,
                        useGlobal: false,
                    });
                    r.on('exit', () => {
                        socket.end();
                    });
                    r.context.socket = socket;
                    resolve(r);
                })
                    .listen(port ?? 1337);
            } catch (e) {
                reject(Error(e));
            }
        });
    }
    initializeContext(context) {
        context.m = 'test';
        this.repl.defineCommand('upgrade', {
            help: 'Upgrade Eval and Writer',
            action() {
                this.clearBufferedCommand();
                console.log(`Upgrading Writer`);
                this.repl = repl.start({ prompt: 'imo> ', eval: this.myEval, writer: this.myWriter });
                this.displayPrompt();
            },
        });
        this.repl.defineCommand('sayhello', {
            help: 'Say hello',
            action(name) {
                this.clearBufferedCommand();
                console.log(`Hello, ${name}!`);
                this.displayPrompt();
            },
        });
        this.repl.defineCommand('saybye', function saybye() {
            console.log('Goodbye!');
            this.close();
        });
    }
    init() {
        this.repl = repl.start({ prompt: 'imo> ', eval: this.myEval });
        this.repl.on('reset', this.initializeContext);
        this.repl.on('exit', () => {
            console.log('Received "exit" event from repl!');
            process.exit();
        });
        this.initializeContext(this.repl.context);
        return;
    }
    async fifo() {
        return new Promise((resolve, reject) => {
            try {
                const unixSocketPath = '/tmp/node-repl-sock';
                // If the socket file already exists let's remove it
                fs.rmSync(unixSocketPath, { force: true });
                const server = net.createServer((socket) => {
                    this.connections += 1;
                    this.repl.start({
                        prompt: 'Node.js via Unix socket> ',
                        useGlobal: true,
                        input: socket,
                        output: socket,
                    }).on('exit', () => {
                        socket.end();
                        fs.rmSync(unixSocketPath, { force: true });
                    });
                })
                server.listen(unixSocketPath);
                resolve(server);
            } catch (e) {
                reject(e);
            }
        });
    }
};
/*
(() => {

    let connections = 0;

    repl.start({
        prompt: 'Node.js via stdin> ',
        useGlobal: true,
        input: process.stdin,
        output: process.stdout,
    });

    const unixSocketPath = '.tnode-repl-sock';
    // If the socket file already exists let's remove it
    fs.rmSync(unixSocketPath, { force: true });

    net.createServer((socket) => {
        connections += 1;
        repl.start({
            prompt: 'Node.js via Unix socket> ',
            useGlobal: true,
            input: socket,
            output: socket,
        }).on('exit', () => {
            socket.end();
        });
    }).listen(unixSocketPath);

    net.createServer((socket) => {
        connections += 1;
        repl.start({
            prompt: 'Node.js via TCP socket> ',
            useGlobal: true,
            input: socket,
            output: socket,
        }).on('exit', () => {
            socket.end();
        });
    }).listen(5001);
    })()
*/
(() => {
    nc - U.tnode - repl - sock
telnet localhost 5001
    Use code with caution.Reminder: To exit Telnet, press Ctrl + ], type quit, and press Enter.
    nc localhost 5001
    echo - e "POST / HTTP/1.1\r\nHost: localhost:8000\r\nContent-Type: text/plain\r\nContent-Length: 6\r\n\r\n2 + 2\n" | nc localhost 8000

        `
POST / HTTP/1.1
Host: localhost:8000
Content-Type: text/plain
Content-Length: 21

console.log("Telnet!");


curl -H "Content-Type: text/plain" \
     -H "X-My-Gating-Criteria: allow-this-user" \
     -d "4 + 4" \
     http://localhost:8000

The Secret Trap: The Double Enter (\r\n\r\n)When writing raw HTTP headers by hand in nc or telnet, the absolute most important rule is the blank line between the headers and the body.The HTTP protocol states that a server reads headers line-by-line. The only way the server knows you are finished sending headers and are ready to send your buffer/blob data is when it sees an entirely empty line (\r\n\r\n). If you forget to hit Enter twice, the server will sit there forever waiting for more headers!

Both requests and responses share a similar structure:

A start-line is a single line that describes the HTTP version along with the request method or the outcome of the request.
An optional set of HTTP headers containing metadata that describes the message. For example, a request for a resource might include the allowed formats of that resource, while the response might include headers to indicate the actual format returned.
An empty line indicating the metadata of the message is complete.
An optional body containing data associated with the message. This might be POST data to send to the server in a request, or some resource returned to the client in a response. Whether a message contains a body or not is determined by the start-line and HTTP headers.

CONNECT developer.mozilla.org:443 HTTP/1.1
CONNECT developer.mozilla.org:443 HTTP/1.1

Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 49

--delimiter123
Content-Disposition: form-data; name="field1"

value1
--delimiter123
Content-Disposition: form-data; name="field2"; filename="example.txt"

Text file contents
--delimiter123--


Accept-Ranges: <range-unit>
Accept-Ranges: none

The following examples show how to make requests using the Range header for CORS-safelisted requests, and for requesting multiple ranges. Other examples can be found in the HTTP range requests guide.

Single byte ranges and CORS-safelisted requests
The Range header is a CORS-safelisted request header when the value is a single byte range. This means that it can be used in cross-origin requests without triggering a preflight request, which is useful for requesting media and resuming downloads.

The following example requests the first 500 bytes of a resource:

http

Copy
Range: bytes=0-499
To request the second 500 bytes:

http

Copy
Range: bytes=500-999
Omitting the end position requests all remaining units of the resource, so the last 100 bytes of a resource with a length of 1000 bytes can be requested using:

http

Copy
Range: bytes=900-
Alternatively, if it's unknown how large a resource is, the last n bytes can be requested using a suffix range of -n:

http

Copy
Range: bytes=-100
Requesting multiple ranges
Given a resource with a length of 10000 bytes, the following example requests three separate ranges; 200-999 (800 bytes), 2000-2499 (500 bytes), and finally 9500-. The ranges-specifier value 9500- omits an end position which indicates that all bytes from 9500 onward are part of the third range (500 bytes).

http

Copy
Range: bytes=200-999, 2000-2499, 9500-
This example requests the first 500 and last 500 bytes of the file. The request may be rejected by the server if these ranges overlap (if the requested resource was less than 1000 bytes long, for instance).

http

Copy
Range: bytes=0-499, -500
Checking if a server supports range requests
The following curl command makes a HEAD request for an image:

bash

Copy
curl -v --http1.1 -I https://i.imgur.com/z4d4kWk.jpg
# or using the OPTIONS method:
# curl -v --http1.1 -X OPTIONS https://i.imgur.com/z4d4kWk.jpg
This results in the following HTTP request:

http

Copy
HEAD /z4d4kWk.jpg HTTP/1.1
Host: i.imgur.com
User-Agent: curl/8.7.1
Accept: */*
The server responds with a 200 response, and the Accept-Ranges: bytes header is present (some headers are omitted for brevity):

http

Copy
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 146515
Content-Type: image/jpeg
…
Accept-Ranges: bytes
Fetching a range from a blob URL
The blob: URL also supports range requests by using fetch().

js

Copy
const blob = new Blob(["Hello, world!"], { type: "text/plain" });
const url = URL.createObjectURL(blob);
fetch(url, {
  headers: {
    Range: "bytes=7-11",
  },
})
  .then((response) => response.text())
  .then((text) => console.log(text)); // "world"
Specifications

HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked

7\r\n
Welcome\r\n
1c\r\n
to Mozilla Developer Network\r\n
0\r\n
\r\n

HTTP/1.1 200
content-encoding: br
content-type: text/javascript; charset=utf-8
vary: Accept-Encoding
date: Fri, 21 Jun 2024 14:02:25 GMT
content-length: 2978

const videoPlayer=document.getElementById...

HTTP/3 200
server: nginx
date: Wed, 24 Jul 2024 16:53:02 GMT
content-type: text/css
vary: Accept-Encoding
content-encoding: br

.super-container{clear:both;max-width:100%}...

forms
In a POST request resulting from an HTML form submission, the Content-Type of the request is specified by the enctype attribute on the <form> element.

html

Copy
<form action="/foo" method="post" enctype="multipart/form-data">
  <input type="text" name="description" value="Description input value" />
  <input type="file" name="myFile" />
  <button type="submit">Submit</button>
</form>
The request looks something like the following example with some headers omitted for brevity. In the request, a boundary of ExampleBoundaryString is used for illustration, but in practice, a browser would create a string more like this ---------------------------1003363413119651595289485765.

http

Copy
POST /foo HTTP/1.1
Content-Length: 68137
Content-Type: multipart/form-data; boundary=ExampleBoundaryString

--ExampleBoundaryString
Content-Disposition: form-data; name="description"

Description input value
--ExampleBoundaryString
Content-Disposition: form-data; name="myFile"; filename="foo.txt"
Content-Type: text/plain

[content of the file foo.txt chosen by the user]
--ExampleBoundaryString--
Content-Type in URL-encoded form submission
When forms don't involve file uploads and are using simpler fields, URL-encoded forms may be more convenient where the form data is included in the request body:

html

Copy
<form action="/submit" method="post">
  <label for="comment">Comment:</label>
  <input type="text" id="comment" name="comment" value="Hello!" />
  <button type="submit">Submit</button>
</form>
http

Copy
POST /submit HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 16

comment=Hello%21
Content-Type in a REST API using JSON
Many REST APIs use application/json as a content type which is convenient for machine-to-machine communication or programmatic interaction. The following example shows a 201 Created response showing the result of a successful request:

http

Copy
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "New user created",
  "user": {
    "id": 123,
    "firstName": "Paul",
    "lastName": "Klee",
    "email": "p.klee@example.com"
  }
}
Specifications
`


})();
(() => {
    `
POST / HTTP/1.1
Host: localhost:8000
Content-Type: text/plain
Content-Length: 15

1 + 1; console.log("Hi");
`
    const server = http.createServer((req, res) => {
        res.setHeader('content-type', 'multipart/octet-stream');

        repl.start({
            prompt: 'curl repl> ',
            input: req,
            output: res,
            terminal: false,
            useColors: true,
            useGlobal: false,
        });
    });

    server.listen(8000);

})();
