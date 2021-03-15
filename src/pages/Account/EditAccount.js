import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useStoreState, useStoreActions } from './Store';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const EditAccount = ({ history }) => {

  const [submitting, setSubmitting] = useState(false);

  const { accountMsg: currentUser } = useStoreState()
  const { onUpdate } = useStoreActions();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [form, currentUser])

  const handleUpdateAccount = async (val) => {
    const { customFields, ...rest } = val;
    const updateAccountDto = {
      custom_fields: JSON.stringify(customFields),
      ...rest,
    }
    setSubmitting(true);
    await onUpdate(updateAccountDto);
    setSubmitting(false);
    history.push('/account/overview');
  }

  return <Card>
    <Form
      form={form}
      {...formItemLayout}
      onFinish={handleUpdateAccount}
    >
      <Form.Item label="姓名" name="name" required>
        <Input placeholder="姓名" />
      </Form.Item>
      <Form.Item label="签名" name="autograph" required>
        <Input.TextArea placeholder="请输入签名" />
      </Form.Item>
      <Form.Item label="邮箱" name="email" required>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item label="QQ" name="qq" required>
        <Input placeholder="请输入qq" />
      </Form.Item>
      <Form.Item label="微信" name="weixin" required>
        <Input placeholder="请输入微信" />
      </Form.Item>
      <Form.Item label="自定义字段">
        <Form.List name="customFields">
          {(fields, { add, remove }) => (
            <div>
              <Row gutter={24} style={{ padding: '6px 0' }}>
                <Col span={12}>名称</Col>
                <Col span={12}>内容</Col>
              </Row>
              {fields.map((field) => (
                <Row
                  key={field.key}
                  align="middle"
                  gutter={24}
                  style={{ marginBottom: '15px' }}
                >
                  <Col span={10}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'key']}
                      fieldKey={[field.fieldKey, 'key']}
                      style={{ marginBottom: 0 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'value']}
                      fieldKey={[field.fieldKey, 'value']}
                      style={{ marginBottom: 0 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <div style={{ lineHeight: '32px', fontSize: '18px', color: '#c44' }}>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </div>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  <PlusOutlined /> 添加
                  </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button onClick={() => history.push('/account/overview')} style={{ marginRight: '25px' }}>取消</Button>
        <Button htmlType="submit" type="primary" loading={submitting}>保存</Button>
      </Form.Item>
    </Form>
  </Card >
}

export default EditAccount;
