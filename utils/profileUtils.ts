import axios from 'axios';

export const getProfile = async (token: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/auth/profile"

    const response = await axios.get(apiUrl, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      status: 'success',
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: 'error',
      error: error.response ? error.response.data : error.message,
    };
  }
};
