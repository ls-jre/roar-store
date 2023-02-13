const CartItem = ({ item }) => {
  return (
    <tr>
      <td className="px-1 py-3 align-baseline text-neutral-700">
        {item.title}
      </td>
      <td className="whitespace-nowrap px-1 py-3 text-right align-baseline text-neutral-500">
        {item.quantity}
      </td>
      <td className="whitespace-nowrap px-1 py-3 text-right align-baseline text-neutral-500">
        $
        {item.price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
};

export default CartItem;
