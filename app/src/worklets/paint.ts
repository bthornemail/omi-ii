registerPaint(
    "boxbg",
    class {
        static get contextOptions() {
            return { alpha: true };
        }
        /*
          Retrieve any custom properties (or regular properties,
          such as 'height') defined for the element, and return
          them as an array.
        */
        static get inputProperties() {
            return ["--box-color", "--width-subtractor"];
        }

        paint(ctx, size, props) {
            /*
              ctx -> drawing context
              size -> paintSize: width and height
              props -> properties: get() method
            */
            ctx.fillStyle = props.get("--box-color");
            ctx.fillRect(
                0,
                size.height / 3,
                size.width * 0.4 - props.get("--width-subtractor"),
                size.height * 0.6,
            );
        }
    },
);
