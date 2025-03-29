import Api from "./Api"; 

export const loginUser = async (credentials) => {
    try {
        const response = await Api.post("/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error.message);
        return null;
    }
};
