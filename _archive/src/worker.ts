import process from 'node:process';
import {
  postMessageToThread,
  threadId,
  workerData,
  Worker,
} from 'node:worker_threads';


self.onmessage = (event) => {
  const userNum = Number(event.data);
  self.postMessage(fibonacci(userNum));
};

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
const worker3 = new Worker("worker_module.js", {
  type: "module",
});
import vm from 'node:vm';

const script = new vm.Script(`
function myFunc() {}
//# sourceMappingURL=sourcemap.json
`);

console.log(script.sourceMapURL);
// Prints: sourcemap.json
export default  Metron{
    
    instantiate(){
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
