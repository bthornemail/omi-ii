// Conway defined the operators
// Node type enum
export enum OperationType {
    a = 'ambo',
    b = 'bevel',
    d = 'dual',
    e = 'expand',
    g = 'gyro',
    j = 'join',
    k = 'kis',
    m = 'meta',
    o = 'ortho',
    p = 'propellor',
    r = 'reflect'
    s = 'snub',
    t = 'truncate',
}

const enum Rotations {
    F = 'Front', //: the side currently facing the solver
    B = 'Back',//: the side opposite the front
    U = 'Up',//: the side above or on top of the front side
    D = 'Down',//: the side opposite the top, underneath the Cube
    L = 'Left',//: the side directly to the left of the front
    R = 'Right'//: the side directly to the right of the front

    f = 'Front two layers' //: the side facing the solver and the corresponding middle layer
    b = 'Back two layers' //: the side opposite the front and the corresponding middle layer
    u = 'Up two layers' //: the top side and the corresponding middle layer
    d = 'Down two layers' //: the bottom layer and the corresponding middle layer
    l = 'Left two layers' //: the side to the left of the front and the corresponding middle layer
    r = 'Right two layers' //: the side to the right of the front and the corresponding middle layer
    x = 'rotate' //: rotate the entire Cube on R
    y = 'rotate' //: rotate the entire Cube on U
    z = 'rotate' //: rotate the entire Cube on F
    M = 'Middle' //: the layer between L and R, turn direction as L (top-down)
    E = 'Equator' //: the layer between U and D, turn direction as D (left-right)
    S = 'Standing' //: the layer between F and B, turn direction as F
}
const enum MOVES {
    _180 = 2, //180-degree turn ;
    _90 = 4, //the 90-degree turn of any side has period 4 (e.g. {R}4).
    MAX = 1260, //The maximum period for a move sequence is 1260: for example,
    //allowing for full rotations, {
    Fx = MAX, // }1260 or
    Ry = MAX, // {R y}1260 or
    Uz = MAX, // {U z}1260;
    // not allowing for rotations,
    DRRRUUM = MAX, // {D R' U2 M}1260, or
    BELLLFF = MAX, // {B E L' F2}1260, or
    SSSUUUBDD = MAX, // {S' U' B D2}1260;
    // only allowing for clockwise quarter turns,
    URSUL = MAX, // {U R S U L}1260, or
    FLEBL = MAX, //{F L E B L}1260, or
    RURDS = MAX, // {R U R D S}1260;
    // only allowing for lateral clockwise quarter turns,
    FBLFBRFU = MAX, //{F B L F B R F U}1260, or
    UDRUDLUF = MAX, // {U D R U D L U F}1260, or
    RLDRLURF = MAX // {R L D R L U R F}1260.
}
export default function customEvents(req, res) {
    res.writeHead(200, {
        'Content-Type': "text/event-stream",
        'Cache-Control': "no-cache",
        'Connection': "keep-alive"
    });
    res.write(`event: customEvent\n`);
    res.write(`id: 123\n`);
    res.write(`data: This is a custom event message\n\n`);

    // Send an initial message
    res.write(`data: Connected to server\n\n`);
}
