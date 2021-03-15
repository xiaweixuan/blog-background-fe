import axiosInstance from '../../utils/axiosInstance';
import { message } from 'antd';

export const queryPhotos = async () => {
  try {
    const {
      data: { data }
    } = await axiosInstance.get(`/photos`);
    const byId = {};
    const allIds = [];
    data.forEach(item => {
      byId[item.id] = item;
      allIds.push(item.id);
    });
    return { byId, allIds }
  } catch (error) {
    console.warn('Fail to get articles');
  }
}

export const requestCreatePhoto = async ({ createPhotoDto }) => {
  const formData = new FormData();
  formData.append('type', createPhotoDto.type);
  formData.append('synopsis', createPhotoDto.synopsis);
  createPhotoDto.file && formData.append('file', createPhotoDto.file);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const {
      data: { data }
    } = await axiosInstance.post(`/photo`, formData, config);
    if (data) {
      message.success("创建成功");
      return data;
    }
  } catch (error) {
    message.error("创建失败");
    console.warn('Fail to create article');
  }
}

export const requestUpdatePhoto = async ({ photoId, updatePhotoDto }) => {
  try {
    const {
      data: { data }
    } = await axiosInstance.put(`/photo/${photoId}`, updatePhotoDto);
    if (data) {
      message.success("更新成功");
      return data;
    }
  } catch (error) {
    message.error("更新失败");
    console.warn('Fail to update article');
  }
}

export const requestRemovePhoto = async ({ photoId }) => {
  try {
    const {
      data: { success, id }
    } = await axiosInstance.delete(`/photo/${photoId}`);
    if (success) {
      message.success("删除成功");
      return { id };
    }
  } catch (error) {
    message.error("删除失败");
    console.warn('Fail to delete article');
  }
}
