import axios from 'axios';

export async function createAccount(name: string, lastname: string, email: string, password: string, address: string, addressDetails: string, postalCode: string, city: string, idNumber: string, birthDate: string, documentType: string, preferences: string[]) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/auth/register"

        const data = {
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            address: address,
            addressDetails: addressDetails,
            postalCode: postalCode,
            city: city,
            idNumber: idNumber,
            birthDate: birthDate,
            documentType: documentType,
            preferences: preferences,
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