import axios from 'axios';

export async function createAccount(name: string, lastname: string, email: string, password: string, address: string, birthDate: string, documentType: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/auth/register"

        const data = {
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            address: address,
            birthDate: birthDate,
            documentType: documentType
        };

        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json',
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