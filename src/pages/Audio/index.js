import React, { Fragment, useState } from 'react';
import { Button, Popconfirm, Card, List } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import connect from '../../utils/connect';
import CreateOrEditModal from './CreateOrEditModal';
import AudioStore, { useStoreState, useStoreActions } from './Store';
import styles from './index.less';

const Audio = () => {

  const [visible, setVisible] = useState();
  const [currentAudio, setCurrentAudio] = useState();

  const { audioList, loading } = useStoreState();
  const { onRemove } = useStoreActions();

  const handleRemoveScript = async ({ id }) => {
    await onRemove({ audioId: id });
  }

  return <Fragment>
    <CreateOrEditModal
      visible={visible}
      initialValue={currentAudio}
      onCancel={() => {
        setCurrentAudio();
        setVisible(false);
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
        grid={{ gutter: 24, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        dataSource={audioList}
        renderItem={item => (
          <List.Item>
            <Card
              cover={<audio controls alt={item.title} src={item.audio_path} />}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setCurrentAudio(item);
                    setVisible(true);
                  }}
                />,
                <Popconfirm
                  key="delete"
                  title="确定删除这首动人的歌曲么？"
                  onConfirm={() => handleRemoveScript(item)}
                  okText="残忍删除"
                  cancelText="我在想想"
                >
                  <DeleteOutlined />
                </Popconfirm>
              ]}
            >
              <Card.Meta
                title={<span>{item.title}</span>}
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

export default connect(AudioStore)(Audio);