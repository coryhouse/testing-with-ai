import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect } from "bun:test";
import Contact from "./Contact";

it("renders the Contact component with form elements", () => {
  render(<Contact />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Contact" })
  ).toBeTruthy();
  expect(screen.getByLabelText("Subject:")).toBeTruthy();
  expect(screen.getByLabelText("Message:")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Submit" })).toBeTruthy();
});

it("shows validation errors when fields are left empty and blurred", async () => {
  const user = userEvent.setup();
  render(<Contact />);

  const subjectInput = screen.getByLabelText("Subject:");
  const messageInput = screen.getByLabelText("Message:");

  await user.click(subjectInput);
  await user.tab();
  expect(screen.getByText("Subject is required.")).toBeTruthy();

  await user.click(messageInput);
  await user.tab();
  expect(screen.getByText("Message is required.")).toBeTruthy();
});

it("submits the form successfully when fields are filled", async () => {
  const user = userEvent.setup();
  render(<Contact />);

  const subjectInput = screen.getByLabelText("Subject:") as HTMLInputElement;
  const messageInput = screen.getByLabelText("Message:") as HTMLTextAreaElement;
  const submitButton = screen.getByRole("button", { name: "Submit" });

  await user.type(subjectInput, "Test Subject");
  await user.type(messageInput, "Test Message");
  await user.click(submitButton);

  expect(screen.getByText("Form submitted successfully!")).toBeTruthy();
  expect(subjectInput.value).toBe("");
  expect(messageInput.value).toBe("");
});

it("does not submit the form if fields are empty", async () => {
  const user = userEvent.setup();
  render(<Contact />);

  const submitButton = screen.getByRole("button", { name: "Submit" });
  await user.click(submitButton);

  expect(screen.queryByText("Form submitted successfully!")).toBeFalsy();
  expect(screen.getByText("Subject is required.")).toBeTruthy();
  expect(screen.getByText("Message is required.")).toBeTruthy();
});
