import { WebSocketServer, WebSocket } from 'ws';

// Start a websocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });
console.log('🚀 WebSocket server running on ws://localhost:8080');

wss.on('connection', (ws: WebSocket) => {
    console.log('📱 Browser connected to canvas stream!');

    // Example: Send a canvas drawing update loop every 16ms (~60fps)
    let x = 50;
    let y = 50;
    let dx = 4;
    let dy = 3;
    // Send raw matrix update vectors over the raw text protocol
    // Format: "MATRIX:a,b,c,d,e,f"
    const matrixPayload = `MATRIX:1,0,0,1,50,100`;
    if (ws.readyState === WebSocket.OPEN) {
	ws.send(matrixPayload);
    }

    const gameLoop = setInterval(() => {
	// Basic physics loop calculation
	x += dx;
	y += dy;
	if (x < 20 || x > 380) dx *= -1;
	if (y < 20 || y > 280) dy *= -1;

	// Send drawing coordinates to the browser canvas
	const drawCommand = {
	    type: 'DRAW_BALL',
	    payload: { x, y, radius: 15, color: '#007acc' }
	};

	if (ws.readyState === WebSocket.OPEN) {
	    // Server side: Append an incremental frame ID sequence
	    let frameSequence = 0;

	    const loop = setInterval(() => {
		frameSequence++;
		// Outputs format like: "4812#240,180"
		const rawTrace = `${frameSequence}#${Math.floor(x)},${Math.floor(y)}`;
		ws.send(rawTrace);
	    }, 16);
	    // Server side: Notify client of a background structural layout change using a hash
	    const layoutHash = "YsAIAAAA-QG4G6kCMAMBAAAAAAAoK";
	    ws.send(`HASH:${layoutHash}`);

	    // Followed by standard drawing inputs
	    ws.onMessage(`DRAW:${x},${y}`);

	    ws.send(JSON.stringify(drawCommand));
	}


	// Server side: Prefix each coordinate with a configuration version id
	const currentConfigVersion = "v123";
	const message = `${currentConfigVersion}:${x},${y}`;
	ws.send(message);

    }, 16);

    ws.on('close', () => {
	clearInterval(gameLoop);
	console.log('❌ Browser disconnected.');
    });
});
import { WebSocketServer, WebSocket } from 'ws';

// Define explicit ASCII character code constants
const FS = String.fromCharCode(0x1C);
const GS = String.fromCharCode(0x1D);
const RS = String.fromCharCode(0x1E);
const US = String.fromCharCode(0x1F);

const wss = new WebSocketServer({ port: 8080 });
console.log('🚀 ASCII Control Stream Server running on ws://localhost:8080');

wss.on('connection', (ws: WebSocket) => {
    let frameId = 0;
    
    const streamLoop = setInterval(() => {
	frameId++;
	
	// 1. Assemble Cache/Trace redundancy metrics using Record & Unit parameters
	const traceRecord = `FILE_VERSION${US}bundle.v${frameId}.js`;
	const styleRecord = `STYLE_VERSION${US}build.v${frameId}.css`;
	const traceGroup = `${traceRecord}${RS}${styleRecord}`;

	// 2. Assemble Canvas Spatial vectors or Matrix coordinates
	const mockX = Math.floor(100 + Math.sin(frameId * 0.05) * 50);
	const mockY = Math.floor(150 + Math.cos(frameId * 0.05) * 50);
	const renderRecord = `CANVAS_DRAW${US}${mockX}${US}${mockY}`;
	const renderGroup = `${renderRecord}`;

	// 3. Chain groupings using Group Separators (GS)
	const rawPacket = `${traceGroup}${GS}${renderGroup}`;

	if (ws.readyState === WebSocket.OPEN) {
	    ws.send(rawPacket);
	}
    }, 32);

    ws.on('close', () => clearInterval(streamLoop));
});
import { WebSocketServer, WebSocket } from 'ws';

const GS = String.fromCharCode(0x1D); // Group Separator
const RS = String.fromCharCode(0x1E); // Record Separator
const US = String.fromCharCode(0x1F); // Unit Separator

const wss = new WebSocketServer({ port: 8080 });
console.log('🚀 DOMQuad ASCII Server running on ws://localhost:8080');

wss.on('connection', (ws: WebSocket) => {
    let angle = 0;

    const loop = setInterval(() => {
	angle += 0.02;
	const cos = Math.cos(angle) * 40;
	const sin = Math.sin(angle) * 40;

	// Calculate a rotating, skewed box frame tracking 4 independent corners
	const p1 = `${150 + cos}${US}${150 + sin}`; // Corner 1 (x,y)
	const p2 = `${250 + cos}${US}${130 - sin}`; // Corner 2 (x,y)
	const p3 = `${270 - cos}${US}${230 - sin}`; // Corner 3 (x,y)
	const p4 = `${130 - cos}${US}${210 + sin}`; // Corner 4 (x,y)

	// Pack into an explicit QUAD record payload
	const quadRecord = `QUAD_FRAME${US}${p1}${US}${p2}${US}${p3}${US}${p4}`;
	
	if (ws.readyState === WebSocket.OPEN) {
	    ws.send(`TRACE_GROUP${GS}${quadRecord}`);
	}
    }, 32);

    ws.on('close', () => clearInterval(loop));
});
