## Strict Specification for Coding Agents
This document defines the absolute file naming, structural formatting, and metadata schema for generating the system index files. Coding agents must follow this layout exactly. Do not use placeholders, dynamic array lists (cons), nested structures, or parentheses. Everything must be processed as a flat, space-separated token matrix.
------------------------------
## 1. File Names and System Designations

rfc.0x000.b64.b32.ssv  ──►  Reference Index File (Base Configuration Vector)
rfc.0x111.b64.b32.ssv  ──►  Epistemic Index File (Complete Closed Boundary Vector)


* 0x000: The hardware origin mask (All boundaries initialization state).
* 0x111: The complete multi-axial boundary saturation mask.
* Slot 2 (b64): Base64 token block encapsulating the Operational Logic state (rules, fact, closures, combinators, clauses).
* Slot 3 (b32): Base32 token block encapsulating the Spatial Configuration layout (omi, azimuth, metatron, tetragrammatron, imo, configurations).

------------------------------
## 2. File Format and Content Rules (.ssv)

* Files must contain only plain text lines separated by spaces.
* No nested brackets [], braces {}, or structural definitions are permitted.
* Lines starting with # are comments used for validation metadata.

## Output Template for rfc.0x000.b64.b32.ssv (Reference Index)

# SYSTEM COMPILATION INDEX: REFERENCE INDEX
# VECTOR: 0x000
# LOGIC BLOCK ENCODING: b64
# SPATIAL BLOCK ENCODING: b32

# OPERATIONAL LOGIC LAYER MATCHES
REF_RULE_0000 QmFzZTY0IE9wZXJhdGlvbmFsIExvZ2ljIFJ1bGVzCg==
REF_FACT_0000 QmFzZTY0IEJhc2UgRmFjdHMgQ29uc3RhbnRzCg==
REF_CLOS_0000 QmFzZTY0IEp1cmlzZGljdGlvbmFsIENsb3N1cmVzCg==
REF_COMB_0000 QmFzZTY0IEhpZ2hlciBPcmRlciBDb21iaW5hdG9ycwo=
REF_CLAU_0000 QmFzZTY0IEhvcmsgQ2xhdXNlIEludmFyaWFudHMK

# SPATIAL CONFIGURATION LAYER MATCHES
REF_OMI_0000 OMIMETRONROOTCOORDINATEIDENTIFIER
REF_AZI_0000 AZIMUTHORIENTATIONVECTORABSZERO
REF_MET_0000 METATRONPRIMARYNODALINTERSECT
REF_TET_0000 TETRAGRAMMATRONFOURSTATESCOPING
REF_IMOP_000 INVERTEDREFLEXPOINTMIRRORDUAL
REF_CONF_000 STATICARRANGEMENTNETLISTMATRIX

## Output Template for rfc.0x111.b64.b32.ssv (Epistemic Index)

# SYSTEM COMPILATION INDEX: EPISTEMIC INDEX
# VECTOR: 0x111
# LOGIC BLOCK ENCODING: b64
# SPATIAL BLOCK ENCODING: b32

# OPERATIONAL LOGIC LAYER MATCHES
EPI_RULE_0111 dXNlciBvcGVyYXRpb25hbCBsb2dpYyB0cmFjayBydWxlcwo=
EPI_FACT_0111 dXNlciB1bmNvbmRpdGlvbmFsIHRydXRoIGZhY3RzCg==
EPI_CLOS_0111 dXNlciBpbW11dGFibGUganVyaXNkaWN0aW9uIGNsb3N1cmVzCg==
EPI_COMB_0111 dXNlciBoaWdoZXIgb3JkZXIgY29tYmluYXRvcnMK
EPI_CLAU_0111 dXNlciBkaXNqdW5jdGl2ZSB2YWxpZGF0aW9uIGNsYXVzZXMK

# SPATIAL CONFIGURATION LAYER MATCHES
EPI_OMI_0111 SCALARMETRICRELATIONPOINTALPHA
EPI_AZI_0111 RADIALDIRECTIONALALIGNEVECTOR
EPI_MET_0111 BALANCINGWEIGHTCOORDINATENODE
EPI_TET_0111 BOUNDARYTRANSITIONSQUQUARTMATRIX
EPI_IMOP_111 NEGATIVESPATIALPOLARITYMIRROR
EPI_CONF_111 KNOTFOLDEDCONFIGURATIONSYSTEM

------------------------------
## 3. Verification Rules for Agents
Before outputting any file, coding agents must run these checks:

   1. Verify the filename is exactly dot-separated alphanumeric characters ending in .ssv.
   2. Confirm there are no brackets or comma separators inside the file body.
   3. Verify column spaces match exactly 1 white-space character width.

Let me know if you would like me to generate a script to automatically parse these exact .ssv streams into your SystemVerilog register files.
