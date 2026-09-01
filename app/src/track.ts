// import worklet from "./worklet";
import setupScene from './componwnts/welcome.page';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Omi-ii Portal</title>
  </style>
</head>
<body>
<h1>Omi-ii Portal</h1>
<div id="root-element"></div>
<!-- Your native browser Canvas element -->
  <canvas id="root-canvas" width="400" height="300"></canvas>
<div>
<ul id="root-list"></ul>
<table id="root-table"></table>
<form id="root-form"></form>
</div>
<audio id="musicplayer" autoplay>
  <source src="/music/chapter1.mp3" />
</audio>
Audio channels
Each audio buffer may contain different numbers of channels. Most modern audio devices use the basic mono (only one channel) and stereo (left and right channels) settings. Some more complex sets support surround sound settings (like quad and 5.1), which can lead to a richer sound experience thanks to their high channel count. We usually represent the channels with the standard abbreviations detailed in the table below:

Name	Channels
Mono	0: M: mono
Stereo	0: L: left 1: R: right
Quad	0: L: left 1: R: right 2: SL: surround left 3: SR: surround right
5.1	0: L: left 1: R: right 2: C: center 3: LFE: subwoofer 4: SL: surround left 5: SR: surround right
Up-mixing and down-mixing
</body>
</html>
`;

setupScene(
    document.querySelector<HTMLDivElement>('#root-element')!,
    document.querySelector<HTMLCanvasElement>('#root-canvas')!,
    document.querySelector<HTMLUListElement>('#root-list')!,
    document.querySelector<HTMLTableElement>('#root-table')!,
    document.querySelector<HTMLFormElement>('#root-form')!,
    document.querySelector<SVGGeometryElement>('#counter')!
)

    (() => {
A linked list:

        const SymbolTree = require('symbol-tree');
        const tree = new SymbolTree();

        let a = { foo: 'bar' }; // or `new Whatever()`
        let b = { foo: 'baz' };
        let c = { foo: 'qux' };

        tree.insertBefore(b, a); // insert a before b
        tree.insertAfter(b, c); // insert c after b

        console.log(tree.nextSibling(a) === b);
        console.log(tree.nextSibling(b) === c);
        console.log(tree.previousSibling(c) === b);

        tree.remove(b);
        console.log(tree.nextSibling(a) === c);
A tree:

        const SymbolTree = require('symbol-tree');
        const tree = new SymbolTree();

        let parent = {};
        let a = {};
        let b = {};
        let c = {};

        tree.prependChild(parent, a); // insert a as the first child
        tree.appendChild(parent, c); // insert c as the last child
        tree.insertAfter(a, b); // insert b after a, it now has the same parent as a

        console.log(tree.firstChild(parent) === a);
        console.log(tree.nextSibling(tree.firstChild(parent)) === b);
        console.log(tree.lastChild(parent) === c);

        let grandparent = {};
        tree.prependChild(grandparent, parent);
        console.log(tree.firstChild(tree.firstChild(grandparent)) === a);
See api.md for more documentation.
})()
function autoplay() {
    if (navigator.getAutoplayPolicy(video) === "allowed") {
        // The video element will autoplay with audio.
    } else if (navigator.getAutoplayPolicy(video) === "allowed-muted") {
        // Mute audio on video
        video.muted = true;
    } else if (navigator.getAutoplayPolicy(video) === "disallowed") {
        // Set a default placeholder image.
        video.poster = "https://example.com/poster_image_url";
    }

    const video = document.getElementById("video");
    video.addEventListener("play", handleFirstPlay);

    let hasPlayed = false;
    function handleFirstPlay(event) {
        if (!hasPlayed) {
            hasPlayed = true;

            // Remove listener so this only gets called once.
            const vid = event.target;
            vid.removeEventListener("play", handleFirstPlay);

            // Start whatever you need to do after first playback has started
        }
    }

    //

    let startPlayPromise = videoElem.play();

    if (startPlayPromise !== undefined) {
        startPlayPromise
            .then(() => {
                // Start whatever you need to do only after playback
                // has begun.
            })
            .catch((error) => {
                if (error.name === "NotAllowedError") {
                    showPlayButton(videoElem);
                } else {
                    // Handle a load or playback error
                }
            });
    }

    const offlineCtx = new OfflineAudioContext({
        numberOfChannels: 2,
        length: 44100 * 40,
        sampleRate: 44100,
    });
    const source = offlineCtx.createBufferSource();
    // …
}


(() => {
    // set up listener and panner position information
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    const xPos = Math.floor(WIDTH / 2);
    const yPos = Math.floor(HEIGHT / 2);
    const zPos = 295;

    // define other variables

    const audioCtx = new AudioContext();

    const panner = audioCtx.createPanner();
    panner.panningModel = "HRTF";
    panner.distanceModel = "inverse";
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;

    if (panner.orientationX) {
        panner.orientationX.setValueAtTime(1, audioCtx.currentTime);
        panner.orientationY.setValueAtTime(0, audioCtx.currentTime);
        panner.orientationZ.setValueAtTime(0, audioCtx.currentTime);
    } else {
        panner.setOrientation(1, 0, 0);
    }

    const listener = audioCtx.listener;

    if (listener.forwardX) {
        listener.forwardX.setValueAtTime(0, audioCtx.currentTime);
        listener.forwardY.setValueAtTime(0, audioCtx.currentTime);
        listener.forwardZ.setValueAtTime(-1, audioCtx.currentTime);
        listener.upX.setValueAtTime(0, audioCtx.currentTime);
        listener.upY.setValueAtTime(1, audioCtx.currentTime);
        listener.upZ.setValueAtTime(0, audioCtx.currentTime);
    } else {
        listener.setOrientation(0, 0, -1, 0, 1, 0);
    }

    let source;

    const play = document.querySelector(".play");
    const stop = document.querySelector(".stop");

    const boomBox = document.querySelector(".boom-box");

    const listenerData = document.querySelector(".listener-data");
    const pannerData = document.querySelector(".panner-data");

    leftBound = -xPos + 50;
    rightBound = xPos - 50;

    xIterator = WIDTH / 150;

    // listener will always be in the same place for this demo

    5    if (listener.positionX) {
        listener.positionX.setValueAtTime(xPos, audioCtx.currentTime);
        listener.positionY.setValueAtTime(yPos, audioCtx.currentTime);
        listener.positionZ.setValueAtTime(300, audioCtx.currentTime);
    } else {
        listener.setPosition(xPos, yPos, 300);
    }

    listenerData.textContent = `Listener data: X ${xPos} Y ${yPos} Z 300`;

    // panner will move as the boombox graphic moves around on the screen
    function positionPanner() {
        if (panner.positionX) {
            panner.positionX.setValueAtTime(xPos, audioCtx.currentTime);
            panner.positionY.setValueAtTime(yPos, audioCtx.currentTime);
            panner.positionZ.setValueAtTime(zPos, audioCtx.currentTime);
        } else {
            panner.setPosition(xPos, yPos, zPos);
        }
        pannerData.textContent = `Panner data: X ${xPos} Y ${yPos} Z ${zPos}`;
    }
})()
