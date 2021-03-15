import React, { useState, useEffect } from 'react';
import { Modal, Form, Image, Input, Upload, Button } from 'antd';
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

  const handleCreatePhoto = async (val) => {
    const createPhotoParams = {
      createPhotoDto: {
        synopsis: val.synopsis,
        type: 2,
        file: val.file[0].originFileObj,
      },
    };
    setLoading(true);
    await onAdd(createPhotoParams);
    setLoading(false);
    onCancel && onCancel();
  }

  const handleUpdatePhoto = async (val) => {
    const updatePhotoParams = {
      photoId: initialValue.id,
      updatePhotoDto: { synopsis: val.synopsis },
    }
    setLoading(true);
    await onUpdate(updatePhotoParams);
    setLoading(false);
    onCancel && onCancel();
  }

  return <Modal
    title={`${initialValue ? '编辑' : '新建'}文章信息`}
    visible={visible}
    onOk={form.submit}
    okButtonProps={{ loading }}
    onCancel={onCancel}
  >
    <Form
      {...formLayout}
      form={form}
      onFinish={initialValue ? handleUpdatePhoto : handleCreatePhoto}
    >
      {
        initialValue ?
          <Form.Item label="图片">
            <Image src={initialValue.img_path} />
          </Form.Item> :
          <Form.Item
            label="图片"
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
      <Form.Item label="简介" name="synopsis">
        <Input.TextArea disabled={!!(initialValue && initialValue.type === 1)} />
      </Form.Item>
    </Form>
  </Modal >

}

export default CreateOrEditModal;
