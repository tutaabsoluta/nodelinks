import { isAxiosError } from "axios"
import api from "../config/axios"

export async function getUser() {
    try {
        const token = localStorage.getItem('AUTH_TOKEN');

        const { data } = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });
        
        return data;
        
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error);
    }
}