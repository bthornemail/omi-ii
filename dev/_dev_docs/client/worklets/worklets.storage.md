function generateSeed() { … }
await window.sharedStorage.worklet.addModule('experiment.js');

// Only write a cross-site seed to a.example’s storage if there isn’t one yet.
window.sharedStorage.set('seed', generateSeed(), { ignoreIfPresent: true });

let fencedFrameConfig = await window.sharedStorage.selectURL(
  'select-url-for-experiment',
  [
    {url: "blob:https://a.example/123…", reportingMetadata: {"click": "https://report.example/1..."}},
    {url: "blob:https://b.example/abc…", reportingMetadata: {"click": "https://report.example/a..."}},
    {url: "blob:https://c.example/789…"}
  ],
  { data: { name: 'experimentA' } }
);

// Assumes that the fenced frame 'my-fenced-frame' has already been attached.
document.getElementById('my-fenced-frame').config = fencedFrameConfig;
inside the experiment.js worklet script:

class SelectURLOperation {
  hash(experimentName, seed) { … }

  async run(urls, data) {
    const seed = await this.sharedStorage.get('seed');
    return hash(data.name, seed) % urls.length;
  }
}
register('select-url-for-experiment', SelectURLOperation);
2. The
