"use client";
import {
  type Edge,
  type Node,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { ComponentType, Fragment } from "react";

import { NodeFlowCenterButton } from "./NodeFlowCenterButton";
import { NodeCard } from "./NodeCard";
import "@xyflow/react/dist/style.css";
import styles from "./PersonNodeFlow.module.scss";

interface CustomNodeComponentProps<T> {
  data: T;
  isConnectable: boolean;
}

// create HOC to use react components as custom nodes
function customNode<PropsType>(WrappedComponent: ComponentType<PropsType>) {
  const CustomNodeComponent = ({
    isConnectable,
    data,
    ...props
  }: CustomNodeComponentProps<PropsType>) => {
    return (
      <Fragment>
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <WrappedComponent {...data} {...props} />
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </Fragment>
    );
  };
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  CustomNodeComponent.displayName = `customNode(${displayName})`;

  return CustomNodeComponent;
}

const nodeTypes = {
  customNode: customNode(NodeCard),
};

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
        <div
          className={styles.buttonContainer}
        >
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
