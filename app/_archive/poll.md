import './style.css'
//import typescriptLogo from './assets/typescript.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import json from './assets/memory.json'
import setupCanvas from './canvas.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div>
Canvas View
<canvas id="canvas" width="320" height="200" style="border: 1px solid black;">
</canvas>

<table id="controller">
  <caption>Monthly savings</caption>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>
<h1>Server-Sent Events</h1>
    <ul id="events"></ul>

<button id="toggle">Toggle</button>
</div>
`
/*
function poll(){
    // Initialize the EventSource, listening for server updates
    const eventSource = new EventSource('http://localhost:3000/');
    eventSource.addEventListener('poll', function(event) {
	console.log('Custom event received:', event.data);
    });
    // Listen for messages from the server
    eventSource.onmessage = function(event) {
        const newElement = document.createElement("li");
        newElement.textContent = event.data;
        document.getElementById("events").appendChild(newElement);
    };
    }
*/
    function init(){
	//const worker = new Worker(new URL('./worker.js', import.meta.url), {
	//  type: 'module'
	//})
	// Initialize the EventSource, listening for server updates
	
	const eventSource = new EventSource('http://localhost:8000/poll');
/*	eventSource.addEventListener('poll', function(event) {
	    console.log('Custom event received:', event.data);

            const newElement = document.createElement("li");
            newElement.textContent = event.data;
            document.getElementById("events").appendChild(newElement);
	    });
*/
	// Listen for messages from the server
	eventSource.onmessage = function(event) {
	    alert(`Custom event received: ${event.data}`);
	};
    }

init();
setupCanvas(
    document.querySelector<HTMLButtonElement>('#toggle')!,
    document.querySelector<HTMLCanvasElement>('#canvas')!,
    document.querySelector<HTMLTableElement>('#controller')!
)
