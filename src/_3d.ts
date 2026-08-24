// We'll split the element up
// into 300x300 cells:
const gridSize = 300;
const density = props.get('--confetti-density').value;
const seed = props.get('--confetti-seed').value;
// Create our initial random generator:
const randomXs = randomGenerator(seed);

for (let x = 0; x < bounds.width; x += gridSize) {
  // Fork it for each column:
  const randomYs = randomXs.fork();

  for (let y = 0; y < bounds.height; y += gridSize) {
    // Fork it again for each cell:
    const randomItems = randomYs.fork();

    for (let _ = 0; _ < density; _++) {
      const confettiX = randomItems.next() * gridSize + x;
      const confettiY = randomItems.next() * gridSize + y;
      // TODO: Draw confetti at
      // confettiX, confettiY.
    }
  }
}
