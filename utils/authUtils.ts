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

