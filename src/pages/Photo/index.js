import React, { useState, Fragment } from 'react';
import { Card, List, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, CodeOutlined } from '@ant-design/icons';
import moment from 'moment';
import CreateOrEditModal from './CreateOrEditModal';
import ShowPhotoModal from './ShowPhotoModal';
import connect from '../../utils/connect';
import PhotoStore, { useStoreState, useStoreActions } from './Store'
import styles from './index.less'

const Photo = () => {

  const [visible, setVisible] = useState(false);
  const [showPhotoModalVisible, setShowPhotoModalVisible] = useState(false);

  const [currentPhoto, setCurrentPhoto] = useState();

  const { photoList, loading } = useStoreState();
  const { onRemove } = useStoreActions();

  const handleRemovePhoto = async ({ id }) => {
    await onRemove({ photoId: id });
  }

  return <Fragment>
    <CreateOrEditModal
      visible={visible}
      initialValue={currentPhoto}
      onCancel={() => {
        setCurrentPhoto();
        setVisible(false);
      }}
    />
    <ShowPhotoModal
      cancelText
      currentPhoto={currentPhoto}
      visible={showPhotoModalVisible}
      onOk={() => {
        setCurrentPhoto();
        setShowPhotoModalVisible(false);
      }}
    />
    <Button
      type="primary"
      onClick={() => setVisible(true)}
      style={{ marginBottom: '7px' }}
    >
      新建
    </Button>
    <Card>
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={photoList}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={item.title} src={item.img_path} />}
              actions={[
                <CodeOutlined
                  key="open"
                  onClick={() => {
                    setCurrentPhoto(item);
                    setShowPhotoModalVisible(true);
                  }}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setCurrentPhoto(item);
                    setVisible(true);
                  }}
                />,
                <Popconfirm
                  key="delete"
                  title="确定删除这张动人的图片么？"
                  onConfirm={() => handleRemovePhoto(item)}
                  okText="残忍删除"
                  cancelText="我在想想"
                >
                  <DeleteOutlined />
                </Popconfirm>
              ]}
            >
              <Card.Meta
                title={<a>{item.save_name}</a>}
                description={<span>{item.synopsis}</span>}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.created_at).format('MMMM Do YYYY')}</span>
                <span>{moment(item.updated_at).format('MMMM Do YYYY')}</span>
              </div>
            </Card>
          </List.Item>
        )} />
    </Card>
  </Fragment>
}

export default connect(PhotoStore)(Photo);