import type { Blob } from "node:buffer";

type Arr = readonly any[];
export type BLOCK<V extends Arr, B extends Arr,K extends Arr, LAMBDA extends Arr> = [IDEAL: V,CONSTRAINT: B,METRON:R,MNEUMONIC:K,BOUNDRY: LAMBDA]
export enum PredicateType {
    ,META,
    ,BLOB,
    ,POSTULATE // string[];
    ,AXIOM // string;
    ,DECLARATION // [string[],string[],string[],string[]];
    ,DEFINITION // [string[],string[],string[],string[]];
    ,PRINCIPLE // number;
    ,DISCOVERY // Delineates 
    ,IDEAL // [PRINCIPLE,POSTULATE[]];
    ,METRIC // [PRINCIPLE,PRINCIPLE[]];
    ,MNEUMONIC // [POSTULATES,PRINCIPLE[]];
    ,BOUNDRY // [IDEAL,[number,number],[number,number]];
    ,CONSTRAINT // [IDEAL,[number,number,number,number]];
    ,POSE // Blob[];
    ,MACRO
    ,BLOCK
}

// ============= ENUMS =============

// Node type enum
export enum NodeType {
    Text = 'text',
    File = 'file',
    Link = 'link',
    Group = 'group'
}

// Side enum for edge connections
export enum Side {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left'
}

// Endpoint shape enum
export enum Endpoint {
    None = 'none',
    Arrow = 'arrow'
}

// Background image rendering style
export enum BackgroundStyle {
    Cover = 'cover',
    Ratio = 'ratio',
    Repeat = 'repeat'
}

// Preset color values
export enum PresetColor {
    Red = '1',
    Orange = '2',
    Yellow = '3',
    Green = '4',
    Cyan = '5',
    Purple = '6'
}

// ============= TYPES =============

// Color can be hex string or preset color string
export type CanvasColor = string; // e.g. "#FF0000" | "1" | "2" | ...

// Position type (x, y coordinates)
export type Position = {
    x: number;
    y: number;
};

// Size type (width, height)
export type Size = {
    width: number;
    height: number;
};

// Base node attributes (excluding type-specific ones)
export type BaseNodeAttributes = {
    id: string;
    type: NodeType;
    x: number;
    y: number;
    width: number;
    height: number;
    color?: CanvasColor;
};

// Edge endpoint configuration
export type EdgeEndpoint = {
    nodeId: string;
    side?: Side;
    end?: Endpoint;
};

// ============= INTERFACES =============

// Generic node interface (base for all nodes)
export interface CanvasNode extends BaseNodeAttributes {
    // Extended by specific node types
}

// Text node interface
export interface TextNode extends BaseNodeAttributes {
    type: NodeType.Text;
    text: string;
}

// File node interface
export interface FileNode extends BaseNodeAttributes {
    type: NodeType.File;
    file: string;
    subpath?: string; // always starts with #
}

// Link node interface
export interface LinkNode extends BaseNodeAttributes {
    type: NodeType.Link;
    url: string;
}

// Group node interface
export interface GroupNode extends BaseNodeAttributes {
    type: NodeType.Group;
    label?: string;
    background?: string;
    backgroundStyle?: BackgroundStyle;
}

// Union type for all node types
export type Node = TextNode | FileNode | LinkNode | GroupNode;

// Edge interface
export interface Edge {
    id: string;
    fromNode: string; // node id where connection starts
    fromSide?: Side;
    fromEnd?: Endpoint; // defaults to 'none'
    toNode: string; // node id where connection ends
    toSide?: Side;
    toEnd?: Endpoint; // defaults to 'arrow'
    color?: CanvasColor;
    label?: string;
}

// Canvas interface (top level)
export interface Canvas {
    nodes?: Node[];
    edges?: Edge[];
}

// ============= TYPE GUARDS =============

// Type guard functions to check node types
export function isTextNode(node: Node): node is TextNode {
    return node.type === NodeType.Text;
}

export function isFileNode(node: Node): node is FileNode {
    return node.type === NodeType.File;
}

export function isLinkNode(node: Node): node is LinkNode {
    return node.type === NodeType.Link;
}

export function isGroupNode(node: Node): node is GroupNode {
    return node.type === NodeType.Group;
}

// ============= UTILITY TYPES =============

// Partial node (for updates)
export type PartialNode = Partial<Node>;

// Node without ID (for creation)
export type NodeWithoutId = Omit<Node, 'id'>;

// Edge without ID (for creation)
export type EdgeWithoutId = Omit<Edge, 'id'>;

// Canvas without optional arrays made required
export type StrictCanvas = Required<Canvas>;

// Nodes sorted by z-index (first = bottom, last = top)
export type SortedNodes = Node[]; // Maintains z-index order

// Color preset mapping
export type ColorPresetMap = {
    [key in PresetColor]: string; // Maps preset to actual color value
};

// ============= CONSTANTS =============

// Default values for optional fields
export const DEFAULT_ENDPOINT = {
    fromEnd: Endpoint.None,
    toEnd: Endpoint.Arrow
} as const;

// Valid hex color regex
export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Valid preset color values
export const PRESET_COLOR_VALUES = Object.values(PresetColor);

// Valid side values
export const SIDE_VALUES = Object.values(Side);

// Valid endpoint values
export const ENDPOINT_VALUES = Object.values(Endpoint);

// Valid background style values
export const BACKGROUND_STYLE_VALUES = Object.values(BackgroundStyle);

// ============= FACTORY FUNCTIONS =============

// Helper to create nodes with default values
export function createTextNode(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    color?: CanvasColor
): TextNode {
    return {
        id,
        type: NodeType.Text,
        x,
        y,
        width,
        height,
        text,
        color
    };
}

export function createFileNode(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    file: string,
    subpath?: string,
    color?: CanvasColor
): FileNode {
    return {
        id,
        type: NodeType.File,
        x,
        y,
        width,
        height,
        file,
        subpath,
        color
    };
}

export function createLinkNode(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    url: string,
    color?: CanvasColor
): LinkNode {
    return {
        id,
        type: NodeType.Link,
        x,
        y,
        width,
        height,
        url,
        color
    };
}

export function createGroupNode(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    label?: string,
    background?: string,
    backgroundStyle?: BackgroundStyle,
    color?: CanvasColor
): GroupNode {
    return {
        id,
        type: NodeType.Group,
        x,
        y,
        width,
        height,
        label,
        background,
        backgroundStyle,
        color
    };
}

export function createEdge(
    id: string,
    fromNode: string,
    toNode: string,
    fromSide?: Side,
    toSide?: Side,
    fromEnd?: Endpoint,
    toEnd?: Endpoint,
    color?: CanvasColor,
    label?: string
): Edge {
    return {
        id,
        fromNode,
        toNode,
        fromSide,
        toSide,
        fromEnd: fromEnd || DEFAULT_ENDPOINT.fromEnd,
        toEnd: toEnd || DEFAULT_ENDPOINT.toEnd,
        color,
        label
    };
}
