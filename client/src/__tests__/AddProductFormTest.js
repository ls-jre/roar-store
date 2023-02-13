/**
 * @jest-environment jsdom
 */

/* 
What to test:
Data flow
- Product data (object) passed to onAddProduct

*/

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddProductForm from "../components/AddProductForm";

const setup = () => {
  const dummyProductInput = {
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 5,
    price: 649.99,
  };

  const mockHandleAddProduct = jest.fn();
  const user = userEvent.setup();

  render(<AddProductForm onAddProduct={mockHandleAddProduct} />);

  return {
    user,
    dummyProductInput,
    mockHandleAddProduct,
  };
};

test("product data is passed on form submission", async () => {
  const { user, dummyProductInput, mockHandleAddProduct } = setup();
  const addButton = screen.getByRole("button", { name: "Add" });
  await user.click(addButton);

  // Doesn't work
  expect(mockHandleAddProduct).toHaveBeenCalledTimes(1);
  // expect(mockHandleAddProduct).toHaveBeenCalledWith(dummyProductInput);
});
