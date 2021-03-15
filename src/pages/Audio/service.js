import axiosInstance from '../../utils/axiosInstance';
import { message } from 'antd';

export const queryAudios = async () => {
  try {
    const {
      data: { data }
    } = await axiosInstance.get(`/audios`);
    const byId = {};
    const allIds = [];
    data.forEach(item => {
      byId[item.id] = item;
      allIds.push(item.id);
    });
    return { byId, allIds }
  } catch (error) {
    console.warn('Fail to get audios');
  }
}

export const requestCreateAudio = async ({ createAudioDto }) => {
  const formData = new FormData();
  formData.append('title', createAudioDto.title);
  formData.append('synopsis', createAudioDto.synopsis);
  createAudioDto.file && formData.append('file', createAudioDto.file);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const {
      data: { data }
    } = await axiosInstance.post(`/audio`, formData, config);
    if (data) {
      message.success("创建成功");
      return data;
    }
  } catch (error) {
    message.error("创建失败");
    console.warn('Fail to create audio');
  }
}

export const requestUpdateAudio = async ({ audioId, updateAudioDto }) => {
  try {
    const {
      data: { data }
    } = await axiosInstance.put(`/audio/${audioId}`, updateAudioDto);
    if (data) {
      message.success("更新成功");
      return data;
    }
  } catch (error) {
    message.error("更新失败");
    console.warn('Fail to update audio');
  }
}

export const requestRemoveAudio = async ({ audioId }) => {
  try {
    const {
      data: { success, id }
    } = await axiosInstance.delete(`/audio/${audioId}`);
    if (success) {
      message.success("删除成功");
      return { id };
    }
  } catch (error) {
    message.error("删除失败");
    console.warn('Fail to delete audio');
  }
}
