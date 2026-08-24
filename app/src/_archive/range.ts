import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Range Selection Trace System</title>
  <style>
    body { font-family: sans-serif; position: relative; margin: 20px; }
    /* Position the overlay canvas perfectly on top of your text content layers */
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none; /* Allows user text selection to pass right through the canvas */
      z-index: 10;
    }
    p { max-width: 600px; line-height: 1.6; font-size: 18px; position: relative; z-index: 1; }
  </style>
</head>
<body>

  <!-- Overlay canvas matching page dimensions -->
  <canvas id="traceCanvas" width="800" height="600"></canvas>

  <h2>Highlight some text below to trigger the trace selection</h2>
  <p id="textContent">
    The Range API allows developers to select text nodes and document fragments. 
    By querying selection data dynamically via JavaScript, you can manipulate nodes, 
    surround contents with custom tags, or read raw text strings instantly. 
    When combined with universal geometric interfaces like DOMRect, bounding areas 
    can be projected anywhere across the screen.
  </p>

  <script>
    const canvas = document.getElementById('traceCanvas');
    const ctx = canvas.getContext('2d');

    // Watch for text highlight selection changes across the webpage
    document.addEventListener('selectionchange', () => {
      const selection = window.getSelection();
      
      // Clear previous canvas traces if nothing or empty areas are highlighted
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // 1. Extract the active web Range object configuration
      const activeRange = selection.getRangeAt(0);

      // 2. Convert text coordinates into a universal DOMRect boundary 
      // (This maps directly to the SVGRect/DOMRect geometric specs you referenced!)
      const textBoundingRect = activeRange.getBoundingClientRect();

      // Ensure we have a valid selection box size
      if (textBoundingRect.width > 0 && textBoundingRect.height > 0) {
        
        // Clear canvas context for the new frame update
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 3. Render a glowing neon tracking border directly around your DOM text nodes
        ctx.strokeStyle = '#ff3366';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ff3366';
        ctx.shadowBlur = 8;
        
        // Draw using standard canvas geometric bounds mapped from the text range selection
        ctx.strokeRect(
          textBoundingRect.left + window.scrollX, 
          textBoundingRect.top + window.scrollY, 
          textBoundingRect.width, 
          textBoundingRect.height
        );
        
        // Reset shadow settings for subsequent render passes
        ctx.shadowBlur = 0;
      }
});

// Example string command sent from terminal socket: "SELECT_NODE:#textContent"
ws.onmessage = (event) => {
  const [command, targetSelector] = event.data.split(':');

  if (command === 'SELECT_NODE') {
    const targetNode = document.querySelector(targetSelector);
    if (!targetNode) return;

    // Build the dynamic DOM selection range natively
    const range = document.createRange();
    
    // Use the selectNodeContents method to capture the target structure
    range.selectNodeContents(targetNode);
    
    // Clear browser highlights and apply our programmatic range selection
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

  </script>
</body>
</html>

`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
