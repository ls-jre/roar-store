import axios from "axios";

async function fetchAll() {
  const response = await axios.get("/api/products");

  if (response.data.error) {
    throw Error(response.data.error);
  }

  return response.data;
}

async function add(product) {
  const response = await axios.post("/api/products", product);

  if (response.data.error) {
    throw Error(response.data.error);
  }

  return response.data;
}

async function edit(id, product) {
  const { title, price, quantity } = product;
  const response = await axios.put(`/api/products/${id}`, {
    title,
    price,
    quantity,
  });

  if (response.data.error) {
    throw Error(response.data.error);
  }

  return response.data;
}

async function remove(id) {
  await axios.delete(`/api/products/${id}`);
}

export default { fetchAll, add, edit, remove };
