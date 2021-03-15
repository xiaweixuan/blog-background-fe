import React, { Fragment } from 'react';
import { Modal, Form, Image } from 'antd';

const ShowPhotoModal = ({ visible, onOk, currentPhoto }) => {
  return <Modal
    closable
    cancelText
    title="图片详情"
    visible={visible}
    onOk={onOk}
  >
    {
      currentPhoto && <Fragment>
        <Image src={currentPhoto.img_path} />
        <Form.Item label="图片地址">
          {currentPhoto.img_path}
        </Form.Item>
        <Form.Item label="图片简介">
          {currentPhoto.synopsis}
        </Form.Item>
        <Form.Item label="是否用于文章">
          {currentPhoto.type === 1 ? '是' : '否'}
        </Form.Item>
        <Form.Item label="创建时间">
          {currentPhoto.created_at}
        </Form.Item>
        <Form.Item label="更新时间">
          {currentPhoto.updated_at}
        </Form.Item>
      </Fragment>
    }
  </Modal>
}

export default ShowPhotoModal;