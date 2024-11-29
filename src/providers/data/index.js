import axios from 'axios';
import { baseURL } from '../../components/constants';

const dataProvider = {
    add_product: async (productData) => {
        try {
            const response = await axios.post(`${baseURL}/product/add-product`, productData)
            const { data } = response

            return {
                success: true,
                message: data.message,
                data
            };
        } catch (error) {
            console.log(error);

            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";

            return {
                success: false,
                message: errorMessage,
            };
        }
    },
    get_products: async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/product/get-products`)
            const { data } = response

            return {
                success: true,
                message: data.message,
                data
            };
        } catch (error) {
            console.log(error);

            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";

            return {
                success: false,
                message: errorMessage,
            };

        }
    },
    delete_product: async (productId) => {
        try {
            const response = await axios.post(`${baseURL}/product/delete-product/${productId}`)
            const { data } = response

            return {
                success: true,
                message: data.message,
                data
            }
        } catch (error) {
            console.log(error);

            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";

            return {
                success: false,
                message: errorMessage,
            };

        }
    },
    delete_all_products: async (userId) => {
        try {
            const response = await axios.delete(`${baseURL}/product/delete-all-products/${userId}`)
            const { data } = response

            return {
                success: true,
                message: data.message,
                data
            }
        } catch (error) {
            console.log(error);

            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";

            return {
                success: false,
                message: errorMessage,
            };

        }
    },
    update_product: async (productId) => {
        try {
            const response = await axios.put(`${baseURL}/product/update-product/${productId}`)
            const { data } = response

            return {
                success: true,
                message: data.message,
                data
            }
        } catch (error) {
            console.log(error);

            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";

            return {
                success: false,
                message: errorMessage,
            };

        }
    },
    search: async (searchKey) => {
        try {
            const response = await axios.post(`${baseURL}/product/search/${searchKey}`)
            const { data } = response

            return {
                success: true,
                message: data.message,
                data
            }
        } catch (error) {
            console.log(error);

            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";

            return {
                success: false,
                message: errorMessage,
            };

        }
    }
};

export default dataProvider;