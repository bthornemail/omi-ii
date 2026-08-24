function PollingWorker(url, defaultListener, onError){
    // Continuous polling
    const pollLoop = () => {
	const interval = setInterval(() => {
            const client = new net.Socket();
            
            client.connect(8080, 'localhost', () => {
		client.write('poll');
            });
            
            client.on('data', (data) => {
		const state = JSON.parse(data.toString());
		console.log('State:', state);
		client.destroy();
            });
            
            client.on('error', (err) => {
		console.error('Polling error:', err.message);
            });
	}, 1000); // Poll every second
	
	return () => clearInterval(interval);
    };

    // Start polling
    const stop = pollLoop();
    // Create a 32MB "file" and fill it with consecutive values from 0 to 255 – 32MB = 1024 * 1024 * 32
    const uInt8Array = new Uint8Array(1024 * 1024 * 32).map((v, i) => i);
    worker.postMessage(uInt8Array.buffer, [uInt8Array.buffer]);
    // Stop after 10 seconds
    setTimeout(stop, 10000);
    
};
function QueryableWorker(url, defaultListener, onError) {
  const worker = new Worker(url);
  const listeners = {};

  this.defaultListener = defaultListener ?? (() => {});

  if (onError) {
    worker.onerror = onError;
  }

  this.postMessage = (message) => {
    worker.postMessage(message);
  };

  this.terminate = () => {
    worker.terminate();
  };
}
