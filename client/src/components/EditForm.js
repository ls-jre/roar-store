import { useState, useId } from "react";

const EditForm = ({ onHideEditForm, originalProduct, onEditProduct }) => {
  const [title, setTitle] = useState(originalProduct.title);
  const [price, setPrice] = useState(originalProduct.price);
  const [quantity, setQuantity] = useState(originalProduct.quantity);

  const id = useId();
  const titleId = `${id}-product-name`;
  const priceId = `${id}-product-price`;
  const quantityId = `${id}-product-quantity`;

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const product = { title, price, quantity };
    const editedProduct = await onEditProduct(originalProduct._id, product);

    setTitle(editedProduct.title);
    setPrice(editedProduct.price);
    setQuantity(editedProduct.quantity);

    onHideEditForm();
  };

  return (
    <>
      {/* Edit Form Title */}
      <div className="col-span-3 rounded-bl-2xl bg-neutral-200 p-6">
        <h3 className="mt-1 shrink-0 text-lg font-medium text-neutral-600">
          Edit Product
        </h3>
      </div>

      {/* Edit Form */}
      <div className="col-span-9 flex gap-10 rounded-br-2xl bg-neutral-200 p-6">
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
              id={titleId}
              value={title}
              required
              className="col-span-8 self-center rounded-lg border border-neutral-400 text-neutral-600 shadow-sm placeholder:text-neutral-400 focus:border-green-600 focus:ring-green-600"
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
              id={priceId}
              min="0"
              value={price}
              required
              className="col-span-8 self-center rounded-lg border border-neutral-400 text-neutral-600 shadow-sm placeholder:text-neutral-400 focus:border-green-600 focus:ring-green-600"
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
              id={quantityId}
              min="0"
              value={quantity}
              required
              className="col-span-8 self-center rounded-lg border border-neutral-400 text-neutral-600 shadow-sm placeholder:text-neutral-400 focus:border-green-600 focus:ring-green-600"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center">
            <button
              type="submit"
              className="rounded-lg border-2 border-forest-800 bg-forest-800 px-5 py-1.5 font-medium text-white hover:bg-forest-700"
            >
              Update
            </button>
            <button
              type="button"
              className="ml-6 rounded-lg border-2 border-forest-600 bg-forest-300 px-5 py-1.5 font-medium text-forest-800 hover:bg-forest-400"
              onClick={onHideEditForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
