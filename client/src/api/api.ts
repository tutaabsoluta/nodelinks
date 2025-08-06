import { isAxiosError } from "axios"
import api from "../config/axios"
import type { ProfileForm, User } from "../types";

export async function getUser() {
    try {

        const { data } = await api<User>('/user');
        return data;
        
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error);
    }
}

export async function updateUser( formData: ProfileForm ) {
    try {

        const { data } = await api.patch<User>('/user', formData);

        return data;
        
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error);
    }
}