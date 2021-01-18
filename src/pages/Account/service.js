import axiosInstance from '../../utils/axiosInstance';

const convertAccountItem = (props) => {
  return { ...props };
}

export async function queryAccountMsg() {
  try {
    const { data: { data } } = await axiosInstance.get(`/user`);
    return { accountMsg: convertAccountItem(data) };
  } catch (e) {
    console.warn('Fail to get account message');
  }
}

export async function requestUpdateAccountMsg({ accountMsg }) {
  const postData = { ...accountMsg };
  try {
    const { data: { data } } = await axiosInstance.post(`/user`, JSON.stringify(postData));
    return { accountMsg: convertAccountItem(data) };
  } catch (e) {
    console.warn('Fail to updata account message');
  }
}