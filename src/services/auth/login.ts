import {LoginDto} from "../../DTO's/requests/login";
import apiClient from "./apiClient";
import axios from "axios";
import {AuthDto} from "../../DTO's/responses/auth";

export const requestLogin = async (data: LoginDto): Promise<AuthDto> => {
    try {
        const response = await apiClient.post<AuthDto>('/users/login', data);
        return response.data;
    } catch (err: any) {
        if (axios.isAxiosError(err)) {
            const backendMessage = err.response?.data?.message;
            const status = err.response?.status;
            if (status === 400) {
                return {
                    message: backendMessage || "Incorrect password",
                }
            }
            if (status === 404) {
                return {
                    message: backendMessage || 'User with given email does not exist'
                }
            }
            if (status === 500) {
                return {
                    message: 'Internal server error.'
                }
            }
            return {
                message: backendMessage || 'Unexpected error.'
            }
        }
        return {
            message: 'Network or client error'
        }
    }
}
