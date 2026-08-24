export function Canvas(globalTransform: DOMMatrix,canvas:HTMLCanvasElement) {
    const canvas = document.getElementById('geometryCanvas');
    const ctx = canvas.getContext('2d');
    
    private context: CanvasRenderingContext2D;
    private paint: boolean;l
    // Track globally using the unified interface configuration
    function canvasEventRegister(event){
	const [header, rawData] = event.data.split(':');
	if (header === '') {
	    // Rehydrate the raw text directly into a modern universal matrix instance
	    const floatValues = rawData.split(',').map(Number);
	    globalTransform = new DOMMatrix(floatValues);
	    
	} else if (header === 'DRAW_POINT') {
	    const [rawX, rawY] = rawData.split(',').map(Number);
	    
	    // Define a localized point structure natively
	    const structuralPoint = new DOMPoint(rawX, rawY);
	    
	    // Perform the exact transformation calculations instantly across contexts
	    const targetPoint = structuralPoint.matrixTransform(globalTransform);
	    
	    // Render inside your standard Canvas frame 
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.fillStyle = '#00ffcc';
	    ctx.beginPath();
	    ctx.arc(targetPoint.x, targetPoint.y, 10, 0, Math.PI * 2);
	    ctx.fill();
	})
    element.addEventListener('click',canvasEventRegister);
}
