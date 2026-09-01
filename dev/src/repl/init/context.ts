import { Buffer } from 'node:buffer';

export default function initializeContext(context = {}) {
    context.m = 'test';
    const msg = 'message';
    Object.defineProperty(context, 'msg', {
        configurable: false,
        enumerable: true,
        value: msg,
    });

}
