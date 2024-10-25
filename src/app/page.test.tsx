import { getPeople } from "@/utils/api";
import { render, waitFor, screen, cleanup } from "@testing-library/react";
import { describe, vi, it, afterEach, type Mock, expect } from "vitest";
import Home from "./page";

vi.mock("@/utils/api", () => ({
  getPeople: vi.fn(),
}));

vi.mock("@/components/SearchInput/SearchInput", () => ({
  SearchInput: () => <div>Search input</div>,
}));
vi.mock("@/components/Pagination/Pagination", () => ({
  Pagination: () => <div>Pagination</div>,
}));
vi.mock("@/components/PersonGrid/PersonGrid", () => ({
  PersonGrid: ({ items }: { items: Array<{ name: string }> }) => (
    <div>
      <ul>
        {items.map(({ name }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  ),
}));

describe("Home", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  it("renders NoPeopleToDisplay when no results are returned", async () => {
    (getPeople as Mock).mockResolvedValue({ count: 0, results: [] });
    render(await Home({ searchParams: { searchTerm: "", page: "1" } }));
    await waitFor(() => {
      expect(screen.getAllByText("No people to display")).not.toBeNull();
    });
  });
  it("renders PersonGrid with fetched items", async () => {
    (getPeople as Mock).mockResolvedValue({
      count: 2,
      results: [{ name: "Luke Skywalker" }, { name: "Leia Organa" }],
    });
    render(await Home({ searchParams: { searchTerm: "", page: "1" } }));

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).not.toBeNull();
      expect(screen.getByText("Leia Organa")).not.toBeNull();
    });
  });
});
