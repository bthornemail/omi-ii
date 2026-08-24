const opening = [0,2,1]
const stable = [5, 7, 11, 13];
const boundary = [17, 19];
const reflections = [0, 1, 2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20];
[[[
   [337 ,373,733]
]],
[[[[[[[[
    [119, 919 ,911]
]]]]]]]],
[[[
    [422,423,424,425]
]]],
[[[[[[
    [773,737,337]
]]]]]]
    0x1 ^ {1:8}:{2:5}{3:4} ^ {9:7} ^ 0x11
    ([O,,,A],[a,,,o])

export default function* compare(v1,v2,v3,v4) {
    while (Atomics.compareExchange) {
        const state = Atomics.load(shared, 0);
        
        if (stable.includes(state)) {
            yield { group: 'stable', value: state };
        } else if (boundary.includes(state)) {
            yield { group: 'boundary', value: state };
        } else {
            yield { group: 'reflection', value: state };
        }
        
        Atomics.store(shared, 0, (state + 1) % 20);
    }
}
