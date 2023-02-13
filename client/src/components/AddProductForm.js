import React from "react";
import { useState } from "react";

const AddProductForm = ({ onAddProduct, onHideAddForm }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const product = { title, price, quantity };
    await onAddProduct(product);
    setTitle("");
    setPrice(0);
    setQuantity(0);
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white py-6 px-8 shadow-md">
      <h2 className="mb-8 text-2xl font-medium text-neutral-700">
        Add Product
      </h2>
      <form className="w-full" onSubmit={handleFormSubmission}>
        {/* Grid of Inputs */}
        <div className="grid grid-cols-12 gap-y-3">
          <label
            htmlFor="product-name"
            className="col-span-4 self-center whitespace-nowrap text-neutral-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            value={title}
            placeholder="Apple 10.9-Inch iPad"
            required
            className="col-span-8 self-center rounded-lg border border-neutral-400 shadow-sm placeholder:text-neutral-400  focus:border-green-600 focus:ring-green-600"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="product-price"
            className="col-span-4 self-center whitespace-nowrap text-neutral-700"
          >
            Price
          </label>
          <input
            type="number"
            step=".01"
            id="product-price"
            min="0"
            value={price}
            placeholder="$649.99"
            required
            className="col-span-8 self-center rounded-lg border border-neutral-400 text-neutral-600 shadow-sm placeholder:text-neutral-400  focus:border-green-600 focus:ring-green-600"
            onChange={(e) => setPrice(e.target.value)}
          />
          <label
            htmlFor="product-quantity"
            className="col-span-4 self-center whitespace-nowrap text-neutral-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="product-quantity"
            min="0"
            value={quantity}
            placeholder="2"
            required
            className="col-span-8 self-center rounded-lg border border-neutral-400 text-neutral-600 shadow-sm placeholder:text-neutral-400  focus:border-green-600 focus:ring-green-600"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center">
          <button
            type="submit"
            className="rounded-lg bg-forest-800 px-5 py-2 font-medium text-white hover:bg-forest-700"
          >
            Add
          </button>
          <button
            type="button"
            className="ml-6 rounded-lg bg-forest-300 px-5 py-2 font-medium text-forest-800 hover:bg-forest-400"
            onClick={onHideAddForm}
          >
            Cancel
          </button>
        </div>
      </form>
      <p className="mt-6 border-t border-neutral-200 pt-2 text-xs font-light leading-5 text-neutral-500">
        Products with these keywords in the name will be provided an image:
        airpods, bicycle, headphones, hot pockets, ipad, kindle, lantern,
        laptop, lunchables, monitor, watch, placeholder
      </p>
    </div>
  );
};

export default AddProductForm;
