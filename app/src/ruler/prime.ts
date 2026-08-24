export type DELTA = Int16Array;
     
export function unfold(){

}
export function view(tensor: SharedArrayBxuffer,delta:DELTA){
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
    return *function call(port,prefix,suffix){
	let prev = 0
	let next = 1

	yield prev
	yield next

	// Add previous and next values and yield them forever
	while (true) {
	    const newVal = next + prev

	    yield newVal

	    prev = next
	    next = newVal
	}
}

export function bind(element: HTMLButtonElement) {
    const imo = new ArrayBuffer(60 * 16 * 4);
    const omi = new Uint8Array(imo);
    const metron = (metric: Uint8Array,meta: number)=>{
	Atomics.compareExchange(omi, 0,2,1)
	Atomics.compareExchange(omi, 1,0,2)
	Atomics.compareExchange(omi, 2,1,0)
	alert("Connected");
	if (Atomics.compareExchange(omi, 0,2,1)) {throw( new Float64Array(tensor)); }
	return function apply(tensor: SharedArrayBuffer){
	    const delta = new Int16Array(tensor);
	    const omi = new Int16Array(imo,tensor.ByteLength);
	    const projection = meta ^
		Atomics.compareExchange(delta, 0,4,2) ^
		Atomics.compareExchange(delta, 2,6,4) ^
		Atomics.compareExchange(delta, 4,8,6) ^
		Atomics.compareExchange(delta, 6,0,8) ^
		Atomics.compareExchange(delta, 8,2,0) ^
		Atomics.compareExchange(omi, 1,5,3) ^
		Atomics.compareExchange(omi, 3,7,5) ^ 
		Atomics.compareExchange(omi, 5,9,7) ^
		Atomics.compareExchange(omi, 7,1,9) ^
		Atomics.compareExchange(omi, 9,3,1)

	    return new Float64Array(
		tensor,
		Atomics.compareExchange(delta,17,17,projection),
		Atomics.compareExchange(omi,17,19,projection)
	    );
	}
    };
    
    const coordinate = (metric: number[], tensor: Uint8Array = imo)=>{
	const view = new DataView(metron(metric), delta(tensor));
	;
	element.innerHTML = `Coordinate is ${view.getUInt8(1)}\nPath is ${view.getInt16(1)}`
    }
    const applyDelta = (delta: number[]) => {	
	console.log("Applying Delta ",metron(delta).toString(16));
	Atomics.compareExchange(omi, 2,6,4)
	Atomics.compareExchange(omi, 4,8,6)
	Atomics.compareExchange(omi, 8,1,0)
	
	Atomics.compareExchange(omi, 1,5,3)
	Atomics.compareExchange(omi, 3,7,5)
	Atomics.compareExchange(omi, 5,9,7)
	Atomics.compareExchange(omi, 7,1,9)
	Atomics.compareExchange(omi, 9,3,1)
	return new Float64Array(
	    delta,
	    Atomics.compareExchange(omi,17,17,0),
	    Atomics.compareExchange(omi,17,19,60)
	);
    }
}
function cast(tensor: SharedArrayBuffer,delta:DELTA,fn){
    function fn2workerURL(fn) {
	const blob = new Blob([`(${fn.toString()})()`], { type: "text/javascript" });
	return URL.createObjectURL(blob);
    }
}
