import { useState } from "react";
import EditForm from "./EditForm";
import { placeholderImage } from "../utils/placeholderImage";

const Product = ({ product, onAddToCart, onEditProduct, onDeleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { _id, title, price, quantity } = product;
  const noneLeft = quantity <= 0;

  const showEditForm = () => {
    setIsEditing(true);
  };

  const hideEditForm = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="mt-10 grid grid-cols-12 rounded-2xl border border-neutral-200 bg-white shadow-md">
        {/* Image */}
        <div className="col-span-3 min-h-[200px] border-r border-neutral-200">
          <img
            src={placeholderImage(title)}
            className={`h-full object-cover object-center ${
              isEditing ? "rounded-tl-2xl" : "rounded-l-2xl"
            }`}
          />
        </div>

        {/* Product Details */}
        <div className="col-span-9 flex flex-col justify-between p-6">
          {/* Description */}
          <div>
            <h3 className="mt-1 text-xl font-medium text-forest-800">
              {title}
            </h3>
            <div className="flex items-baseline justify-between">
              <p className="mt-3 text-xl text-neutral-600">
                $
                {price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="mt-4">
                <span
                  className={`text font-medium ${
                    noneLeft ? "text-red-600" : "text-neutral-500"
                  }`}
                >
                  {quantity}
                </span>
                <span
                  className={`text-xs uppercase ${
                    noneLeft ? "text-red-500" : "text-neutral-400"
                  }`}
                >
                  {" "}
                  in stock
                </span>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex items-center justify-between">
            <div className={isEditing ? "invisible" : ""}>
              <button
                className="rounded-lg border-2 border-forest-800 bg-forest-800 px-5 py-1.5 font-medium text-white hover:bg-forest-700 disabled:border-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-500"
                disabled={noneLeft}
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(_id);
                }}
              >
                Add to Cart
              </button>
              <button
                className="ml-6 rounded-lg border-2 border-forest-600 bg-forest-300 px-5 py-1.5 font-medium text-forest-800 hover:bg-forest-400"
                onClick={showEditForm}
              >
                Edit
              </button>
            </div>
            <button
              className="text-sm text-neutral-500 hover:text-red-600"
              onClick={onDeleteProduct}
            >
              Delete
            </button>
          </div>
        </div>

        {isEditing && (
          <EditForm
            onHideEditForm={hideEditForm}
            originalProduct={product}
            onEditProduct={onEditProduct}
          />
        )}
      </div>
    </>
  );
};

export default Product;
