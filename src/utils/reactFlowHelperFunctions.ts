import type { Edge, Node } from "@xyflow/react";
import type { NodeCardProps } from "../components/NodeCard/NodeCard";

// create Edge object for react flow
export function createEdge(source: number, target: number): Edge {
  return {
    id: `${source}-${target}`,
    source: source.toString(),
    target: target.toString(),
  };
}
/**
 * create Node object for react flow
 * @param id node id. Should be the same as in db.
 * @param data props that will be used in NodeCard.
 * @param index describes how "low" the node will be rendered.
 * @param level describes how far to the "right" the node will be rendered.
 */
export function createNode<T>(
  id: number,
  data: NodeCardProps<T>,
  index = 0,
  level = 0
): Node {
  return {
    id: id.toString(),
    position: { y: index * 200 + 16, x: level * 450 + 16 },
    data,
    type: "customNode",
  };
}
