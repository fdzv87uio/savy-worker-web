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

export const updateUserProfile = async (token: string, email: string, updatedData: object) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CURCLE_API_URL}/user/${encodeURIComponent(email)}`;

    const response = await axios.put(apiUrl, updatedData, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
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