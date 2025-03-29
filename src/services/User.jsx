import Api from "./Api";

const API_URL = "/users"; 

export const getAllUsers = async (page = 1) => {
    try {
        const response = await Api.get(`${API_URL}?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.message);
        return null;
    }
};

export const updateUser = async (id, updatedUser) => {
    try {
        const response = await Api.put(`${API_URL}/${id}`, updatedUser);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error.message);
        return null;
    }
};

export const deleteUser = async (id) => {
    try {
        await Api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return false;
    }
};
