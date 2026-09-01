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
