
function resolveConsPairQuadratic(carHex, cdrHex) {
    // Convert 4-character hex bits to numerical register addresses
    const x = parseInt(carHex, 16); // car pointer
    const y = parseInt(cdrHex, 16); // cdr pointer

    // Evaluate the binary quadratic equation
    const quadraticResult = (60 * (x ** 2)) + (16 * x * y) + (4 * (y ** 2));

    // Map properties directly to the hierarchical elements
    let DOMTree = `
<omi-fs type="cons-pair" car="0x${carHex.toUpperCase()}" cdr="0x${cdrHex.toUpperCase()}">
  <imo-gs equation="60x^2+16xy+4y^2" solved="${quadraticResult}">
    <!-- The resolution segments hold the raw components -->
    <imo-rs component-x="${x}" component-y="${y}">
      <!-- Unit coordinate mapped to a 32-bit bitmask of the quadratic result -->
      <imo-us x="${quadraticResult & 0xFFFF}" y="${(quadraticResult >>> 16) & 0xFFFF}" />
    </imo-rs>
  </imo-gs>
</omi-fs>
    `.trim();

    return {
        x,
        y,
        quadraticResult,
        DOMTree
    };
}
