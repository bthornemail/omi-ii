
Chrome for Developers


Sign in
Blog

Chrome for Developers
Chrome for Developers
Blog
Was this helpful?

CSS Paint API






Surma 
Surma
New possibilities in Chrome 65
CSS Paint API (also known as “CSS Custom Paint” or “Houdini’s paint worklet”) is enabled by default starting in Chrome 65. What is it? What can you do with it? And how does it work? Well, read on, will ya’…

CSS Paint API allows you to programmatically generate an image whenever a CSS property expects an image. Properties like background-image or border-image are usually used with url() to load an image file or with CSS built-in functions like linear-gradient(). Instead of using those, you can now use paint(myPainter) to reference a paint worklet.

Writing a paint worklet
To define a paint worklet called myPainter, we need to load a CSS paint worklet file using CSS.paintWorklet.addModule('my-paint-worklet.js'). In that file, we can use the registerPaint function to register a paint worklet class:


class MyPainter {
  paint(ctx, geometry, properties) {
    // ...
  }
}

registerPaint('myPainter', MyPainter);
Inside the paint() callback, we can use ctx the same way we would a CanvasRenderingContext2D as we know it from <canvas>. If you know how to draw in a <canvas>, you can draw in a paint worklet! geometry tells us the width and the height of the canvas that is at our disposal. properties I will explain later in this article.

Note: A paint worklet’s context is not 100% the same as a <canvas> context. As of now, text rendering methods are missing and for security reasons you cannot read back pixels from the canvas.
As an introductory example, let’s write a checkerboard paint worklet and use it as a background image of a <textarea>. (I am using a textarea because it’s resizable by default.):


<!-- index.html -->
<!doctype html>
<style>
  textarea {
    background-image: paint(checkerboard);
  }
</style>
<textarea></textarea>
<script>
  CSS.paintWorklet.addModule('checkerboard.js');
</script>

// checkerboard.js
class CheckerboardPainter {
  paint(ctx, geom, properties) {
    // Use `ctx` as if it was a normal canvas
    const colors = ['red', 'green', 'blue'];
    const size = 32;
    for(let y = 0; y < geom.height/size; y++) {
      for(let x = 0; x < geom.width/size; x++) {
        const color = colors[(x + y) % colors.length];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }
}

// Register our class under a specific name
registerPaint('checkerboard', CheckerboardPainter);
If you’ve used <canvas> in the past, this code should look familiar. See the live demo here.

Note: As with almost all new APIs, CSS Paint API is only available over HTTPS (or localhost).
Textarea with a checkerboard pattern as a background image
Textarea with a checkerboard pattern as a background image.
The difference from using a common background image here is that the pattern will be re-drawn on demand, whenever the user resizes the textarea. This means the background image is always exactly as big as it needs to be, including the compensation for high-density displays.

That’s pretty cool, but it’s also quite static. Would we want to write a new worklet every time we wanted the same pattern but with differently sized squares? The answer is no!

Parameterizing your worklet
Luckily, the paint worklet can access other CSS properties, which is where the additional parameter properties comes into play. By giving the class a static inputProperties attribute, you can subscribe to changes to any CSS property, including custom properties. The values will be given to you through the properties parameter.


<!-- index.html -->
<!doctype html>
<style>
  textarea {
    /* The paint worklet subscribes to changes of these custom properties. */
    --checkerboard-spacing: 10;
    --checkerboard-size: 32;
    background-image: paint(checkerboard);
  }
</style>
<textarea></textarea>
<script>
  CSS.paintWorklet.addModule('checkerboard.js');
</script>

// checkerboard.js
class CheckerboardPainter {
  // inputProperties returns a list of CSS properties that this paint function gets access to
  static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

  paint(ctx, geom, properties) {
    // Paint worklet uses CSS Typed OM to model the input values.
    // As of now, they are mostly wrappers around strings,
    // but will be augmented to hold more accessible data over time.
    const size = parseInt(properties.get('--checkerboard-size').toString());
    const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
    const colors = ['red', 'green', 'blue'];
    for(let y = 0; y < geom.height/size; y++) {
      for(let x = 0; x < geom.width/size; x++) {
        ctx.fillStyle = colors[(x + y) % colors.length];
        ctx.beginPath();
        ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
        ctx.fill();
      }
    }
  }
}

registerPaint('checkerboard', CheckerboardPainter);
Now we can use the same code for all different kind of checkerboards. But even better, we can now go into DevTools and fiddle with the values until we find the right look.

Note: It would be great to parameterize the colors, too, wouldn’t it? The spec allows for the paint() function to take a list of arguments. This feature is not implemented in Chrome yet, as it heavily relies on Houdini’s Properties and Values API, which still needs some work before it can ship.
Browsers that don’t support paint worklet
At the time of writing, only Chrome has paint worklet implemented. While there are positive signals from all other browser vendors, there isn’t much progress. To keep up to date, check Is Houdini Ready Yet? regularly. In the meantime, be sure to use progressive enhancement to keep your code running even if there’s no support for paint worklet. To make sure things work as expected, you have to adjust your code in two places: The CSS and the JS.

Detecting support for paint worklet in JS can be done by checking the CSS object: js if ('paintWorklet' in CSS) { CSS.paintWorklet.addModule('mystuff.js'); } For the CSS side, you have two options. You can use @supports:


@supports (background: paint(id)) {
  /* ... */
}
A more compact trick is to use the fact that CSS invalidates and subsequently ignores an entire property declaration if there is an unknown function in it. If you specify a property twice — first without paint worklet, and then with the paint worklet — you get progressive enhancement:


textarea {
  background-image: linear-gradient(0, red, blue);
  background-image: paint(myGradient, red, blue);
}
In browsers with support for paint worklet, the second declaration of background-image will overwrite the first one. In browsers without support for paint worklet, the second declaration is invalid and will be discarded, leaving the first declaration in effect.
