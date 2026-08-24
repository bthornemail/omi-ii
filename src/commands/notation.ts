import { Blob } from 'node:buffer';

export default function notation() {
    const blob = new Blob(['hello']);
    blob.bytes().then((bytes) => {
        console.log(bytes); // Outputs: Uint8Array(5) [ 104, 101, 108, 108, 111 ]
    });

};
