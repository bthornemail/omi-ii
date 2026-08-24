class GainProcessor extends AudioWorkletProcessor {

    // Custom AudioParams can be defined with this static getter.
    static get parameterDescriptors() {
        return [{ name: 'gain', defaultValue: 1 }];
    }

    constructor() {
        // The super constructor call is required.
        super();
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        console.log(inputs);
        const output = outputs[0];
        console.log(outputs);
        const gain = parameters.gain;
        for (let channel = 0; channel < input.length; ++channel) {
	    console.log(channel);
	    const inputChannel = input[channel];
	    const outputChannel = output[channel];
	    if (gain.length === 1) {
                for (let i = 0; i < inputChannel.length; ++i)
		    outputChannel[i] = inputChannel[i] * gain[0];
	    } else {
                for (let i = 0; i < inputChannel.length; ++i)
		    outputChannel[i] = inputChannel[i] * gain[i];
	    }
        }
	console.log(gain);
	return true;	
    }
}

registerProcessor('gain-processor', GainProcessor);
