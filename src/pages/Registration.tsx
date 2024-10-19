import { FC } from 'react';
import Authentication from "../components/Authentication/Authentication";
import {RegistrationProps} from "../types";

export const Registration : FC<RegistrationProps> = () => {

    return (
        <Authentication isLogin={false} isRegistration={true}></Authentication>
    )
}
