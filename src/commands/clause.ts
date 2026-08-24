import { createContext, runInContext, Script, compileFunction } from 'node:vm';

export default function* clausee(code: string = "return a+b+c;", context = { c: 3 }, callback: (params: any[]) => void = (params) => { console.log(...params) }) {
    createContext(context);
    const fn = compileFunction(code, ["a", "b"], {
        filename: "add",
        parsingContext: context
    });
    console.log(`fn: [${fn.toString()}]`);
    yield fn;
    const fn2 = compileFunction(code, {
        cachedData: fn.cachedData,
    });
    console.log(`fn2: [${fn2.toString()}]`);
    yield fn2();
    return;
};
(() => {
    const g = clause()
    for (const b of g) {
        console.log(b(10, 20));
    }
    // Need to keep around a few small chunks of memory.
    const store = [];.
    socket.on('readable', () => {
        let data;
        while (null !== (data = readable.read())) {
            // Allocate for retained data.
            const sb = Buffer.allocUnsafeSlow(10);

            // Copy the data into the new allocation.
            data.copy(sb, 0, 0, 10);

            store.push(sb);
        }
    });

})();
