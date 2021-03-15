import axiosInstance from '../../utils/axiosInstance';
import { message } from 'antd';

const convertArticleItem = ({ updated_at, created_at, ...props }) => {
  return {
    createAt: created_at,
    updateAt: updated_at,
    ...props
  };
}

export async function queryArticles(params) {
  try {
    const { data: { data } } = await axiosInstance.get(`/articles`, { params });
    const byId = {};
    const allIds = [];
    data && data.forEach(item => {
      byId[item.id] = convertArticleItem(item);
      allIds.push(item.id);
    })
    return { byId, allIds };
  } catch (e) {
    console.warn('Fail to get articles message');
  }
}
export async function reqeustCreateArticle({ createArticleDto }) {
  try {
    const {
      data: { data }
    } = await axiosInstance.post(`/article`, createArticleDto);
    if (data) {
      message.success('成功创建');
      return data;
    };
  } catch (error) {
    message.error('创建失败');
    console.warn('Fail to create article');
  }
}
export async function reqeustUpdateArticle({ articleId, updateArticleDto }) {
  try {
    const {
      data: { data }
    } = await axiosInstance.put(`/article/${articleId}`, updateArticleDto);
    if (data) {
      message.success('成功更新');
      return data;
    };
  } catch (error) {
    message.error('更新失败');
    console.warn('Fail to update article');
  }
}
export async function requestRemoveArticle({ articleId }) {
  try {
    const {
      data: { id, success }
    } = await axiosInstance.delete(`/article/${articleId}`);
    if (success) {
      message.success('成功删除');
      return { id };
    };
  } catch (error) {
    message.error('删除失败');
    console.warn('Fail to remove article');
  }
}

export async function queryTags() {
  try {
    const { data: { data } } = await axiosInstance.get(`/article/tags`);
    const byId = {};
    const allIds = [];
    data && data.forEach(item => {
      byId[item.id] = item;
      allIds.push(item.id);
    })
    return { byId, allIds };
  } catch (e) {
    console.warn('Fail to get tag message');
  }
}
export async function requestCreateTag(createTagParams) {
  try {
    const { data: { data } } = await axiosInstance.post(`/article/tag`, createTagParams);
    if (data) {
      message.success('成功创建');
      return data;
    }
  } catch (e) {
    message.success('创建失败');
    console.warn('Fail to get tag message');
  }
}
export async function requestRemoveTag({ tagId }) {
  try {
    const { data: { success, id } } = await axiosInstance.delete(`/article/tag/${tagId}`);
    if (success) {
      message.success('成功删除');
      return { id };
    }
  } catch (e) {
    message.error('删除失败');
    console.warn('Fail to remove tag');
  }
}

export async function queryTypes() {
  try {
    const { data: { data } } = await axiosInstance.get(`/article/types`);
    const byId = {};
    const allIds = [];
    data && data.forEach(item => {
      byId[item.id] = item;
      allIds.push(item.id);
    })
    return { byId, allIds };
  } catch (e) {
    console.warn('Fail to get tag message');
  }
}
export async function requestCreateType(createTypeParams) {
  try {
    const { data: { data } } = await axiosInstance.post(`/article/type`, createTypeParams);
    if (data) {
      message.success('成功创建');
      return data;
    }
  } catch (e) {
    message.success('创建失败');
    console.warn('Fail to get type message');
  }
}
export async function requestRemoveType({ typeId }) {
  try {
    const { data: { success, id } } = await axiosInstance.delete(`/article/type/${typeId}`);
    if (success) {
      message.success('成功删除');
      return { id };
    }
  } catch (e) {
    message.error('删除失败');
    console.warn('Fail to remove type');
  }
}
