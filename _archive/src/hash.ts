function onReady(ws: WebSocket) => {
    // Server side: Notify client of a background structural layout change using a hash
    const layoutHash = "YsAIAAAA-QG4G6kCMAMBAAAAAAAoK";
    ws.send(`HASH:${layoutHash}`);

    // Followed by standard drawing inputs
    ws.onMessage(`DRAW:${x},${y}`);

    ws.send(JSON.stringify(drawCommand));
    // Server side: Prefix each coordinate with a configuration version id
    const currentConfigVersion = "v123";
    const message = `${currentConfigVersion}:${x},${y}`;
    ws.send(message);
    

    ws.on('close', () => {
	clearInterval(gameLoop);
	console.log('❌ Browser disconnected.');
    });
}
