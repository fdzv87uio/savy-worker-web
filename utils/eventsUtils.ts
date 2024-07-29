import axios from "axios";

export async function getAllEvents() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/events/";

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

export async function getEventById(id: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/events/" + id;

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


export async function findUserByUserId(id: string, token: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/events/getAllByUserId/" + id;


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

export async function createEvent(eventData: any, accessToken: string): Promise<ApiResponseCreateEvent> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/events/new";

        const response = await axios.post(apiUrl, eventData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'accept': '*/*'
            },
        });

        const res: ApiResponseCreateEvent = {
            success: true,
            statusCode: 'success upload',
            data: response.data as EventData,
        };
        return res;
    } catch (error) {
        const res: ApiResponseCreateEvent = {
            success: false,
            statusCode: 'error',
            error: error,
        };
        return res;
    }
}

export async function updateEvent(eventId: string, eventData: any, accessToken: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + `/events/${eventId}`;

        const response = await axios.put(apiUrl, eventData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'accept': '*/*'
            },
        });

        const res = {
            status: 'success',
            data: response.data,
        }
        return res;
    } catch (error) {
        const res = {
            status: 'error',
            error: error,
        }
        return res;
    }
};
