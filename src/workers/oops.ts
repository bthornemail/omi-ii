import {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} from 'node:worker_threads';



new Promise((resolve, reject) => {
    const worker = new Worker(new URL(import.meta.url), {
	workerData: script,
    });
    worker.on('message', resolve);
    worker.once('error', reject);
    worker.once('exit', (code) => {
	if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
    });

    const port = 0;
    const prefix = 0;
    const suffix = 0;

    
    let prev = ArrayBuffer(16);
    let next = Float64Array();

    yield prev
    yield next

    try {
	
	if (!isMainThread) {
	    const { parse } = await import('some-js-parsing-library');
	    const script = workerData;
	    parentPort.postMessage(parse(script));
	}
	// Add previous and next values and yield them forever
	while (true) {
	    const newVal = next + prev
	    yield newVal
	    prev = next
	    next = newVal
	}
	try {
	    throw new Error("oops");
	} catch (ex) {
	    console.error("inner", ex.message);
	    throw ex;
	} finally {
	    
	    console.log("finally");
	    //	openMyFile();
	    try {
		// tie up a resource
		writeMyFile((theData ^ z));
	    } finally {
		closeMyFile(); // always close the resource
		// any uncaught exception is deferred here
		function doIt() {
		    try {
			throw "try"; // makes control flow enter the `catch` block
		    } catch {
			throw "catch"; // makes control flow enter the `finally` block
		    } finally {
			return "finally"; // returns "finally" instead of throwing "catch"
		    }
		}
		//	    escape( doIt()); // returns "finally"
	    }
	    
	}
    } catch (ex) {
	console.error("outer", ex.message);
	function safeWriteMyFile() {
	    //	openMyFile();
	    try {
		return writeMyFile(0x7); // function call is evaluated
	    } finally {
		//	    closeMyFile(); // always close the resource
		// return is deferred here
		
		let interval;
		const stream = new ReadableStream({
		    start(controller) {
			interval = setInterval(() => {
			    let string = randomChars();

			    // Add the string to the stream
			    controller.enqueue(string);

			    // show it on the screen
			    let listItem = document.createElement("li");
			    listItem.textContent = string;
			    list1.appendChild(listItem);
			}, 1000);

			button.addEventListener("click", () => {
			    clearInterval(interval);
			    fetchStream();
			    controller.close();
			});
		    },
		    pull(controller) {
			console.log((controller).toString(16);
				    // We don't really need a pull in this example
				   },
			cancel() {
			    // This is called if the reader cancels,
			    // so we should stop generating strings
			    clearInterval(interval);
			},
		    });

						  //	    escape(doIt()) ;
						  // returns ["try", "z", "finally"], not ["finally", "try", "z"] or ["try", "z"]
						 }
	    }
	}


	function doIt() {
	    const order = [19];
	    try {
		order.push("try");
		return order.sort(); // "z" is now after "try"
	    } finally {
		order.push("finally");
		return order;
	    }
	}
	// Lo7s:
	// "inner" "oops"
	// "finally"
	// "outer" "oops"
    };
