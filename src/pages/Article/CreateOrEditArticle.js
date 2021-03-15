import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, Form, Input, Upload, Select, message } from 'antd';
import ArticleEditorCard, { edjsParser } from './ArticleEditorCard';
import { useStoreState, useStoreActions } from './ArticleStore';
import { useStoreState as useTagStoreState } from './ArticleTagStore';
import { useStoreState as useTypeStoreState } from './ArticleTypeStore';

const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const CreateOrEditArticle = (props) => {
  const {
    match: {
      params: { article_id }
    },
    history,
  } = props;

  const [article, setArticle] = useState({ blocks: [] });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avtor, setAvtor] = useState();

  const { articlebyId } = useStoreState();
  const { tagOptions } = useTagStoreState();
  const { typeOptions } = useTypeStoreState();
  const { onUpdate, onAdd } = useStoreActions();

  const [form] = Form.useForm();

  const currentArticle = article_id && articlebyId[Number(article_id)];

  useEffect(() => {
    currentArticle &&
      setArticle(JSON.parse(currentArticle.json_content))
  }, [articlebyId])

  const handleUpdateArticle = async () => {
    setLoading(true);
    await onUpdate({
      articleId: Number(article_id),
      updateArticleDto: {
        ...currentArticle,
        content: edjsParser.parse(article),
        json_content: JSON.stringify(article),
      }
    });
    setLoading(false);
    history.push(`/article/content/${article_id}`);
  }

  const handleCreateArticle = async (value) => {
    const createArticleParams = {
      createArticleDto: {
        ...value,
        content: edjsParser.parse(article),
        json_content: JSON.stringify(article),
        cover: avtor,
      }
    }
    setLoading(true);
    await onAdd(createArticleParams);
    setLoading(false);
    setVisible(false);
    history.push(`/article`);
  }

  return <Fragment>
    <Modal
      forceRender
      title="文章内容"
      visible={visible}
      onOk={form.submit}
      submit={loading}
      onCancel={() => setVisible(false)}
    >
      <Form {...formLayout} form={form} onFinish={handleCreateArticle}>
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
            // beforeUpload={() => false}
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
    <ArticleEditorCard
      value={article}
      onChange={setArticle}
      extra={[
        <Button
          key="editableSwitch"
          type="primary"
          loading={loading}
          style={{ marginRight: '25px' }}
          onClick={currentArticle ? handleUpdateArticle : () => setVisible(true)}
        >
          完成
    </Button>
      ]}
    />
  </Fragment>
}

export default CreateOrEditArticle