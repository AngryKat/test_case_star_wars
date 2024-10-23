"use client";
import { useReactFlow, useStoreApi } from "@xyflow/react";
import { Button } from "antd";

export function NodeFlowCenterButton() {
  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);

    if (nodes.length > 0) {
      // focus on primary node
      const node = nodes[0];

      const x = node.position.x + (node.measured.width ?? 0) / 2;
      const y = node.position.y + (node.measured.height ?? 0) / 2;
      // slight zoom in
      const zoom = 1.2;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  return <Button onClick={focusNode}>Focus node</Button>;
}
