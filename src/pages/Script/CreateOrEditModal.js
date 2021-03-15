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

  const handleCreateScript = async (val) => {
    const createScriptParams = {
      createScriptDto: {
        synopsis: val.synopsis,
        file: val.file[0].originFileObj,
      },
    };
    setLoading(true);
    await onAdd(createScriptParams);
    setLoading(false);
    onCancel && onCancel();
  }

  const handleUpdateScript = async (val) => {
    const updateScriptParams = {
      scriptId: initialValue.id,
      updateScriptDto: { synopsis: val.synopsis },
    }
    setLoading(true);
    await onUpdate(updateScriptParams);
    setLoading(false);
    onCancel && onCancel();
  }

  return <Modal
    title={`${initialValue ? '编辑' : '新建'}脚本信息`}
    visible={visible}
    onOk={form.submit}
    okButtonProps={{ loading }}
    onCancel={onCancel}
  >
    <Form
      {...formLayout}
      form={form}
      onFinish={initialValue ? handleUpdateScript : handleCreateScript}
    >
      {
        !initialValue && <Form.Item
          label="脚本"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e.fileList)}
          required
        >
          <Upload
            action="#"
            withCredentials
            maxCount={1}
            listType="picture"
            beforeUpload={() => false}
          >
            <Button>上传</Button>
          </Upload>
        </Form.Item>
      }
      <Form.Item label="简介" name="synopsis">
        <Input.TextArea />
      </Form.Item>
    </Form>
  </Modal >

}

export default CreateOrEditModal;
