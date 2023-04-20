const addProduct = (product, products) => {
  products.push(product);
  return products;
};

const deleteProduct = (id, products) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return products;
  }
};

export default {
  addProduct,
  deleteProduct
};
