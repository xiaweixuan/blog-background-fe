import axiosInstance from '../../utils/axiosInstance';

export const requestSignIn = async (requestSignInPrams) => {
  try {
    const { headers, data: { data: { success } } } = await axiosInstance.get(`/login`, { params: requestSignInPrams });
    if (success) {
      headers['x-jwt-token'] && localStorage.setItem('jwt', headers['x-jwt-token']);
      return { success: true }
    };
    return { success: false };
  } catch (error) {
    return { success: false };
  }
}