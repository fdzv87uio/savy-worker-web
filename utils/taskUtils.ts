import axios from "axios";


export async function getAllAvailableTaskByEmail(email: string, token: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/tasks/getAllAvaliableByUserEmail/" + email;

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Ajusta el tipo de contenido según tus necesidades
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

export async function getTaskById(id: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/tasks/" + id;

        const response = await axios.get(apiUrl, {
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

