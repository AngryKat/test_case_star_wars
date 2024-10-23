"use client";
import {
  type Edge,
  type Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { nodeTypes } from "@/utils/customNodeHOC";
import { NodeFlowCenterButton } from "./NodeFlowCenterButton";
import "@xyflow/react/dist/style.css";
import styles from "./PersonNodeFlow.module.scss";



export function PersonNodeFlow({
  initialEdges,
  initialNodes,
}: {
  initialEdges: Edge[];
  initialNodes: Node[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlowProvider>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <NodeFlowCenterButton />
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            maxZoom: 1,
          }}
        />
      </div>
    </ReactFlowProvider>
  );
}
