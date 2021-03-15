import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Button } from 'antd';
import { useStoreActions } from './Store';

const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

const CreateOrEditModal = ({ visible, onCancel, initialValue }) => {

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const { onAdd, onUpdate } = useStoreActions();

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue(initialValue);
    }
  }, [initialValue])

  const handleCreateAudio = async (val) => {
    const createAudioParams = {
      createAudioDto: {
        synopsis: val.synopsis,
        title: val.title,
        file: val.file[0].originFileObj,
      },
    };
    setLoading(true);
    await onAdd(createAudioParams);
    setLoading(false);
    onCancel && onCancel();
  }

  const handleUpdateAudio = async (val) => {
    const updateAudioParams = {
      audioId: initialValue.id,
      updateAudioDto: {
        synopsis: val.synopsis,
        title: val.title,
      },
    }
    setLoading(true);
    await onUpdate(updateAudioParams);
    setLoading(false);
    onCancel && onCancel();
  }

  return <Modal
    title={`${initialValue ? '编辑' : '新建'}音频信息`}
    visible={visible}
    onOk={form.submit}
    okButtonProps={{ loading }}
    onCancel={onCancel}
  >
    <Form
      {...formLayout}
      form={form}
      onFinish={initialValue ? handleUpdateAudio : handleCreateAudio}
    >
      {
        !initialValue && <Form.Item
          label="音频"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e.fileList)}
          required
        >
          <Upload
            action="/upload.do"
            listType="picture"
            withCredentials
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button>上传</Button>
          </Upload>
        </Form.Item>
      }
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="简介" name="synopsis">
        <Input.TextArea />
      </Form.Item>
    </Form>
  </Modal >

}

export default CreateOrEditModal;
