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

export async function getEventBySlug(slug: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/events/getEventBySlug/" + slug;

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

export async function createTask(taskData: any, accessToken: string): Promise<ApiResponseCreateTask> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/tasks/new";

        const response = await axios.post(apiUrl, taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'accept': '*/*'
            },
        });

        const res: ApiResponseCreateEvent = {
            success: true,
            statusCode: 'success upload',
            data: response.data,
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

export async function createAnswer(answerData: any, accessToken: string): Promise<any> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/answers/new";

        const response = await axios.post(apiUrl, answerData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'accept': '*/*'
            },
        });

        const res: ApiResponseCreateEvent = {
            success: true,
            statusCode: 'Answer Created',
            data: response.data,
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

export async function updateTask(taskId: string, taskData: any, accessToken: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + `/tasks/${taskId}`;

        const response = await axios.put(apiUrl, taskData, {
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

export async function updateAnswer(answerId: string, answerData: any, accessToken: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + `/answers/${answerId}`;

        const response = await axios.put(apiUrl, answerData, {
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

export async function getEventsByUserId(id: string, token: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/events/getAllByUserId/" + id;

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
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
