export function setupCounter(n) {
    let counter = 0
    const setCounter = (count: number) => {
	counter = count
	element.innerHTML = `Count is ${counter}`
    }
    setCounter(n)
}
function rotation(element: HTMLNode){
    element.addEventListener('click', () => setCounter(counter + 1))
    // Browser side: Validate the incoming version identifier
    let expectedVersion = "v123";

    ws.onmessage = (event) => {
	const [version, payload] = event.data.split(':');
	
	// If the version doesn't match our current state, discard it immediately
	if (version !== expectedVersion) return; 
	
	const [x, y] = payload.split(',').map(Number);
	draw(x, y);
    };
    // Browser side: Enforce strict chronological order tracking
    let lastRenderedFrame = 0;

    ws.onmessage = (event) => {
	const [frameIdString, coordinates] = event.data.split('#');
	const frameId = parseInt(frameIdString, 10);
	
	// Cache busting logic applied to frames:
	// If an older packet arrives late due to network jitter, ignore it!
	if (frameId <= lastRenderedFrame) return;
	
	lastRenderedFrame = frameId;
	const [x, y] = coordinates.split(',').map(Number);
	draw(x, y);
    };
    // Browser side: Keep a dictionary cache of complex pre-rendered path calculations
    const preRenderedCache = new Map();
    let currentActiveHash = "";

    ws.onmessage = (event) => {
	const [header, data] = event.data.split(':');
	
	if (header === 'HASH') {
	    currentActiveHash = data;
	    // If we haven't drawn this static background layout hash yet, build it once
	    if (!preRenderedCache.has(currentActiveHash)) {
		preRenderedCache.set(currentActiveHash, generateStaticGridLines());
	    }
	} else if (header === 'DRAW') {
	    const [x, y] = data.split(',').map(Number);
	    
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    // Draw the immutable cached background structure instantly
	    ctx.putImageData(preRenderedCache.get(currentActiveHash), 0, 0);
	    // Draw the fresh raw dynamic coordinates on top
	    drawCircle(x, y);
	}
    };
}
