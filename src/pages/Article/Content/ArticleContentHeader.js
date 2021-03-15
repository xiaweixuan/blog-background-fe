import React, { useState } from 'react';
import { Button, Descriptions, Form, Upload, Input, Tag, Modal, Select, message, Popconfirm } from 'antd';
import classNames from 'classnames';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import { useStoreActions } from '../ArticleStore'
import { useStoreState as useTagStoreState } from '../ArticleTagStore';
import { useStoreState as useTypeStoreState } from '../ArticleTypeStore';
import tarColor from './TagColor';
import styles from './index.less';

const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const ArticleContentHeader = ({ currentArticle, history }) => {

  const [avtor, setAvtor] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const { tagOptions } = useTagStoreState();
  const { typeOptions } = useTypeStoreState();

  const [form] = Form.useForm();
  const { onUpdate, onRemove } = useStoreActions();

  const handleUpdateArticle = async (value) => {
    setLoading(true);
    const updateArticleParams = {
      articleId: currentArticle.id,
      updateArticleDto: {
        ...currentArticle,
        ...value,
        ...(avtor ? { cover: avtor } : {}),
        view_count: Number(value.view_count),
      }
    }
    await onUpdate(updateArticleParams);
    setLoading(false);
    setVisible(false);
  }
  const onEditArticle = () => {
    setVisible(true);
    form.setFieldsValue({
      ...currentArticle,
      tag_list: currentArticle.ArticleTags.map(item => item.id),
      type_list: currentArticle.ArticleTypes.map(item => item.id),
    });
  }

  const handleRemoveArticle = async () => {
    setLoading(true);
    await onRemove({ articleId: currentArticle.id })
    setLoading(false);
    history.push('/article');
  }

  const articleDescription = currentArticle && <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} className={styles.desc}>
    <Descriptions.Item label="描述">{currentArticle.synopsis}</Descriptions.Item>
    <Descriptions.Item label="标签">{
      currentArticle.ArticleTags.map(item =>
        <Tag key={item.id} color={tarColor[Math.floor(Math.random() * 11)]}>
          {item.name}
        </Tag>
      )
    }</Descriptions.Item>
    <Descriptions.Item label="类别">{
      currentArticle.ArticleTypes.map(item =>
        <Tag key={item.id} color={tarColor[Math.floor(Math.random() * 11)]}>
          {item.name}
        </Tag>
      )
    }</Descriptions.Item>
    <Descriptions.Item label="观看量">{currentArticle.view_count}</Descriptions.Item>
    <Descriptions.Item label="创建时间">
      {moment(currentArticle.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
    </Descriptions.Item>
    <Descriptions.Item label="更新时间">
      {moment(currentArticle.updatedAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}
    </Descriptions.Item>
  </Descriptions>

  const collapseSwitch = <div className={styles.collapseSwitchContain}>
    <span className={styles.collapseSwitch} onClick={() => setCollapse(!collapse)}>
      {collapse ? '展开' : '收起'}
      <span
        className={
          collapse ? styles.collapseSwitchIcon : styles.collapseSwitchIconActived
        }
      >
        &gt;
     </span>
    </span>
  </div>

  return <div className={styles.headerWrapper}>
    <Modal
      title="编辑文章信息"
      visible={visible}
      onOk={form.submit}
      submit={loading}
      onCancel={() => setVisible(false)}
    >
      <Form
        {...formLayout}
        form={form}
        onFinish={handleUpdateArticle}
      >
        <Form.Item name="title" label="名称">
          <Input />
        </Form.Item>
        <Form.Item name="synopsis" label="描述">
          <Input />
        </Form.Item>
        <Form.Item name="view_count" label="观看量">
          <Input />
        </Form.Item>
        <Form.Item label="头像">
          <Upload
            name="file"
            action="/api/photo"
            method="post"
            withCredentials
            data={() => ({ type: 1 })}
            onChange={(info) => {
              if (info.file.status === 'done') {
                const {
                  data: { id, img_path },
                } = info.file.response;
                id && message.success('上传成功');
                setAvtor(img_path);
              } else if (info.file.status === 'error') {
                message.error(info.file.response.msg);
              }
            }}
            listType="picture"
          >
            <Button>点击上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="tag_list" label="文章标签">
          <Select mode="multiple" placeholder="Please select" options={tagOptions} />
        </Form.Item>
        <Form.Item name="type_list" label="所属类别">
          <Select mode="multiple" placeholder="Please select" options={typeOptions} />
        </Form.Item>
      </Form>
    </Modal>
    {currentArticle && <h2>{currentArticle.title}</h2>}
    <br />
    <div className={classNames(styles.headerContent, { [styles.collapse]: collapse })}>
      <div className={styles.buttons}>
        <Button onClick={onEditArticle} style={{ marginRight: '15px' }}>编辑</Button>
        <Popconfirm
          title="确定删除这篇动人的文章么？"
          onConfirm={handleRemoveArticle}
          okText="残忍删除"
          cancelText="我在想想"
        >
          <Button type="primary" loading={loading} danger>删除</Button>
        </Popconfirm>
      </div>
      {articleDescription}
    </div>
    {collapseSwitch}
  </div>
}

export default withRouter(ArticleContentHeader)