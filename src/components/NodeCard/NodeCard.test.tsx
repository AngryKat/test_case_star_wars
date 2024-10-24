import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NodeCard, type NodeCardProps } from "./NodeCard";

describe("NodeCard", () => {
  it("renders the NodeCard component", () => {
    type MockType = { name: string; weight: number };
    const mockProps: NodeCardProps<MockType> = {
      data: {
        title: "Luke Skywalker",
        item: { name: "Luke Skywalker", weight: 77 },
      },
    };
    render(<NodeCard {...mockProps} />);
    expect(screen.getByText("Luke Skywalker")).not.toBeNull();
  });
  it("shows more info when More is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getByText("weight")).not.toBeNull();
    expect(screen.getByText("77")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Hide" })).not.toBeNull();
  });
  it("hides info when Hide is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: "Hide" }));
    expect(screen.getByRole("button", { name: "More" })).not.toBeNull();
    expect(screen.queryByText("weight")).toBeNull();
    expect(screen.queryByText("77")).toBeNull();
  });
});
