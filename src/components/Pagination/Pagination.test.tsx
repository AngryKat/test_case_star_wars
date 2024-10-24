import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { describe, expect, it, vi, afterEach, beforeEach, type Mock } from "vitest";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Pagination", () => {
  const replaceMock = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ replace: replaceMock });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Pagination component", () => {
    render(<Pagination total={20} currentPage={1} />);
    expect(screen.getByTestId("pagination")).not.toBeNull();
  });
  it("renders the Pagination component if visibleOnMobileOnly is true and the screen is small", () => {
    global.innerWidth = 500; // small screen size
    render(<Pagination total={20} currentPage={1} visibleOnMobileOnly />);
    expect(screen.getByTestId("pagination-mobile")).not.toBeNull();
  });
  it("when click on page 2 the url has correct params", () => {
    render(<Pagination total={20} currentPage={1} />);
    fireEvent.click(screen.getAllByTitle("2")[0]);
    expect(replaceMock).toHaveBeenCalledWith("/?page=2");
  });
});