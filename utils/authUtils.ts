import axios from 'axios';
import { TransactionType } from '../interfaces/transactionInterfaces';


export async function standardLogin(email: string, password: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/auth/login"

        const data = {
            email: email,
            password: password,
        };

        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
            },
        });

        const res = {
            status: 'success',
            data: response.data,
        }
        return res;
    } catch (error: any) {
        const res = {
            status: 'error',
            error: error,
        }
        return res;
    }
};

export async function findUserByEmail(email: string, token: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/user/find/" + email;


        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
                'Authorization': `Bearer ${token}`,
            },
        });

        const res = {
            status: 'success',
            data: response.data,
        }
        return res;
    } catch (error: any) {
        const res = {
            status: 'error',
            error: error,
        }
        return res;
    }
};

export async function sendPasswordRecoveryEmail(email: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/auth/forgotPassword"

        const data = {
            email: email
        };

        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
            },
        });

        const res = {
            status: 'success',
            data: response.data.message,
        }
        return res;
    } catch (error: any) {
        const res = {
            status: 'error',
            error: error,
        }
        return res;
    }
};

export async function resetPassword(email: string, token: string, password: string, confirmPassword: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/auth/resetPassword";
        const data = {
            email: email,
            token: token,
            password: password,
            confirmPassword: confirmPassword,
        };

        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json'// Ajusta el tipo de contenido según tus necesidades
            },
        });

        const res = {
            status: 'success',
            data: response.data.message,
        }
        return res;
    } catch (error: any) {
        const res = {
            status: 'error',
            error: error,
        }
        return res;
    }
};

export async function getAllUsers(accessToken: string): Promise<any> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/user/list";

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'accept': '*/*'
            },
        });

        const res: any = {
            status: "success",
            data: response.data,
        };
        return res;
    } catch (error) {
        const res: any = {
            status: "error",
            error: error,
        };
        return res;
    }
}