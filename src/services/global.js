import axiosInstance from '../utils/axiosInstance';
import { message } from 'antd';

export const requestVerifyLogin = async () => {
  try {
    const { data: { data: { success } } } = await axiosInstance.get(`/verifyLogin`);
    if (success) {
      message.success('登录成功');
      return { success: true }
    };
    message.error('登录失败');
    return { success: false };
  } catch (error) {
    message.error('登录失败');
    return { success: false };
  }
}