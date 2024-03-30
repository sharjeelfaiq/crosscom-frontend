/* eslint-disable no-unused-vars */
const render = "https://crosscom-backend.onrender.com";
const local = "http://localhost:8080";

const signUpApi = `${render}/register`;
const signInApi = `${render}/signin`;
const addProductApi = `${render}/add-product`;
const getProductsApi = `${render}/get-products`;
const updateProductsApi = `${render}/update-product`;
const deleteProductApi = `${render}/delete-product`;
const deleteAllProductsApi = `${render}/delete-all-products`;
const searchApi = `${render}/search`;

const apis = {signUpApi, signInApi, addProductApi, getProductsApi, updateProductsApi, deleteProductApi, deleteAllProductsApi, searchApi}

export default apis;