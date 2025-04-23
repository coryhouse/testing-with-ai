import { test, expect } from "@playwright/test";

test.describe("TodoMVC End-to-End Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  test("allows users to add a new todo", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Buy groceries");
    await todoInput.press("Enter");

    const todoItem = page.getByRole("listitem", { name: "Buy groceries" });
    await expect(todoItem).toBeVisible();
  });

  test("should allow users to mark a todo as completed", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Complete assignment");
    await todoInput.press("Enter");

    const checkbox = page.getByRole("checkbox", {
      name: "Complete assignment",
    });
    await checkbox.check();

    const completedItem = page.getByRole("listitem", {
      name: "Complete assignment",
    });
    await expect(completedItem).toHaveClass(/completed/);
  });

  test("should allow users to delete a todo", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Clean the house");
    await todoInput.press("Enter");

    const todoItem = page.getByRole("listitem", { name: "Clean the house" });
    await todoItem.hover();
    const deleteButton = todoItem.getByRole("button", { name: "Delete" });
    await deleteButton.click();

    await expect(todoItem).not.toBeVisible();
  });

  test("should show the correct count of remaining todos", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Task 1");
    await todoInput.press("Enter");
    await todoInput.fill("Task 2");
    await todoInput.press("Enter");

    const todoCount = page.getByText("2 items left");
    await expect(todoCount).toBeVisible();
  });

  test("should allow users to filter active todos", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await todoInput.fill("Active task");
    await todoInput.press("Enter");
    await todoInput.fill("Completed task");
    await todoInput.press("Enter");

    const completedCheckbox = page.getByRole("checkbox", {
      name: "Completed task",
    });
    await completedCheckbox.check();

    const activeFilter = page.getByRole("link", { name: "Active" });
    await activeFilter.click();

    const activeTodo = page.getByRole("listitem", { name: "Active task" });
    await expect(activeTodo).toBeVisible();

    const completedTodo = page.getByRole("listitem", {
      name: "Completed task",
    });
    await expect(completedTodo).not.toBeVisible();
  });
});
