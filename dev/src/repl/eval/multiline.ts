import repl from 'node:repl';

export default function multilineEval(cmd, context, filename, callback) {
    // #!/data/data/com.termux/files/usr/bin/node
    let result;
    try {
//        createContext(this.context);
        result = runInContext(cmd, context);//this.context);
    } catch (e: Error) {
        if (isRecoverableError(e)) {
            console.log("Recoverable");
            return callback(new repl.Recoverable(e));
        }

    }
    callback(null, result);
};
