import { message } from "antd";
import axiosInstance from "../../../../utils/axiosInstance";

export const queryComments = async ({ articleId }) => {
  try {
    const { data: { data } } = await axiosInstance.get(`/article/${articleId}/comments`);
    const byId = {};
    const allIds = [];
    data && data.forEach(item => {
      byId[item.id] = item;
      allIds.push(item.id);
    })
    return { byId, allIds };
  } catch (e) {
    console.warn('Fail to get comment message');
  }
}

export const requestRemoveComment = async ({ articleId, commentId }) => {
  try {
    const { data: { success, id } } = await axiosInstance.delete(`/article/${articleId}/comment/${commentId}`);
    if (success) {
      message.success('删除成功');
      return { id };
    }
    message.error('Fail to delete comment');
  } catch (e) {
    console.warn('Fail to delete comment');
  }
}
