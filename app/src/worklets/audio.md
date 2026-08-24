/* A separate script file, like "my-worklet-processor.js" */
class MyWorkletProcessor extends AudioWorkletProcessor {

    // Static getter to define AudioParam objects in this custom processor.
    static get parameterDescriptors() {
        return [{
            name: 'myParam',
            defaultValue: 0.707
        }];
    }

    constructor(context) {
        super(context, 'my-worklet-processor');
    }
    process(inputs, outputs, parameters) {
        // |myParamValues| is a Float32Array of either 1 or 128 audio samples
        // calculated by WebAudio engine from regular AudioParam operations.
        // (automation methods, setter) Without any AudioParam change, this array
        // would be a single value of 0.707.
        const myParamValues = parameters.myParam;

        if (myParamValues.length === 1) {
            // |myParam| has been a constant value for the current render quantum,
            // which can be accessed by |myParamValues[0]|.
        } else {
            // |myParam| has been changed and |myParamValues| has 128 values.
        }
    }
    
Chrome for Developers


Sign in
    Blog

Chrome for Developers
Chrome for Developers
Blog
Was this helpful ?

    Audio Worklet is now available by default






    Hongchan Choi
    Note: Audio Worklet is enabled by default in Chrome 66.
	Chrome 64 comes with a highly anticipated new feature in Web Audio API - AudioWorklet.Here you'll learn concepts and usage to create a custom audio processor with JavaScript code. Take a look at the live demos. The next article in series, Audio Worklet Design Pattern, might be an interesting read for building an advanced audio app.

Background: ScriptProcessorNode
Audio processing in Web Audio API runs in a separate thread from the main UI thread, so it runs smoothly.To enable custom audio processing in JavaScript, the Web Audio API proposed a ScriptProcessorNode which used event handlers to invoke user script in the main UI thread.

There are two problems in this design: the event handling is asynchronous by design, and the code execution happens on the main thread.The former induces the latency, and the latter pressures the main thread that is commonly crowded with various UI and DOM - related tasks causing either UI to "jank" or audio to "glitch".Because of this fundamental design flaw, ScriptProcessorNode is deprecated from the specification and replaced with AudioWorklet.

Concepts
Audio Worklet keeps the user - supplied JavaScript code all within the audio processing thread.That means it doesn't have to jump over to the main thread to process audio. This means the user-supplied script code gets to run on the audio rendering thread (AudioWorkletGlobalScope) along with other built-in AudioNodes, which ensures zero additional latency and synchronous rendering.

	Main global scope and Audio Worklet scope diagram
    Fig.1
    Registration and instantiation
    Using Audio Worklet consists of two parts: AudioWorkletProcessor and AudioWorkletNode.This is more involved than using ScriptProcessorNode, but it is needed to give developers the low-level capability for custom audio processing.AudioWorkletProcessor represents the actual audio processor written in JavaScript code, and it lives in the AudioWorkletGlobalScope.AudioWorkletNode is the counterpart of AudioWorkletProcessor and takes care of the connection to and from other AudioNodes in the main thread.It is exposed in the main global scope and functions like a regular AudioNode.

	Here's a pair of code snippets that demonstrate the registration and the instantiation.


// The code in the main global scope.
class MyWorkletNode extends AudioWorkletNode {
constructor(context) {
super(context, 'my-worklet-processor');
}
}

let context = new AudioContext();

context.audioWorklet.addModule('processors.js').then(() => {
let node = new MyWorkletNode(context);
});
To create an AudioWorkletNode, you must add an AudioContext object and the processor name as a string.A processor definition can be loaded and registered by the new Audio Worklet object's addModule() call. Worklet APIs including Audio Worklet are only available in a secure context, thus a page using them must be served over HTTPS, although http://localhost is considered a secure for local testing.

    You can subclass AudioWorkletNode to define a custom node backed by the processor running on the worklet.


	// This is the "processors.js" file, evaluated in AudioWorkletGlobalScope
	// upon audioWorklet.addModule() call in the main global scope.
	class MyWorkletProcessor extends AudioWorkletProcessor {
	    constructor() {
		super();
	    }

	    process(inputs, outputs, parameters) {
		// audio processing code here.
	    }
	}

    registerProcessor('my-worklet-processor', MyWorkletProcessor);
    The registerProcessor() method in the AudioWorkletGlobalScope takes a string for the name of processor to be registered and the class definition. After the completion of script code evaluation in the global scope, the promise from AudioWorklet.addModule() will be resolved notifying users that the class definition is ready to be used in the main global scope.

	Custom audio parameters
    One of the useful things about AudioNodes is schedulable parameter automation with AudioParam.AudioWorkletNodes can use these to get exposed parameters that can be controlled at the audio rate automatically.

	Audio worklet node and processor diagram
    Fig.2
    User - defined audio parameters can be declared in an AudioWorkletProcessor class definition by setting up a set of AudioParamDescriptor.The underlying WebAudio engine picks up this information during the construction of an AudioWorkletNode, and then creates and links AudioParam objects to the node accordingly.


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
}    let context = new AudioContext();

context.audioWorklet.addModule('processors.js').then(() => {
    let node = new MyWorkletNode(context);
});
