import CartItem from "./CartItem";

const Cart = ({ cartItems, onCheckout, isLoadingCart, isErrorCart }) => {
  const total = cartItems.reduce(
    (sum, curr) => sum + curr.price * curr.quantity,
    0
  );

  const cartEmpty = cartItems.length <= 0;

  return (
    <div className="mt-10 rounded-2xl border border-neutral-200 bg-white px-8 pt-6 pb-8 shadow-md lg:mt-0">
      <h2 className="mb-8 text-3xl font-medium text-neutral-700">Cart</h2>

      {isLoadingCart && <p>Loading cart...</p>}
      {isErrorCart && <p>Error loading cart.</p>}
      {cartEmpty && (
        <p className="text-lg text-neutral-500">No products in cart</p>
      )}
      {!isLoadingCart && !isErrorCart && !cartEmpty && (
        <div>
          <table className="w-full table-auto divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-1 pt-2 text-left text-lg text-forest-700">
                  Product
                </th>
                <th className="px-1 pt-2 text-right text-lg text-forest-700">
                  Qty
                </th>
                <th className="px-1 pt-2 text-right text-lg text-forest-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {cartItems.map((item) => (
                <CartItem item={item} key={item._id} />
              ))}
            </tbody>
          </table>
          <div className="flex items-baseline justify-between border-t pt-10">
            <span className="px-1 uppercase text-neutral-500">Total</span>
            <span className="text-2xl font-medium text-neutral-700">
              $
              {Number(total).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      )}
      <button
        className="mt-8 w-full rounded-lg bg-forest-800 px-5 py-3 font-medium text-white hover:bg-forest-700 disabled:bg-neutral-100 disabled:text-neutral-500"
        disabled={cartEmpty}
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
