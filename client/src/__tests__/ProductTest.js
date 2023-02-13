/**
 * @jest-environment jsdom
 */

/* 
What to test:

Presentational:
- Titles, price, amount in stock

Function Invocation:
- onAddToCart, onEditProduct, onDeleteProduct

Data flow
- Data passed to:
  - onAddToCart (product object)
  - onEditProduct, onDeleteProduct (ids)


*/

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Product from "../components/Product";

const setup = () => {
  const dummyProduct = {
    _id: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 5,
    price: 649.99,
  };

  const mockHandleAddToCart = jest.fn();
  const user = userEvent.setup();

  render(<Product product={dummyProduct} onAddToCart={mockHandleAddToCart} />);

  return {
    user,
    dummyProduct,
    mockHandleAddToCart,
  };
};

test("displays product info", () => {
  setup();

  // Use `screen` to select element
  // getByRole (Role -> general way to select elements on the screen)
  // Assert actual == expected

  const title = screen.getByRole("heading", { level: 3 });
  expect(title).toHaveTextContent("Apple 10.5-Inch iPad Pro");

  const price = screen.getByText(/\$/);
  expect(price).toHaveTextContent("$649.99");
});

test("test add to cart button", async () => {
  const { user, mockHandleAddToCart } = setup();
  const addButton = screen.getByRole("button", { name: "Add to Cart" });
  await user.click(addButton);
  expect(mockHandleAddToCart).toHaveBeenCalledTimes(1);
});

test("id was passed when add to cart button was clicked", async () => {
  const { user, dummyProduct, mockHandleAddToCart } = setup();
  const addButton = screen.getByRole("button", { name: "Add to Cart" });
  await user.click(addButton);
  expect(mockHandleAddToCart).toHaveBeenCalledWith(dummyProduct._id);
});
