document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Remote Canvas Stream</title>
  <style>
    body {
      background: #111;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    canvas {
      background: #000;
      border: 2px solid #333;
      border-radius: 8px;
}
body {
  font: 1.2em / 1.2 sans-serif;
}
li {
  background-image: paint(boxbg);
  --box-color: hsl(55 90% 60%);
}

li:nth-of-type(3n) {
  --box-color: hsl(155 90% 60%);
  --width-subtractor: 20;
}

li:nth-of-type(3n + 1) {
  --box-color: hsl(255 90% 60%);
  --width-subtractor: 40;
}
  </style>
</head>
<body>

<p id="audio">
</p>
</body>
</html>
`;

async function AP() {
    const context = new AudioContext();
    // Loads module script with AudioWorklet.
    const doc = document.getElementById('audio')
    if (doc) {
        console.log(context ?? {});
    }
    try {
        await context.audioWorklet.addModule('/data/data/com.termux/files/home/omi-ii/app/src/gain-processor.js').then(() => {
            if (!doc) throw new Error();
            let oscillator = new OscillatorNode(context);
            console.log(oscillator.context);

            // After the resolution of module loading, an AudioWorkletNode can be
            // constructed.
            let gainWorkletNode = new AudioWorkletNode(context, 'gain-processor');

            console.log(context.destination);
            // AudioWorkletNode can be interoperable with other native AudioNodes.
            oscillator.connect(gainWorkletNode).connect(context.destination);
            oscillator.start();
        });
        if (!doc) throw new Error();
        console.log(context);

    } catch (e) {
        if (!doc) throw new Error();
        console.log(e)
    }
}

AP().then((e) => { console.log(e) });
