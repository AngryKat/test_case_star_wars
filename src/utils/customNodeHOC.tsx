import { ComponentType, Fragment } from "react";
import {
  Handle,
  Position,
} from "@xyflow/react";
import { NodeCard } from "@/components/NodeCard";

import "@xyflow/react/dist/style.css";

interface CustomNodeComponentProps<T> {
  data: T;
  isConnectable: boolean;
}

// create HOC to use react components as custom nodes for React flow
export function customNode<PropsType>(WrappedComponent: ComponentType<PropsType>) {
  const CustomNodeComponent = ({
    isConnectable,
    data,
    ...props
  }: CustomNodeComponentProps<PropsType> & PropsType) => {
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

export const nodeTypes = {
  customNode: customNode(NodeCard),
};