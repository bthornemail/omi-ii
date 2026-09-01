import { Buffer } from 'node:buffer';

export default function initializeRepl(server) {
    server.defineCommand('sayhello', {
        help: 'Say hello',
        action(name) {
            this.clearBufferedCommand();
            console.log(`Hello, ${name}!`);
            this.displayPrompt();
        },
    });
    server.defineCommand('reload', function reload() {
        console.log('Goodbye!');
        initializeContext();
    });
    server.defineCommand('toJson', function() {
        const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
        const json = JSON.stringify(buf);

        console.log(json);
        // Prints: {"type":"Buffer","data":[1,2,3,4,5]}

        const copy = JSON.parse(json, (key, value) => {
            return value && value.type === 'Buffer' ?
                Buffer.from(value) :
                value;
        });

        console.log(copy);
        // Prints: <Buffer 01 02 03 04 05>
    });
}
