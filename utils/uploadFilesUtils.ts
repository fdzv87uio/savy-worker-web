import axios from 'axios';

export async function uploadImage(file: File, eventId: string, token: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/upload/image";

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('eventId', eventId);

    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'accept': '*/*'
      },
    });

    const res = {
      status: 'success',
      data: response.data,
    };
    return res;
  } catch (error: any) {
    const res = {
      status: 'error',
      error: error,
    };
    return res;
  }
}

export async function uploadVideo(file: File, eventId: string, token: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_CURCLE_API_URL + "/upload/video";

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('eventId', eventId);

    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'accept': '*/*'
      },
    });

    const res = {
      status: 'success',
      data: response.data,
    };
    return res;
  } catch (error: any) {
    const res = {
      status: 'error',
      error: error,
    };
    return res;
  }
}