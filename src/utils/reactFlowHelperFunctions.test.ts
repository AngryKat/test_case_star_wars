import { describe, it, expect } from "vitest";
import { createEdge, createNode } from "./reactFlowHelperFunctions";

describe("reactFlowHelperFunctions", () => {
  describe("createEdge", () => {
    it("checks if correct Edge object is created", () => {
      const edge = createEdge(1, 2);
      expect(edge).toEqual({
        id: "1-2",
        source: "1",
        target: "2",
      });
    });
  });
  describe("createNode", () => {
    it("checks if correct Node object is created", () => {
      const node = createNode(
        1,
        {
          data: {
            title: "title",
            headerBgColor: "color",
            headerFontColor: "color",
            item: { key1: 1, key2: "value" },
            omitKeys: ["key1"],
          },
        },
        2,
        3
      );
      expect(node).toEqual({
        id: "1",
        position: { y: 2 * 200 + 16, x: 3 * 450 + 16 },
        data: {
          data: {
            title: "title",
            headerBgColor: "color",
            headerFontColor: "color",
            item: { key1: 1, key2: "value" },
            omitKeys: ["key1"],
          },
        },
        type: "customNode",
      });
    });
  });
});
