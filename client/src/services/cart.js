import axios from "axios";

async function fetchAll() {
  const response = await axios.get("/api/cart");

  if (response.data.error) {
    throw Error(response.data.error);
  }

  return response.data;
}

async function add(id) {
  const response = await axios.post("/api/add-to-cart", {
    productId: id,
  });
  const addCartResult = response.data;

  if (addCartResult.error) {
    throw new Error(addCartResult.error);
  }
  return addCartResult;
}

async function checkout() {
  const response = await axios.post("/api/checkout");

  if (response.data.error) {
    throw Error(response.data.error);
  }
}

export default { fetchAll, add, checkout };
