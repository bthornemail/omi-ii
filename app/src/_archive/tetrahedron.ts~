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
  <title>DOMQuad Matrix Trace Layer</title>
  <style>
    body { background: #111; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    canvas { background: #000; border: 1px solid #333; }
  </style>
</head>
<body>

  <canvas id="zero-tetrahedron" width="400" height="350"></canvas>

  <script>
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
  </script>
</body>
</html>

`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
