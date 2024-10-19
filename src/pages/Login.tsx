import { FC } from 'react';
import Authentication from "../components/Authentication/Authentication";
import { LoginProps } from '../types';

export const Login : FC<LoginProps> = () => {

    return (
        <Authentication isLogin={true} isRegistration={false} ></Authentication>
    )
}
