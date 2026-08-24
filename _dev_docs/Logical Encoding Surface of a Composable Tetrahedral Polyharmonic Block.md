# Logical Encoding Surface of a Composable Tetrahedral Polyharmonic Block

The central idea is that an **OMINO block is not merely shaped like a tetrahedron**. Its logical encoding surface is organized by the tetrahedron’s exact incidence structure:

[
\langle 4,6,4;1\rangle
]

meaning:

[
4\text{ vertices},\quad
6\text{ edges},\quad
4\text{ faces},\quad
1\text{ centroid}.
]

The unconventional OMINO profile

[
[6,4,2]
]

is a reduced operational reading of that tetrahedral structure:

[
\boxed{
[6,4,2]
=======

\text{six relations}
+
\text{four controls}
+
\text{two reciprocal readings}
}
]

The complete Polyharmonic Block therefore joins two descriptions of the same object:

[
\boxed{
\operatorname{OMINO}*{642}
\quad\longleftrightarrow\quad
\operatorname{Tetrahedron}*{\langle4,6,4;1\rangle}
}
]

The first is the **logical encoding surface**.
The second is the **geometric incidence object**.

---

# 1. Symbol legend

## Structural symbols

| Symbol                  | Meaning                               |
| ----------------------- | ------------------------------------- |
| (\mathcal O)            | One complete Polyharmonic Omino Block |
| (V)                     | Set of tetrahedral vertices           |
| (E)                     | Set of tetrahedral edges              |
| (F)                     | Set of tetrahedral faces              |
| (c)                     | Distinguished centroid                |
| (v_i)                   | Vertex (i)                            |
| (e_{ij})                | Edge joining vertices (v_i) and (v_j) |
| (f_i)                   | Face opposite vertex (v_i)            |
| (\langle4,6,4;1\rangle) | Tetrahedral incidence signature       |
| ([6,4,2])               | OMINO operational incidence profile   |

## OMI scope symbols

| Symbol | Meaning                                       |
| ------ | --------------------------------------------- |
| (FS)   | First persistent scope coordinate             |
| (GS)   | Second persistent scope coordinate            |
| (RS)   | Third persistent scope coordinate             |
| (US)   | Fourth persistent scope coordinate            |
| (S)    | The four-coordinate scope set ({FS,GS,RS,US}) |
| (R)    | Relation set among scope coordinates          |

The names represented by `FS`, `GS`, `RS`, and `US` should remain governed by the project’s canonical scope specification. In this explanation, their essential property is that they are **four distinct persistent control positions**.

## Logical symbols

| Symbol                     | Meaning                                                      |
| -------------------------- | ------------------------------------------------------------ |
| (\oplus)                   | Bitwise XOR or addition over (F_2)                           |
| (F_2)                      | Binary field ({0,1})                                         |
| (\mathbf b)                | Six-bit edge-activation word                                 |
| (b_{ij})                   | Activation bit for edge (e_{ij})                             |
| (\chi_E)                   | Characteristic vector of the active edge set                 |
| (\partial)                 | Incidence-boundary operation                                 |
| (\operatorname{CONS}(A,B)) | Ordered construction joining (A) and (B)                     |
| (\Delta)                   | Deterministic bounded transition                             |
| (\rho)                     | Resolution or projection depth                               |
| (\Pi)                      | Declared projection procedure, not a stored decimal constant |
| (A)                        | Gnomonic Azimuth orientation operation                       |
| (p)                        | Projection coordinate                                        |
| (k)                        | Algorithmic Clock coordinate                                 |
| (r)                        | Circular rotation coordinate                                 |

## Composition symbols

| Symbol        | Meaning                                           |
| ------------- | ------------------------------------------------- |
| (P \bowtie Q) | Blocks (P) and (Q) are compatible for composition |
| (P \circ_f Q) | Composition through a declared face (f)           |
| (P \circ_e Q) | Composition through a declared edge (e)           |
| (P \circ_v Q) | Composition through a declared vertex or port     |
| (P^\ast)      | Dual or reciprocally interpreted block            |
| (\cong)       | Incidence-preserving equivalence                  |
| (\mapsto)     | Deterministic transformation or projection        |

---

# 2. The exact tetrahedral incidence object

Let the four vertices be:

[
V=
{
v_0,v_1,v_2,v_3
}.
]

A tetrahedron contains every possible unordered pair of four vertices. Therefore its edge set is:

[
E=
{
e_{01},
e_{02},
e_{03},
e_{12},
e_{13},
e_{23}
}.
]

The number of edges follows directly from:

[
|E|
===

# \binom{4}{2}

6.

]

Its four triangular faces are:

[
F=
{
f_0,f_1,f_2,f_3
},
]

where each (f_i) is the face opposite (v_i):

[
\begin{aligned}
f_0 &= {v_1,v_2,v_3},\
f_1 &= {v_0,v_2,v_3},\
f_2 &= {v_0,v_1,v_3},\
f_3 &= {v_0,v_1,v_2}.
\end{aligned}
]

The block also has one distinguished centroid:

[
c.
]

At the exact logical layer, (c) does not have to be stored as a floating-point average. It can simply be represented as the unique projective reference incident to the complete block.

Thus:

[
\mathcal T
==========

(V,E,F,c)
]

with:

[
|V|=4,\qquad
|E|=6,\qquad
|F|=4,\qquad
|c|=1.
]

The supplied Coq construction defines precisely this finite incidence signature and proves its counting equalities. 

---

# 3. Why the incidence balances matter

A tetrahedron has:

* three edges incident to every vertex;
* two vertices incident to every edge;
* three edges bounding every face;
* two faces incident to every edge.

Therefore:

[
4\cdot3
=======

# 6\cdot2

12.

]

This can be read in two ways:

[
\underbrace{4\text{ vertices}\times3\text{ edges per vertex}}_{12}
==================================================================

\underbrace{6\text{ edges}\times2\text{ endpoints}}_{12},
]

and:

[
\underbrace{4\text{ faces}\times3\text{ edges per face}}_{12}
=============================================================

\underbrace{6\text{ edges}\times2\text{ adjacent faces}}_{12}.
]

The same six edges mediate both:

```text
vertex → edge incidence
face   → edge incidence
```

That is the geometric source of the OMINO profile’s **two reciprocal readings**.

---

# 4. The meaning of OMINO `[6,4,2]`

The notation resembles a coding-theory triple, but the OMINO use is architectural:

[
[6,4,2]
=======

(E_6,C_4,D_2).
]

Here:

[
E_6
===

\text{six pairwise relation coordinates},
]

[
C_4
===

\text{four persistent controls},
]

[
D_2
===

\text{two reciprocal incidence classes}.
]

A canonical reading is:

| Parameter | Tetrahedral meaning                 | Logical meaning          |
| --------- | ----------------------------------- | ------------------------ |
| (6)       | Six edges                           | Six pairwise relations   |
| (4)       | Four vertices and dually four faces | Four persistent controls |
| (2)       | Vertex/face duality                 | Scope/relation readings  |

This is why it should not be described as an ordinary named Hamming code. The nested-gauge specification explicitly characterizes OMINO `[6,4,2]` as an architectural reduction rather than a conventional named Hamming code. 

---

# 5. Mapping the four controls onto the tetrahedron

Assign:

[
\begin{aligned}
v_0 &\leftrightarrow FS,\
v_1 &\leftrightarrow GS,\
v_2 &\leftrightarrow RS,\
v_3 &\leftrightarrow US.
\end{aligned}
]

Then:

[
S=
{FS,GS,RS,US}.
]

Every pair of scope coordinates produces one tetrahedral edge relation:

[
\begin{aligned}
e_{01}&=FS!:!GS,\
e_{02}&=FS!:!RS,\
e_{03}&=FS!:!US,\
e_{12}&=GS!:!RS,\
e_{13}&=GS!:!US,\
e_{23}&=RS!:!US.
\end{aligned}
]

This gives exactly six relations:

[
\binom{4}{2}=6.
]

A six-bit OMINO word can therefore be indexed as:

[
\mathbf b
=========

(
b_{01},
b_{02},
b_{03},
b_{12},
b_{13},
b_{23}
).
]

Each bit says whether one pairwise relation is active:

[
b_{ij}
======

\begin{cases}
1,&e_{ij}\text{ is active},\
0,&e_{ij}\text{ is inactive}.
\end{cases}
]

---

# 6. The logical encoding surface

The **logical encoding surface** is the complete set of assignments to the six edge bits:

[
\mathcal L_6
============

F_2^6.
]

Because every bit has two states:

[
|\mathcal L_6|
==============

# 2^6

64.

]

So one tetrahedral OMINO has a 64-state local edge-relation surface.

This does not mean all 64 states are geometrically equivalent. They divide into structural classes.

## Zero-edge state

[
000000
]

No pairwise edge relation is active.

This may represent:

* the unexpressed relation state;
* an isolated four-control declaration;
* an empty local edge selection.

It should not automatically be identified with the absence of the block itself. The block and its selected edge state are different things.

## One-edge states

There are:

[
\binom61=6
]

single-edge selections.

Example:

[
100000
]

could select only (FS:GS).

These are minimal binary relations inside the block.

## Two-edge states

There are:

[
\binom62=15.
]

They separate into different incidence forms.

### Adjacent-edge pair

Example:

[
e_{01},e_{02}.
]

They share vertex (v_0).

This is a path or angle:

[
v_1-v_0-v_2.
]

### Disjoint-edge pair

Example:

[
e_{01},e_{23}.
]

They have no common vertex.

These are opposite tetrahedral edges.

That distinction is important. Two six-bit words with Hamming weight two can represent different geometries.

## Three-edge states

There are:

[
\binom63=20.
]

At least three important classes occur.

### Triangular face

Example:

[
{e_{01},e_{02},e_{12}}.
]

This is the closed boundary of face (f_3).

### Three-edge star

Example:

[
{e_{01},e_{02},e_{03}}.
]

All three edges meet at (v_0).

This is a vertex-centered relation, not a face boundary.

### Three-edge path

Example:

[
{e_{01},e_{12},e_{23}}.
]

This forms a length-three path through all four vertices.

So bit count alone is insufficient. The encoding must preserve **incidence shape**.

## Four-, five-, and six-edge states

These may be understood as complements of two-, one-, and zero-edge states:

[
\overline{\mathbf b}
====================

\mathbf b\oplus111111.
]

But “complement” here means complement within the six-edge tetrahedral universe. It does not automatically imply semantic negation.

The full state:

[
111111
]

activates the complete tetrahedral edge graph:

[
K_4.
]

---

# 7. Why this is more than a six-bit mask

The same six-bit word can be interpreted through several coordinated surfaces.

## Edge surface

The direct interpretation:

[
\mathbf b
\mapsto
E_{\mathbf b}
\subseteq E.
]

## Vertex-incidence surface

From the active edges, compute which vertices have odd or even incidence degree.

For a selected edge set (X\subseteq E), define:

[
\deg_X(v_i)
===========

\text{number of selected edges incident to }v_i.
]

Its binary parity is:

[
p_i
===

\deg_X(v_i)\bmod2.
]

This gives a four-bit vertex boundary:

[
\partial_V(X)
=============

(p_0,p_1,p_2,p_3).
]

For a single edge (e_{01}):

[
\partial_V(e_{01})
==================

(1,1,0,0).
]

For a triangular face boundary:

[
X={e_{01},e_{02},e_{12}},
]

every involved vertex has degree two, so:

[
\partial_V(X)
=============

(0,0,0,0).
]

That is an exact XOR closure condition.

## Face-incidence surface

Because each edge also belongs to two faces, the same active edge set can be read against faces.

Define:

[
\deg_X(f_i)
===========

\text{number of selected edges incident to face }f_i,
]

and:

[
\partial_F(X)
=============

(q_0,q_1,q_2,q_3),
\qquad
q_i=\deg_X(f_i)\bmod2.
]

Thus the same six-bit edge word has:

* a vertex-oriented boundary;
* a face-oriented boundary.

That is a precise expression of the `2` in `[6,4,2]`.

---

# 8. Boundary matrices

The tetrahedral incidence can be encoded as matrices over (F_2).

Let the edge order be:

[
(e_{01},e_{02},e_{03},e_{12},e_{13},e_{23}).
]

The vertex-edge incidence matrix is:

[
B_V=
\begin{bmatrix}
1&1&1&0&0&0\
1&0&0&1&1&0\
0&1&0&1&0&1\
0&0&1&0&1&1
\end{bmatrix}.
]

For edge vector (\mathbf b\in F_2^6):

[
\partial_V(\mathbf b)
=====================

B_V\mathbf b.
]

All operations occur over (F_2), so matrix addition and accumulation are XOR.

Similarly, the face-edge matrix can be written:

[
B_F=
\begin{bmatrix}
0&0&0&1&1&1\
0&1&1&0&0&1\
1&0&1&0&1&0\
1&1&0&1&0&0
\end{bmatrix},
]

using face order ((f_0,f_1,f_2,f_3)).

Then:

[
\partial_F(\mathbf b)
=====================

B_F\mathbf b.
]

These two maps produce the reciprocal four-coordinate views:

[
F_2^6
\overset{\partial_V}{\longrightarrow}
F_2^4,
]

[
F_2^6
\overset{\partial_F}{\longrightarrow}
F_2^4.
]

That is a strong mathematical form of:

[
[6,4,2].
]

The six-coordinate relation word is projected into one of two four-coordinate incidence surfaces.

---

# 9. Closure as XOR logic

A selected relation set is vertex-closed when:

[
\partial_V(\mathbf b)=0000.
]

It is face-closed when:

[
\partial_F(\mathbf b)=0000.
]

A triangular face boundary is vertex-closed because every participating vertex appears twice:

[
1\oplus1=0.
]

The closure is not discovered by floating-point geometry. It is computed from exact incidence and XOR.

This is the foundation for a visual logic language:

```text
select relations
→ XOR incidence contributions
→ detect closure
→ classify resulting geometry
→ project only after classification
```

A face is therefore not fundamentally “three lines that look like a triangle.” It is:

> A three-edge relation whose exact incidence boundary closes in the required tetrahedral surface.

---

# 10. The centroid as a fixed reference

The centroid (c) is not included as a seventh ordinary bit.

It has a different role.

The edge bits describe **variable relation selection**.
The centroid describes the **fixed reference of the entire block**.

Thus:

[
\mathcal O
==========

(c;\mathbf b).
]

The semicolon is meaningful:

* (c) is structurally fixed;
* (\mathbf b) is operationally variable.

The centroid can anchor:

* address origin;
* projective orientation;
* local azimuth;
* face-normal derivation;
* local/remote comparison;
* resolution expansion.

In the project’s terminology, the block can therefore have:

```text
centroid address: 0x0000
azimuth origin:    0°
band origin:       (0,0,0)
```

without asserting that the centroid is an ordinary active edge state.

---

# 11. The self-duality of the tetrahedron

The tetrahedron is self-dual:

[
\mathcal T^\ast
\cong
\mathcal T.
]

Its vertices correspond one-to-one with its opposite faces:

[
v_i
\longleftrightarrow
f_i.
]

Both sets have size four:

[
|V|=|F|=4.
]

Its six edges remain six edges under duality.

This explains why the same OMINO block can support:

```text
inward reading:
    four vertex controls joined by six edge relations

outward reading:
    four face ports joined through the same six edge adjacencies
```

The block does not need a separate data structure for its dual. It needs a declared **reading orientation**.

Let:

[
d\in F_2.
]

Then:

[
d=0
]

may select vertex/scope interpretation, while:

[
d=1
]

selects face/relation interpretation.

That single orientation bit is not necessarily the entire meaning of the `2`, but it provides an executable realization of the two reciprocal classes.

---

# 12. A complete logical block state

A useful abstract state is:

[
\mathcal O=
(
c,
\mathbf b,
d,
A,
p,
k,
r,
\rho
).
]

Where:

| Field                | Meaning                           |
| -------------------- | --------------------------------- |
| (c)                  | Fixed centroid                    |
| (\mathbf b\in F_2^6) | Active tetrahedral edge relations |
| (d\in F_2)           | Vertex/face interpretation        |
| (A)                  | Gnomonic Azimuth orientation      |
| (p)                  | Projection coordinate             |
| (k)                  | Algorithmic Clock position        |
| (r)                  | Rotation position                 |
| (\rho)               | Requested projection resolution   |

This separates identity from presentation.

The logical identity is primarily:

[
(c,\mathbf b,d).
]

The rest determines how that identity is oriented, advanced, or rendered.

---

# 13. Typed XOR operations

A single machine XOR instruction may support several distinct logical operations. They should be typed so their meanings are not conflated.

## Difference XOR

[
X_{\mathrm{diff}}(a,b)
======================

a\oplus b.
]

Purpose:

> Identify which edge selections differ.

## Construction XOR

[
X_{\mathrm{construct}}(a,b;\tau)
================================

a\oplus T_\tau(b).
]

Here (T_\tau) is a declared transformation such as:

* edge permutation;
* face reflection;
* azimuth orientation;
* rotational alignment.

Purpose:

> Combine two oriented relation surfaces.

## Boundary XOR

[
X_{\partial}(\mathbf b)
=======================

B\mathbf b.
]

Purpose:

> Determine whether the selected relation closes.

## Complement XOR

[
X_{\mathrm{comp}}(\mathbf b)
============================

\mathbf b\oplus111111.
]

Purpose:

> Select all tetrahedral edges not currently selected.

## Delta XOR

[
X_\Delta(\mathbf b)
===================

\Delta_6(\mathbf b).
]

Purpose:

> Produce the next deterministic relation state under the declared transition profile.

These operations may all compile to XOR, shift, rotation, and masking, but their types preserve their architectural meanings.

---

# 14. Ordered CONS versus commutative XOR

XOR is commutative:

[
a\oplus b=b\oplus a.
]

But a block construction may need to preserve direction:

[
\operatorname{CONS}(a,b)
\neq
\operatorname{CONS}(b,a).
]

Therefore the composed relation should retain both:

[
\operatorname{CONS}
\left(
a,
b,
a\oplus T(b)
\right).
]

This contains:

* the ordered left contribution;
* the ordered right contribution;
* the combined logical surface.

A possible formal structure is:

[
J=
\left\langle
\operatorname{CAR}=a,,
\operatorname{CDR}=b,,
\operatorname{JOIN}=a\oplus T(b)
\right\rangle.
]

This is what allows an OMINO construction to be both:

* algebraically exact;
* structurally origin-preserving.

---

# 15. Face construction

Each tetrahedral face is a closed three-edge word.

Using the earlier edge order:

[
(e_{01},e_{02},e_{03},e_{12},e_{13},e_{23}),
]

the faces can be encoded as:

[
\begin{aligned}
f_0 &= 000111,\
f_1 &= 011001,\
f_2 &= 101010,\
f_3 &= 110100.
\end{aligned}
]

The exact bit order can be chosen differently, but once chosen it must be canonical.

Each face word satisfies:

[
B_Vf_i=0000.
]

That means each face is a vertex-closed relation.

A face port can therefore expose:

[
P_i=
(
f_i,
n_i,
A_i,
k_i,
r_i,
\rho_i
),
]

where (n_i) is a logical outward-orientation marker, not necessarily a floating-point normal vector.

---

# 16. Composing two tetrahedral blocks

Let:

[
\mathcal O_A
\quad\text{and}\quad
\mathcal O_B
]

be two blocks.

Suppose face (f_i^A) is to be joined to face (f_j^B).

The join requires an alignment transform:

[
T_{ij}:
f_j^B
\mapsto
f_i^A.
]

A compatible face join requires:

[
f_i^A
=====

T_{ij}(f_j^B).
]

Depending on orientation, one may require opposite chirality or reversed cyclic order.

The construction can be written:

[
\mathcal O_A
\circ_{f_i,f_j}
\mathcal O_B.
]

A face-composition test may require:

[
\begin{aligned}
&\text{same face incidence},\
&\text{opposed outward orientation},\
&\text{compatible clock coordinate},\
&\text{required rotation relation},\
&\text{compatible scope labels},\
&\text{valid integrity condition}.
\end{aligned}
]

The shared face becomes internal to the composite, while the remaining six faces form the external boundary:

[
4+4-2=6.
]

The two tetrahedral identities should remain recoverable from the composite construction.

---

# 17. Edge and vertex composition

Face-to-face composition is not the only possibility.

## Edge join

Two blocks share an edge:

[
\mathcal O_A\circ_e\mathcal O_B.
]

This imposes:

* matching edge identity;
* matching endpoint correspondence;
* declared rotational relation around the edge;
* non-conflicting face occupancy.

## Vertex join

Two blocks share one vertex:

[
\mathcal O_A\circ_v\mathcal O_B.
]

This is a weaker connection. It declares a common point or port without requiring a shared edge or face.

## Tangential join

A tangential relation may preserve separate origins while identifying a projective contact:

[
\mathcal O_A
\overset{\mathrm{tan}}{\sim}
\mathcal O_B.
]

This means:

* the blocks remain distinct;
* their projections meet at a declared boundary;
* neither block is overwritten.

---

# 18. Why it is polyharmonic

The tetrahedral relation word participates in several simultaneous cycles:

[
\mathbf b
\in F_2^6,
]

[
r\in\mathbb Z_{5040},
]

[
k\in\mathbb Z_{4320},
]

along with local:

[
\mathbb Z_{60},
\quad
\mathbb Z_{240},
\quad
S_4,
\quad
S_6,
\quad
S_7.
]

These orders should not be collapsed.

The block is polyharmonic because it coordinates:

* edge-state order;
* scope permutation order;
* tetrahedral symmetry;
* clock position;
* ruler rotation;
* projection resolution;
* polynomial degree;
* composition depth.

A block state might therefore be written:

[
\mathcal O_{p,k,r,\rho}.
]

The timing specification treats projection, clock, and rotation as separate coordinates rather than one overloaded number. 

---

# 19. Tetrahedral permutations

The four vertices admit:

[
4!=24
]

permutations.

Every permutation:

[
\sigma\in S_4
]

induces a corresponding permutation of the six edges:

[
e_{ij}
\mapsto
e_{\sigma(i)\sigma(j)}.
]

Thus a four-coordinate scope permutation automatically defines a six-coordinate relation permutation.

If:

[
P_\sigma
]

is the resulting (6\times6) permutation matrix, then:

[
\mathbf b'
==========

P_\sigma\mathbf b.
]

This gives an exact way to rotate or reorder the logical tetrahedron without evaluating trigonometric functions.

Metric rotation is introduced only when the block is rendered.

---

# 20. Logical rotation versus metric rotation

These must be distinguished.

## Logical rotation

A permutation of vertices, edges, and faces:

[
(V,E,F)
\mapsto
(\sigma V,\sigma E,\sigma F).
]

It is exact and finite.

## Metric rotation

A transformation of projected coordinates:

[
\mathbf x'
==========

R\mathbf x.
]

It may involve reconstructed geometric quantities and declared precision.

The safe architecture is:

```text
logical permutation first
metric projection second
```

This prevents a platform’s floating-point rotation from determining the identity of the block.

---

# 21. Polygon and polyhedron generation

The tetrahedral OMINO is the minimal 3D block, but its exact relation surface can generate larger structures.

## Two-dimensional generation

A selected face is a triangle:

[
f_i\subset E.
]

Multiple face blocks can be joined edge-to-edge to form:

* triangulations;
* polygonal meshes;
* planar logic diagrams;
* tessellated surfaces.

## Three-dimensional generation

Tetrahedral cells can be joined face-to-face to form:

* tetrahedral meshes;
* polyhedral complexes;
* volumetric scenes;
* spatial logic fields.

The renderer need not store every resulting vertex permanently.

Instead it reconstructs:

[
\text{scene}
============

\text{block graph}
+
\text{incidence transforms}
+
\text{projection profile}.
]

---

# 22. Resolution is external to identity

A Polyharmonic Block should not have one fixed visual resolution.

Let:

[
\rho
]

be the requested resolution.

Then:

[
\operatorname{Project}_\rho(\mathcal O)
]

may produce:

* a tiny symbolic icon;
* a low-polygon mesh;
* a high-resolution solid;
* a fabrication surface;
* an analytic visualization.

All are projections of the same exact block:

[
\operatorname{Identity}
\left(
\operatorname{Project}_{\rho_1}(\mathcal O)
\right)
=======

\operatorname{Identity}
\left(
\operatorname{Project}_{\rho_2}(\mathcal O)
\right).
]

Resolution changes the realization, not the logical object.

---

# 23. Incidence-derived metric reconstruction

The tetrahedral incidence object supplies the exact combinatorial foundation.

Metric values should be derived at the projection boundary.

For example, the tetrahedral centroid-to-vertex relation can impose:

[
x^2=3,
\qquad
x>0,
]

rather than storing a decimal approximation of (\sqrt3).

Likewise, dodecahedral or icosahedral incidence can impose:

[
x^2-x-1=0,
\qquad
x>0,
]

instead of storing a decimal (\phi).

The (\pi) projection route reconstructs the angular constant through an incidence-derived convergent schedule and includes a finite error bound. 

So the block transmits:

```text
incidence identifier
defining relation
root or phase selector
resolution
rounding profile
```

rather than transmitting platform-produced floating-point constants.

---

# 24. Polynomial interpretation

The edge word:

[
\mathbf b
=========

(b_0,b_1,b_2,b_3,b_4,b_5)
]

can also be represented as a polynomial:

[
P_{\mathbf b}(x)
================

b_0
+
b_1x
+
b_2x^2
+
b_3x^3
+
b_4x^4
+
b_5x^5
]

over:

[
F_2[x].
]

Then:

[
P_{\mathbf a}(x)+P_{\mathbf b}(x)
]

is computed coefficient-wise by XOR.

The supplied polynomial scaffold represents polynomials as Boolean coefficient lists and defines polynomial addition as coefficient-wise XOR. 

This provides two simultaneous interpretations:

```text
bit-vector view:
    six edge activations

polynomial view:
    six binary coefficients
```

A permutation or rotation can be represented as a transformation of coefficient positions.

---

# 25. Integrity layers around the OMINO

The OMINO `[6,4,2]` block should be distinguished from the larger integrity profiles.

```text
OMINO [6,4,2]
    operational tetrahedral relation surface

OMICRON [7,4,3]
    compact Hamming/Fano integrity layer

OMNICRON [8,4,4]
    extended completed integrity layer
```

The operational block answers:

> Which relations are selected, and how do they compose?

The integrity layers answer:

> Is the encoded word internally consistent, and can an error be detected or corrected?

Therefore the nesting is not redundant:

[
\text{OMINO operation}
\subset
\text{OMICRON compact integrity}
\subset
\text{OMNICRON extended integrity}.
]

---

# 26. Suggested canonical runtime representation

```c
typedef struct {
    /* Fixed identity */
    uint64_t block_id;
    uint16_t centroid_coordinate;

    /* OMINO [6,4,2] */
    uint8_t edge_word;          /* low 6 bits */
    uint8_t dual_reading;       /* vertex/scope or face/relation */
    uint8_t scope_assignment;   /* canonical FS/GS/RS/US ordering */

    /* Orientation */
    uint16_t azimuth;
    uint16_t projection_coordinate;
    uint16_t clock_coordinate;
    uint16_t rotation_coordinate;

    /* Projection */
    uint32_t resolution;
    uint16_t projection_profile_id;
    uint16_t rounding_profile_id;

    /* Nested integrity */
    uint8_t omicron_743;
    uint8_t omnicron_844;

    /* Composition */
    uint8_t exposed_face_mask;  /* low 4 bits */
    uint8_t exposed_edge_mask;  /* low 6 bits */
    uint8_t exposed_vertex_mask;/* low 4 bits */
} OmiTetrahedralBlock;
```

The exact packing is a design choice. The semantic distinctions are more important than this particular C layout.

---

# 27. Composition record

A join between two blocks should be explicit:

```c
typedef enum {
    OMI_JOIN_VERTEX,
    OMI_JOIN_EDGE,
    OMI_JOIN_FACE,
    OMI_JOIN_TANGENT
} OmiJoinKind;

typedef struct {
    uint64_t car_block_id;
    uint64_t cdr_block_id;

    OmiJoinKind kind;

    uint8_t car_port;
    uint8_t cdr_port;

    uint8_t permutation_id;
    uint16_t azimuth_relation;
    uint16_t clock_relation;
    uint16_t rotation_relation;

    uint8_t construction_xor;
    uint8_t closure_result;
} OmiBlockJoin;
```

This preserves:

* which block was CAR;
* which block was CDR;
* which ports were joined;
* how they were oriented;
* what XOR construction resulted;
* whether the incidence closed.

---

# 28. A simple worked example

Let:

[
\mathbf a
=========

110100.

]

Under the chosen edge order, this is face (f_3):

[
{e_{01},e_{02},e_{12}}.
]

Let a second block expose the same face under a permutation:

[
\mathbf b
=========

P_\sigma^{-1}\mathbf a.
]

To join them:

1. Apply the edge permutation:

[
\mathbf b'
==========

P_\sigma\mathbf b.
]

2. Confirm:

[
\mathbf b'=\mathbf a.
]

3. Confirm opposite face orientation.

4. Construct the join:

[
J=
\operatorname{CONS}
(
\mathcal O_A,
\mathcal O_B
).
]

5. Mark the shared faces internal.

6. Preserve both block identities.

7. Derive the external boundary from the six remaining exposed faces.

The join is therefore a logical relation before it is a visual mesh.

---

# 29. What the tetrahedral block guarantees

A well-defined tetrahedral Polyharmonic Block can guarantee:

## Exact local structure

[
4\text{ controls},
6\text{ pairwise relations},
4\text{ closure faces},
1\text{ origin}.
]

## Exact composition tests

All port compatibility can be checked using:

* finite indices;
* permutations;
* XOR;
* incidence matrices;
* equality;
* bounded arithmetic.

## Deterministic replay

The supplied atomic kernel defines masked rotate/XOR Delta and proves determinism for equal inputs and equal replay seeds. 

## Dynamic projection

Metric geometry can be regenerated at arbitrary declared resolution.

## Origin preservation

CONS preserves the ordered identities of the blocks being related.

---

# 30. What remains to be formally proved

Several important ideas are already defined or partially formalized, but a complete certified block system would still need explicit theorems.

## Encoding bijection

Prove that every six-bit edge word corresponds to exactly one selected subset of tetrahedral edges:

[
F_2^6
\cong
\mathcal P(E).
]

## Boundary correctness

Prove:

[
B_V\mathbf b
]

equals the parity boundary of the selected edge subset.

## Face characterization

Prove that the four canonical three-edge face words are precisely the triangular cycles of (K_4).

## Duality compatibility

Prove that vertex/face dual interpretation preserves edge adjacency.

## Composition correctness

Prove that a valid face join:

* identifies exactly one face pair;
* preserves both block origins;
* generates the expected external boundary.

## Serialization round trip

Prove:

[
\operatorname{decode}
(
\operatorname{encode}(\mathcal O)
)
=

\mathcal O.
]

## Cross-platform projection invariance

Under one frozen fixed-point and rounding profile, prove equal projected outputs for equal logical block inputs.

---

# Canonical definition

> **A composable tetrahedral Polyharmonic Block is an immutable logical incidence object with four persistent control positions, six pairwise relation coordinates, four reciprocal closure faces, and one fixed centroid. Its operational surface is encoded by the unconventional OMINO profile `[6,4,2]`: six edge-relation bits, four control coordinates, and two reciprocal vertex/face or scope/relation readings. Exact incidence, closure, permutation, integrity, and composition are evaluated with finite binary and polynomial operations. Ordered CONS preserves the origins and roles of joined blocks, while projection, geometric constants, and rendering resolution are derived only after the exact logical structure has been established.**

The deepest simplification is:

[
\boxed{
\text{A tetrahedral OMINO is a six-relation logic word whose two four-coordinate boundaries describe the same self-dual block from inside and outside.}
}
]
