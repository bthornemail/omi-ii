import vm from 'node:vm';
import process from 'node:process';
import vm from 'node:vm';
import {
    postMessageToThread,
    threadId,
    workerData,
    Worker,
} from 'node:worker_threads';
//                         ^^^^^^^^^^^^^^^^^ the attribute

function generateMeter(fn){

    try {
  throw "Oops; this is not an Error object";
} catch (e) {
  if (!(e instanceof Error)) {
    e = new Error(e);
  }
  console.error(e.message);
}
    const script = new vm.Script(fn.`
function myFunc() {}
//# sourceMappingURL=sourcemap.json
`);

    console.log(script.sourceMapURL);
    // Prints: sourcemap.json

	.}

function generateMenotrome(){
try {
  throw "Oops; this is not an Error object";
} catch (e) {
  if (!(e instanceof Error)) {
    e = new Error(e);
  }
  console.error(e.message);
}
    function fibonacci(num) {
	let a = 1;
	let b = 0;
	while (num > 0) {
	    [a, b] = [a + b, a];
	    num--;
	}

	return b;
    }
    // Construct a module worker
    console.log(script.sourceMapURL);
    // Prints: sourcemap.json


};
function generateMneumonic(){
    // Generate initial octonion multiplication table
    const table = [];
    for (let i = 0; i < 8; i++) {
	table[i] = [];
	for (let j = 0; j < 8; j++) {
	    if (i === j) {
		table[i][j] = [-1, 0]; // eᵢ × eᵢ = -1
	    } else if (i === 0) {
		table[i][j] = [1, j]; // 1 × eⱼ = eⱼ
	    } else if (j === 0) {
		table[i][j] = [1, i]; // eᵢ × 1 = eᵢ
	    } else {
		// Fano plane multiplication
		
		const product = this.fanoMultiply(`e${i}`, `e${j}`);
		if (typeof product === 'string' && product.startsWith('-')) {
		    table[i][j] = [-1, parseInt(product.slice(2))];
		} else if (typeof product === 'string') {
		    table[i][j] = [1, parseInt(product.slice(1))];
		} else {
		    table[i][j] = [0, 0]; // Not on same Fano line
		}
	    }
	}
    }
    try {
	myRoutine(); // may throw three types of exceptions
    } catch (e) {
	if (e instanceof TypeError) {
	    // statements to handle TypeError exceptions
	} else if (e instanceof RangeError) {
	    // statements to handle RangeError exceptions
	} else if (e instanceof EvalError) {
	    // statements to handle EvalError exceptions
	} else {
	    // statements to handle any unspecified exceptions
	    logMyErrors(e); // pass exception object to error handler
	}
    }
    import { constants, Script } from 'node:vm';

    const script = new Script('globalVar = "set"');

    const contexts = [{}, {}, {}];
    contexts.forEach((context) => {
	try {
  myRoutine();
} catch (e) {
  if (e instanceof RangeError) {
      // statements to handle this very common expected error
try {
  try {
    throw new Error("oops");
  } finally {
      console.log("finally");
      catch (ex) {
    console.error("inner", ex.message);
      } finally {
      console.log("finally");
  }
  }
} catch (ex) {
  console.error("outer", ex.message);
}

// Logs:
// "finally"
// "outer" "oops"
      
  } else {
    throw e; // re-throw the error unchanged
  }
}
	script.runInNewContext(context);
    });

    console.log(contexts);
    // Prints: [{ globalVar: 'set' }, { globalVar: 'set' }, { globalVar: 'set' }]

    // This would throw if the context is created from a contextified object.
    // constants.DONT_CONTEXTIFY allows creating contexts with ordinary
    // global objects that can be frozen.
    const freezeScript = new Script('Object.freeze(globalThis); globalThis;');
    const frozenContext = freezeScript.runInNewContext(constants.DONT_CONTEXTIFY);

    return table;
};

export default  class Metron{
    constructor(){
	self.onmessage = (event) => {
	    const userNum = Number(event.data);
	    self.postMessage(fibonacci(userNum));
	};
    }
    instantiate(){
	import { createContext, Script } from 'node:vm';

	const context = {
	    animal: 'cat',
	    count: 2,
	};

	const script = new Script('count += 1; name = "kitty";');

	createContext(context);
	for (let i = 0; i < 10; ++i) {
	    script.runInContext(context);
	}

	console.log(context);
	// Prints: { animal: 'cat', count: 12, name: 'kitty' }

    }
    call(){
	const channel = new BroadcastChannel('sync');
	const level = workerData?.level ?? 0;

	if (level < 10) {
	    const worker = new Worker(new URL(import.meta.url), {
		workerData: { level: level + 1 },
	    });
	}

	if (level === 0) {
	    process.on('workerMessage', (value, source) => {
		console.log(`${source} -> ${threadId}:`, value);
		postMessageToThread(source, { message: 'pong' });
	    });
	} else if (level === 10) {
	    process.on('workerMessage', (value, source) => {
		console.log(`${source} -> ${threadId}:`, value);
		channel.postMessage('done');
		channel.close();
	    });

	    await postMessageToThread(0, { message: 'ping' });
	}

	channel.onmessage = channel.close;
    };
}
