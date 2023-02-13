import { useState } from "react";

import Header from "./components/Header";
import Cart from "./components/Cart";
import AddProductForm from "./components/AddProductForm";
import ProductListing from "./components/ProductListing";
import productService from "./services/product";
import cartService from "./services/cart";
import useAsyncFetch from "./hooks/useAsyncFetch";

const App = () => {
  const [isAdding, setIsAdding] = useState(false);

  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    data: products,
    // refetch: refetchProducts,
    setData: setProducts,
  } = useAsyncFetch("/api/products", {
    immediate: true,
  });

  const {
    isLoading: isLoadingCart,
    isError: isErrorCart,
    data: cartItems,
    // refetch: refetchCartItems,
    setData: setCartItems,
  } = useAsyncFetch("/api/cart", {
    immediate: true,
  });

  const showAddForm = () => {
    setIsAdding(true);
  };

  const hideAddForm = () => {
    setIsAdding(false);
  };

  async function handleAddProduct(product) {
    try {
      const addProductResult = await productService.add(product);
      setProducts(products.concat(addProductResult));
      hideAddForm();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEditProduct(productId, editedProduct) {
    try {
      const editProductResult = await productService.edit(
        productId,
        editedProduct
      );

      setProducts(
        products.map((product) => {
          if (product._id === editProductResult._id) {
            return editProductResult;
          }
          return product;
        })
      );

      return editProductResult;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddToCart(id) {
    try {
      const addCartResult = await cartService.add(id);

      const { product: updatedProduct, item: updatedItem } = addCartResult;

      // Pessimistic update
      const updatedProducts = products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      setProducts(updatedProducts);

      // If inventory quantity is 0, updatedItem will be null
      if (!updatedItem) return;

      // Check if already in cart
      if (!cartItems.some((item) => item._id === updatedItem._id)) {
        setCartItems([...cartItems, updatedItem]);
      } else {
        const updatedCartItems = cartItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteProduct(id) {
    try {
      await productService.remove(id);
      setProducts(products.filter(({ _id }) => _id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCheckout() {
    try {
      await cartService.checkout();
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="app" className="mx-auto min-w-[640px] max-w-[1280px] px-4">
      <Header />
      <main className="mt-20 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="col-span-7">
          <ProductListing
            products={products}
            onAddToCart={handleAddToCart}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            isLoadingProducts={isLoadingProducts}
            isErrorProducts={isErrorProducts}
          />
        </div>
        <div className="relative col-span-5">
          <div className="flex flex-col lg:sticky lg:top-20">
            <Cart
              cartItems={cartItems}
              onCheckout={handleCheckout}
              isLoadingCart={isLoadingCart}
              isErrorCart={isErrorCart}
            />
            <div className="order-first mt-10 flex justify-center lg:order-last">
              {isAdding || (
                <button
                  onClick={showAddForm}
                  className="rounded-lg border-2 border-forest-600 bg-forest-300 px-5 py-2 font-medium text-forest-800 shadow-md hover:bg-forest-400"
                >
                  Add New Product
                </button>
              )}
              {isAdding && (
                <AddProductForm
                  onAddProduct={handleAddProduct}
                  onHideAddForm={hideAddForm}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
