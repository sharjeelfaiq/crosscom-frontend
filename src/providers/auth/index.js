import axios from 'axios';
import { baseURL } from '../../components/constants';

const authProvider = {
    signup: async (userData) => {
        try {
            const response = await axios.post(`${baseURL}/auth/signup`, userData);
            const { data } = response

            if (response.status !== 201) {
                return {
                    success: false,
                    message: data?.message || "Unexpected error occurred",
                };
            }

            const { user } = data;

            localStorage.setItem("user", user.name);
            localStorage.setItem("token", user.token);


            return {
                success: true,
                message: data.message,
                data
            };
        } catch (error) {
            console.error("Signin error:", error);

            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";

            return {
                success: false,
                message: errorMessage,
            };
        }
    },
    signin: async (userData) => {
        try {
            const response = await axios.post(`${baseURL}/auth/signin`, userData);
            const { data } = response

            if (response.status !== 200) {
                return {
                    success: false,
                    message: data?.message || "Unexpected error occurred",
                };
            }

            const { user } = data;

            localStorage.setItem("user", JSON.stringify({ name: user.name, id: user.id }));
            localStorage.setItem("token", user.token);

            return {
                success: true,
                message: data.message,
                data
            };
        } catch (error) {
            console.error("Signin error:", error);

            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";

            return {
                success: false,
                message: errorMessage,
            };
        }
    },
}

export default authProvider;