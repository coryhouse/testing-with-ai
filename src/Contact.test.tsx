import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect } from "bun:test";
import Contact from "./Contact";

it("renders the contact form", () => {
  render(<Contact />);
  expect(screen.getByRole("heading", { name: /contact/i })).toBeTruthy();
  expect(screen.getByLabelText(/subject/i)).toBeTruthy();
  expect(screen.getByLabelText(/message/i)).toBeTruthy();
  expect(screen.getByRole("button", { name: /submit/i })).toBeTruthy();
});

it("shows validation errors when fields are empty and blurred", async () => {
  const user = userEvent.setup();
  render(<Contact />);

  const subjectInput = screen.getByLabelText(/subject/i);
  const messageInput = screen.getByLabelText(/message/i);

  await user.click(subjectInput);
  await user.tab();
  expect(screen.getByText(/subject is required/i)).toBeTruthy();

  await user.click(messageInput);
  await user.tab();
  expect(screen.getByText(/message is required/i)).toBeTruthy();
});

it("does not show validation errors for valid input", async () => {
  const user = userEvent.setup();
  render(<Contact />);

  const subjectInput = screen.getByLabelText(/subject/i);
  const messageInput = screen.getByLabelText(/message/i);

  await user.type(subjectInput, "Test Subject");
  await user.tab();
  expect(screen.queryByText(/subject is required/i)).toBeFalsy();

  await user.type(messageInput, "Test Message");
  await user.tab();
  expect(screen.queryByText(/message is required/i)).toBeFalsy();
});

it("submits the form successfully with valid input", async () => {
  const user = userEvent.setup();
  render(<Contact />);

  const subjectInput = screen.getByLabelText(/subject/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await user.type(subjectInput, "Test Subject");
  await user.type(messageInput, "Test Message");
  await user.click(submitButton);

  expect(screen.queryByText(/subject is required/i)).toBeFalsy();
  expect(screen.queryByText(/message is required/i)).toBeFalsy();
  expect(screen.getByLabelText(/subject/i)).toHaveProperty("value", "");
  expect(screen.getByLabelText(/message/i)).toHaveProperty("value", "");
  screen.debug();
  expect(screen.queryByText(/form submitted successfully!/i)).toBeTruthy();
});
