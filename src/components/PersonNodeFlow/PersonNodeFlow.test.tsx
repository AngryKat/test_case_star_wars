import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { type Edge, type Node, ReactFlowProvider } from "@xyflow/react";
import { PersonNodeFlow } from "./PersonNodeFlow";

vi.mock("./NodeFlowCenterButton", () => {
  return {
    NodeFlowCenterButton: () => <div>Center Button</div>,
  };
});
vi.mock("./NodeCard", () => {
  return {
    NodeCard: ({ label }: { label: string }) => <div>{label}</div>,
  };
});

describe("PersonNodeFlow", () => {
  it("renders the PersonNodeFlow component with nodes", () => {
    const initialNodes: Node[] = [
      {
        id: "1",
        position: { x: 0, y: 0 },
        data: { label: "node 1" },
        type: "customNode",
      },
      {
        id: "2",
        position: { x: 0, y: 0 },
        data: { label: "node 2" },
        type: "customNode",
      },
    ];
    const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

    render(
      <ReactFlowProvider>
        <PersonNodeFlow
          initialNodes={initialNodes}
          initialEdges={initialEdges}
        />
      </ReactFlowProvider>
    );
    expect(screen.getByText("node 1")).not.toBeNull();
    expect(screen.getByText("node 2")).not.toBeNull();
  });
});
