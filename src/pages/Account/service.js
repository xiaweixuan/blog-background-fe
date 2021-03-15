import axiosInstance from '../../utils/axiosInstance';
import { message } from 'antd';

const convertAccountItem = ({ custom_fields, updated_at, created_at, ...props }) => {
  return {
    customFields: custom_fields && JSON.parse(custom_fields),
    createAt: created_at,
    updateAt: updated_at,
    ...props
  };
}

export async function queryAccountMsg() {
  try {
    const { data: { data } } = await axiosInstance.get(`/user`);
    return { accountMsg: convertAccountItem(data[0]) };
  } catch (e) {
    console.warn('Fail to get account message');
  }
}

export async function requestUpdateAccountMsg({ updateAccountDto }) {
  try {
    const { data: { data } } = await axiosInstance.put(`/user`, updateAccountDto);
    message.success("更新成功");
    return { accountMsg: convertAccountItem(data) };
  } catch (e) {
    message.error("更新失败");
    console.warn('Fail to updata account message');
  }
}