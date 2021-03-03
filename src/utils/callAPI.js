import { API_URL } from "../config/constants.js";

// const getListProduct = () => {
//   return axios({
//     url: "https://6037a0865435040017722e45.mockapi.io/api/SanPham",
//     method: "GET",
//   });
// };
// const deleteProductById = (id) => {
//   return axios({
//     url: `https://6037a0865435040017722e45.mockapi.io/api/SanPham/${id}`,
//     method: "DELETE",
//   });
// };
// const addProduct = (newProduct) => {
//   return axios({
//     url: `https://6037a0865435040017722e45.mockapi.io/api/SanPham`,
//     method: "POST",
//     data: newProduct,
//   });
// };
// const getProductById = (id) => {
//   return axios({
//     url: `https://6037a0865435040017722e45.mockapi.io/api/SanPham/${id}`,
//     method: "GET",
//   });
// };
// const updateProductById = (updatedProduct) => {
//   return axios({
//     url: `https://6037a0865435040017722e45.mockapi.io/api/SanPham/${updatedProduct.id}`,
//     method: "PUT",
//     data: updatedProduct,
//   });
// };

const callApi = (uri, method, data) => {
  return axios({
    url: `${API_URL}/${uri}`,
    method,
    data,
  });
};

//uri = SanPham/${updatedProduct.id}

export {
  callApi,
  // getListProduct,
  // deleteProductById,
  // addProduct,
  // getProductById,
  // updateProductById,
};
