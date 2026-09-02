The Paint API allows developers to use JavaScript functions to draw directly into an element’s background, border, or content using 2D Rendering Context, which is a subset of the HTML5 Canvas API. Paint API uses Paint Worklet to draw an image that dynamically responds to changes in CSS (changes in CSS variables, for example). Anyone familiar with Canvas API will feel right at home with Houdini’s Paint API.

There are several steps required in defining a Paint Worklet:

Write and register a Paint Worklet using the registerPaint function
Call the Worklet in HTML file or main JavaScript file using CSS.paintWorklet.addModule function
Use the paint() function in CSS with a Worklet name and optional input arguments.
Let’s take a look at the registerPaint function which is used to register a Paint Worklet and define its functionality.

registerPaint("paintWorketExample", class {
  static get inputProperties() { return ["--myVariable"]; }
  static get inputArguments() { return ["<color>"]; }
  static get contextOptions() { return {alpha: true}; }

  paint(ctx, size, properties, args) {
    /* ... */
  }
});
Copy
The registerPaint function consists of several parts:

inputProperties:
An array of CSS custom properties that the Worklet will keep track of. This array represents dependencies of a paint worklet.
inputArguments:
An array of input arguments that can be passed from paint function from inside the CSS.
contextOptions: allow or disallow opacity for colors. If set to false, all colors will be displayed with full opacity.
paint: the main function that provides the following arguments:
ctx: 2D drawing context, almost identical to Canvas API’s 2D drawing context.
size: an object containing the width and height of the element. Values are determined by the layout rendering process. Canvas size is the same as the actual size of the element.
properties: input variables defined in inputProperties
args: an array of input arguments passed in paint function in CSS
After the Worklet has been registered, it needs to be invoked in the HTML file by simply providing a path to the file

---

After the Worklet has been registered, it needs to be invoked in the HTML file by simply providing a path to the file.

CSS.paintWorklet.addModule("path/to/worklet/file.js");
Copy
Any Worklet can also be added from an external URL (from a Content Delivery Network, for example) which makes them modular and reusable.

CSS.paintWorklet.addModule("https://url/to/worklet/file.js");
Copy
After the Worklet has been called, it can be used inside CSS using the paint function. This function accepts the Worklet’s registered name as a first input argument and each input argument that follows it is a custom argument that can be passed to a Worklet (defined inside Worklet’s inputArguments ). From that point, the browser determines when to call the Worklet and which user actions and CSS custom properties value change to respond to.

.exampleElement {
  /* paintWorkletExample - name of the worklet
     blue - argument passed to a Worklet */
  background-image: paint(paintWorketExample, blue);
}
Copy
Example #

Feature detection #
if ("paintWorklet" in CSS) {
  /* ... */
}


@supports(background:paint(paintWorketExample)){
  /* ... */
}

---
0ms
First keyframe - animation starts
2000ms
Middle keyframe - animation in progress
4000ms
Last keyframe - animation ends or resets to first keyframe
In order to better understand effect.localTime, by setting its value to 3000ms (taking into account 1000ms delay), resulting animation is going to be locked to a middle keyframe in effect timeline (1000ms delay + 2000ms for a middle keyframe). The same effect is going to happen by setting the value to 7000ms and 11000ms because the animation repeats in 4000ms interval (animation duration).

animate(currentTime, effect) {
  effect.localTime = 3000; // 1000ms delay + 2000ms middle keyframe
}
Copy
No animation happens when having a constant effect.localTime value because animation is locked in a specific keyframe. In order to properly animate an element, its effect.localTime needs to be dynamic. It’s required for the value to be a function that depends on the currentTime input argument or some other variable.

The following code shows a functional representation of 1:1 (linear function) mapping of a timeline to effect local time.

animate(currentTime, effect) {
  effect.localTime = currentTime; // y = x linear function
}

No animation happens when having a constant effect.localTime value because animation is locked in a specific keyframe. In order to properly animate an element, its effect.localTime needs to be dynamic. It’s required for the value to be a function that depends on the currentTime input argument or some other variable.

The following code shows a functional representation of 1:1 (linear function) mapping of a timeline to effect local time.

animate(currentTime, effect) {
  effect.localTime = currentTime; // y = x linear function
}
Copy
startTime + 0ms (elapsed time)
startTime + 0ms
First
startTime + 1000ms (elapsed time)
startTime + 1000ms (delay) + 0ms
First
startTime + 3000ms (elapsed time)
startTime + 1000ms (delay) + 2000ms
Middle
startTime + 5000ms (elapsed time)
startTime + 1000ms (delay) + 4000ms
Last / First
startTime + 7000ms (elapsed time)
startTime + 1000ms (delay) + 6000ms
Middle
startTime + 9000ms (elapsed time)
startTime + 1000ms (delay) + 8000ms
Last / First
Timeline isn’t restricted to 1:1 mapping to effect’s local time. Animation API allows developers to manipulate the timeline mapping in animate function by using standard JavaScript functions to create complex timelines. Animation also doesn’t have to behave the same in each iteration (if animation is repeated).

Animation doesn’t have to depend on the document’s timeline which only starts counting milliseconds from the moment it’s loaded. User actions like scroll events can be used as a timeline for animation by using a ScrollTimeline object. For example, an animation can start when a user has scrolled to 200 pixels and can end when a user has scrolled to 800 pixels on a screen.

const scrollTimelineExample = new ScrollTimeline({
  scrollSource: scrollElement,  /* DOM element whose scrolling action is being tracked */
  orientation: "vertical",      /* Scroll direction */
  startScrollOffset: "200px",   /* Beginning of the scroll timeline */
  endScrollOffset: "800px",    /* Ending of the scroll timeline */
  timeRange: 1200,              /* Time duration to be mapped to scroll values*/
  fill: "forwards"              /* Animation fill mode */
});

...
Copy
The animation will automatically adapt to user scroll speed and remain smooth and responsive. Since Animation Worklets are running off the main thread and are connected to a browser’s rending engine, animation that depends on user scroll can run smoothly and be very performant.

---

Feature Detection #
if (CSS.animationWorklet) {
  /* ... */
}
