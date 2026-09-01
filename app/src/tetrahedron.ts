const stellatedTetrahedron = {
    // Base tetrahedron (always visible)
    base: [5, 7, 11, 13],
    
    // Stellation points (boundary)
    stellation: [17, 19],
    
    // Circumsphere
    circumsphere: {
        center: 13,  // bridge prime
        radius: 6,   // hexagon
        vertices: [5, 7, 11, 13, 17, 19]
    },
    
    // 6 degrees of freedom
    degrees: {
        v1: 5,   // vertex 1
        v2: 7,   // vertex 2
        v3: 11,  // vertex 3
        v4: 13,  // vertex 4 (center)
        v5: 17,  // stellation 1
        v6: 19   // stellation 2
    }
};
