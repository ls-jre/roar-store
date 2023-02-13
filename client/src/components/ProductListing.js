import Product from "./Product";

const ProductListing = ({
  products,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
  isLoadingProducts,
  isErrorProducts,
}) => {
  return (
    <div className="product-listing">
      <h2 className="mt-5 text-3xl font-medium text-neutral-700">Products</h2>

      {isLoadingProducts && <p>Loading products...</p>}
      {isErrorProducts && <p>Error loading products.</p>}

      {!isLoadingProducts && !isErrorProducts && (
        <>
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
              onEditProduct={onEditProduct}
              onDeleteProduct={() => onDeleteProduct(product._id)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductListing;
