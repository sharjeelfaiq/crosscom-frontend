/* eslint-disable no-unused-vars */
const render = process.env.REACT_APP_RENDER;
const local = process.env.REACT_APP_LOCAL;

const signUpApi = `${render}/register`;
const signInApi = `${render}/signin`;
const addProductApi = `${render}/add-product`;
const getProductsApi = `${render}/get-products`;
const updateProductsApi = `${render}/update-product`;
const deleteProductApi = `${render}/delete-product`;
const deleteAllProductsApi = `${render}/delete-all-products`;
const searchApi = `${render}/search`;

const apis = {
  signUpApi,
  signInApi,
  addProductApi,
  getProductsApi,
  updateProductsApi,
  deleteProductApi,
  deleteAllProductsApi,
  searchApi,
};

export default apis;
