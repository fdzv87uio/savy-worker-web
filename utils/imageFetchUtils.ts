import axios from "axios";

export async function getSignedImageUrl(url: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/upload/url";

        const body = {
            url: url
        };

        const response = await axios.post(apiUrl, body, {
            headers: {
                'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
            },
        });

        if (response.data) {
            const res = {
                status: 'success',
                data: response.data,
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
