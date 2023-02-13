/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// render - will just "render" component hypothetically
// screen - this is the hypothetical screen that you can interact with and "query"

// Import components

// Import services

// Mock services

// Setup tasks
const setup = () => {
  // Create dummy data
  // Setup user event object
  // Create mock functions
  // Render component
  // Return user event object, mock functions, dummy data
};

// Cleanup tasks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Tests - Presentational/visual
test("element text", () => {
  setup();

  // Use `screen` to select element
  // Assert actual == expected
});

// Tests - Function invocation
test("arguments", async () => {
  setup();
  // Check how many times the function was called
  // Check the arguments passed
});

// Tests - Data flow
test("return data", async () => {
  setup();
  // Mock the return data
  // Check properties of the returned data
});

// Tests - Forms
test("input state change", async () => {
  setup();
  // Render form
  // Retrieve input by name
  // Type some text
  // Check the value of the input
});

test("form submission", async () => {
  setup();
  // Mock submit function
  // Render form
  // Retrieve button and click
});
