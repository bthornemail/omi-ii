/* A separate script file, like "my-worklet-processor.js" */
class MyWorkletProcessor extends AudioWorkletProcessor {

    // Static getter to define AudioParam objects in this custom processor.
    static get parameterDescriptors() {
        return [{
            name: 'myParam',
            defaultValue: 0.707
        }];
    }

    constructor() { super(); }

    /* AudioWorkletProcessor.process() method */
    process(inputs, outputs, parameters) {
        // The processor may have multiple inputs and outputs. Get the first input and
        // output.
        const input = inputs[0];
        const output = outputs[0];

        // Each input or output may have multiple channels. Get the first channel.
        const inputChannel0 = input[0];
        const outputChannel0 = output[0];

        // Get the parameter value array.
        const myParamValues = parameters.myParam;

        // if |myParam| has been a constant value during this render quantum, the
        // length of the array would be 1.
        if (myParamValues.length === 1) {
            // Simple gain (multiplication) processing over a render quantum
            // (128 samples). This processor only supports the mono channel.
            for (let i = 0; i < inputChannel0.length; ++i) {
                outputChannel0[i] = inputChannel0[i] * myParamValues[0];
            }
        } else {
            for (let i = 0; i < inputChannel0.length; ++i) {
                outputChannel0[i] = inputChannel0[i] * myParamValues[i];
            }
        }

        // To keep this processor alive.
        return true;
    }
}

/* "processors.js" file. */
class PortProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.port.onmessage = (event) => {
            // Handling data from the node.
            console.log(event.data);
        };

        this.port.postMessage('Hi!');
    }

    process(inputs, outputs, parameters) {
        // Do nothing, producing silent output.
        return true;
    }
}

registerProcessor('port-processor', PortProcessor);
