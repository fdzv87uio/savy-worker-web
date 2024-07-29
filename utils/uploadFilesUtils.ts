import axios from 'axios';

interface ApiResponseUpload {
  success: boolean;
  statusCode: string;
  data?: UploadData;
  error?: any;
}

interface UploadData {
  url: string;
  signedurl: string;
}


export async function uploadImage(file: File, eventId: string, token: string): Promise<ApiResponseUpload> {
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

    const res: ApiResponseUpload = {
      success: true,
      statusCode: 'success upload',
      data: response.data.data as UploadData,
    };
    return res;
  } catch (error: any) {
    const res: ApiResponseUpload = {
      success: false,
      statusCode: 'error',
      error: error,
    };
    return res;
  }
}

export async function uploadVideo(file: File, eventId: string, token: string): Promise<ApiResponseUpload> {
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

    const res: ApiResponseUpload = {
      success: true,
      statusCode: 'success upload',
      data: response.data.data as UploadData,
    };
    return res;
  } catch (error: any) {
    const res: ApiResponseUpload = {
      success: false,
      statusCode: 'error',
      error: error,
    };
    return res;
  }
}