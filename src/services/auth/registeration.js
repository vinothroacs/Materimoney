import axiosInstance from '../axiosMiddleware';

export async function registration(registrationdata) {
  console.log(registrationdata);
  try {
    const response = await axiosInstance.post('auth/register', registrationdata);

    console.log("res",response )
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
