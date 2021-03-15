import React, { useState, Fragment } from 'react';
import { Card, List, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, CodeOutlined } from '@ant-design/icons';
import moment from 'moment';
import CreateOrEditModal from './CreateOrEditModal';
import { useStoreState, useStoreActions } from './Store';
import styles from './index.less';

const Script = ({ history }) => {

  const [visible, setVisible] = useState(false);
  const [currentScript, setCurrentScript] = useState();

  const { scriptList, loading } = useStoreState();
  const { onRemove } = useStoreActions();

  const handleRemoveScript = async ({ id }) => {
    await onRemove({ scriptId: id });
  }

  return <Fragment>
    <CreateOrEditModal
      visible={visible}
      initialValue={currentScript}
      onCancel={() => {
        setCurrentScript();
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
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={scriptList}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <CodeOutlined
                  key="open"
                  onClick={() => history.push(`/script/content/${item.id}`)}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setCurrentScript(item);
                    setVisible(true);
                  }}
                />,
                <Popconfirm
                  key="delete"
                  title="确定删除这个脚本么？"
                  onConfirm={() => handleRemoveScript(item)}
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

export default Script;