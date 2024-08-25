import axios from 'axios';

export async function createAccount(email: string, password: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/auth/register"

        const data = {
            email: email,
            password: password,
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