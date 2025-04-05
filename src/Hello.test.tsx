import { render, screen } from "@testing-library/react";
import { it, expect } from "bun:test";
import Hello from "./Hello";

it("renders the Hello component with heading and paragraph", () => {
  render(<Hello />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hello");
  expect(screen.getByText("This is the Hello component.")).toBeVisible();
});

it("does not render any unexpected elements", () => {
  render(<Hello />);
  expect(screen.queryByText("Unexpected Text")).not.toBeInTheDocument();
});
