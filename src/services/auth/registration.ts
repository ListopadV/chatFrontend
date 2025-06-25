import {RegistrationDto} from "../../DTO's/requests/registration";
import apiClient from "./apiClient";
import {AuthDto} from "../../DTO's/responses/auth";
import axios from "axios";

export const requestRegistration = async (data: RegistrationDto): Promise<AuthDto> => {
    try {
        const response = await apiClient.post<AuthDto>('/users/registration', data);
        console.log(response)
        return response.data;
    } catch (err: any) {
        console.log(err)
        if (axios.isAxiosError(err)) {
            const backendMessage = err.response?.data?.message;
            const status = err.response?.status;

            if (status === 409) {
                return {
                    message: backendMessage || "User with this email already exists"
                }
            }
            if (status === 500) {
                return {
                    message: backendMessage || "Internal server error."
                }
            } else {
                return {
                    message: backendMessage || 'Unexpected error.'
                }
            }
        }
        return {
            message: 'Network or client error'
        }
    }
}