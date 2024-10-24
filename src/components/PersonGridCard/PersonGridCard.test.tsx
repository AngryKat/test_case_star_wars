import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PersonGridCard, PersonGridCardProps } from "./PersonGridCard";

describe("PersonGridCard", () => {
  it("renders the PersonGridCard component", () => {
    const mockProps: PersonGridCardProps = {
      person: {
        id: 0,
        name: "Luke Skywalker",
        height: "170",
        mass: "77",
        hair_color: "light brown",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY ",
        gender: "male",
        homeworld: 0,
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        url: "",
        created: "",
        edited: "",
      },
    };
    render(<PersonGridCard {...mockProps} />);
    expect(screen.getByText("Luke Skywalker")).not.toBeNull();
  });
});
