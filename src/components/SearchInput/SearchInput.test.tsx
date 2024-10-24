import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import {
  vi,
  it,
  describe,
  beforeEach,
  afterEach,
  expect,
  type Mock,
} from "vitest";
import { SearchInput } from "./SearchInput";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("SearchInput", () => {
  const replaceMock = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ replace: replaceMock });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the SearchInput component", () => {
    render(<SearchInput />);
    expect(screen.getByPlaceholderText("Search your hero")).not.toBeNull();
  });

  it("updates searchTerm param when text is updated", () => {
    fireEvent.change(screen.getByPlaceholderText("Search your hero"), {
      target: { value: "Dart Vader" },
    });
    expect(replaceMock).toHaveBeenCalledWith("/?searchTerm=Dart+Vader");
  });
  it("removes searchTerm param when input text is empty", () => {
    fireEvent.change(screen.getByPlaceholderText("Search your hero"), {
      target: { value: "" },
    });
    expect(replaceMock).toHaveBeenCalledWith("/");
  });
});
