export function setupCounter(element: HTMLButtonElement) {
    let counter = 0
    const setCounter = (count: number) => {
	counter = count
	element.innerHTML = `Count is ${counter}`
    }

    
    const GS = String.fromCharCode(0x1D);
    const US = String.fromCharCode(0x1F);

    const canvas = document.getElementById('quadCanvas');
    const ctx = canvas.getContext('2d');
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const groups = event.data.split(GS);
      const renderGroup = groups[1];

      if (renderGroup) {
        const units = renderGroup.split(US);
        const command = units[0];

        if (command === 'QUAD_FRAME') {
          // 1. Instantiating a native browser DOMQuad using the streamed points
          const quad = new DOMQuad(
            { x: parseFloat(units[1]), y: parseFloat(units[2]) }, // p1
            { x: parseFloat(units[3]), y: parseFloat(units[4]) }, // p2
            { x: parseFloat(units[5]), y: parseFloat(units[6]) }, // p3
            { x: parseFloat(units[7]), y: parseFloat(units[8]) }  // p4
          );

          // 2. Clear canvas context frame
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 3. Draw the quadrilateral using the unified DOMQuad point structure
          ctx.strokeStyle = '#00e5ff';
          ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
          ctx.lineWidth = 2;
          
          ctx.beginPath();
          ctx.moveTo(quad.p1.x, quad.p1.y);
          ctx.lineTo(quad.p2.x, quad.p2.y);
          ctx.lineTo(quad.p3.x, quad.p3.y);
          ctx.lineTo(quad.p4.x, quad.p4.y);
          ctx.closePath();
          
          ctx.fill();
          ctx.stroke();
        }
      }
    };
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
}
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
