import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'
export function (matrix: HTMLDivElement)=>{

    // 1. Create a 4x4 matrix from a raw text socket payload array
    // Input array positions map to: m11, m12, m21, m22, m31, m32, m41, m42 (2D) 
    // or all 16 items for full 3D matrices.
    const rawSocketArray =;
    const transformMatrix = new DOMMatrix(rawSocketArray);

    // 2. Define a 3D/4D Vector Space coordinate point (X, Y, Z, W)
    // W defaults to 1 for standard coordinate translations
    const spacePoint = new DOMPoint(10, 20, 0, 1);

    // 3. Transform the point via Matrix Vector Multiplication
    // This internally performs the algebraic dot product defined by the specification
    const projectedResult = spacePoint.matrixTransform(transformMatrix);

    console.log(`Render Coordinates -> X: ${projectedResult.x}, Y: ${projectedResult.y}`);
    // Output: X: 60, Y: 120 (Original point translated by 50, 100)
    let cameraMatrix = new DOMMatrix(); // View Transformation Matrix (A)

    ws.onmessage = (event) => {
	const [command, payload] = event.data.split(':');
	const values = payload.split(',').map(Number);
	
	if (command === 'SET_CAMERA') {
	    // Overwrite the base view projection
	    cameraMatrix = new DOMMatrix(values);
	    
	} else if (command === 'POST_TRANSFORM') {
	    // Standard chain multiplication (A · B)
	    const nextTransform = new DOMMatrix(values);
	    cameraMatrix = cameraMatrix.multiply(nextTransform);
	    
	} else if (command === 'PRE_TRANSFORM') {
	    // Pre-multiply matrix injection (B · A)
	    const baseTransform = new DOMMatrix(values);
	    cameraMatrix = baseTransform.multiply(cameraMatrix);
	}
    };

}
