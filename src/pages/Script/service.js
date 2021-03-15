import axiosInstance from '../../utils/axiosInstance';
import { message } from 'antd';

export const queryScripts = async () => {
  try {
    const {
      data: { data }
    } = await axiosInstance.get(`/scripts`);
    const byId = {};
    const allIds = [];
    data.forEach(item => {
      byId[item.id] = item;
      allIds.push(item.id);
    });
    return { byId, allIds }
  } catch (error) {
    console.warn('Fail to get scripts');
  }
}

export const requestCreateScript = async ({ createScriptDto }) => {
  const formData = new FormData();
  formData.append('synopsis', createScriptDto.synopsis);
  createScriptDto.file && formData.append('file', createScriptDto.file);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const {
      data: { data }
    } = await axiosInstance.post(`/script`, formData, config);
    if (data) {
      message.success("创建成功");
      return data;
    }
  } catch (error) {
    message.error("创建失败");
    console.warn('Fail to create script');
  }
}

export const requestUpdateScript = async ({ scriptId, updateScriptDto }) => {
  try {
    const {
      data: { data }
    } = await axiosInstance.put(`/script/${scriptId}`, updateScriptDto);
    if (data) {
      message.success("更新成功");
      return data;
    }
  } catch (error) {
    message.error("更新失败");
    console.warn('Fail to update scripts');
  }
}

export const requestRemoveScript = async ({ scriptId }) => {
  try {
    const {
      data: { success, id }
    } = await axiosInstance.delete(`/script/${scriptId}`);
    if (success) {
      message.success("删除成功");
      return { id };
    }
  } catch (error) {
    message.error("删除失败");
    console.warn('Fail to delete script');
  }
}
