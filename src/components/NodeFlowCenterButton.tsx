"use client";
import { useReactFlow, useStoreApi } from "@xyflow/react";
import { Button } from "antd";

const MOBILE_MAX_WIDTH_PX = 600; // max width that is considered mobile screen

export function NodeFlowCenterButton() {
  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);

    if (nodes.length > 0) {
      // focus on the first node. Should be the selected hero
      const node = nodes[0];
      let x = 0;
      let y = 0;

      if (window.innerWidth < MOBILE_MAX_WIDTH_PX) {
        x = node.position.x + (node.measured.width ?? 0) / 2 + window.innerWidth;
        y = node.position.y + (node.measured.height ?? 0);
      } else {
        x = node.position.x + (node.measured.width ?? 0) / 2;
        y = node.position.y + (node.measured.height ?? 0) / 2;
      }
      // slight zoom in
      const zoom = 1.2;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  return <Button onClick={focusNode}>Focus node</Button>;
}
