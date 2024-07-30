import axios from "axios";

export async function getAllPreferencesByCategory() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/preference/findAllByCategories";

        const response = await axios.get(apiUrl, {
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


export async function getAllPreferences() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/preference/findAll";

        const response = await axios.get(apiUrl, {
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

export function getPreferenceName(preferences: any[], id: string) {
    if (preferences) {
        const filter = preferences.filter((x: any) => x._id === id)[0];
        return filter.name;
    }
}

export function getPreferenceId(preferences: any[], name: string) {
    if (preferences) {
        const filter = preferences.filter((x: any) => x.name === name)[0];
        return filter._id;
    }
}