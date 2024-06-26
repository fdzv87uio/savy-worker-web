import axios from "axios";
import { TransactionType } from "../interfaces/transactionInterfaces";

export async function getAllTransactionsByEmail(email: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/transaction/getAllByUserEmail/" + email;

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
            },
        });

        if (response.data) {
            const dataArray = response.data ?? [];
            const sortedByDate = dataArray.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            const res = {
                status: 'success',
                data: sortedByDate,
            }
            return res;
        }
    } catch (error: any) {
        const res = {
            status: 'error',
            error: error,
        }
        return res;
    }
};

export async function createTransaction(data: TransactionType) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/transaction/new"

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


