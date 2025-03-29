import axios from "axios";

const Api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URI}`,
    headers: {
        "Content-Type": "application/json"
    },
    // withCredentials: true
});

Api.interceptors.response.use(
    (response) => response, 
    (error) => {
        console.error("API Error:", error.response?.data?.error || "Unknown error");
        alert(error.response?.data?.error || "Something went wrong!");
        return Promise.reject(error);
    }
);

export default Api;
