import React, { useState } from 'react';
import { Card, List, Popconfirm, Button } from 'antd';
import connect from '../../../../utils/connect'
import CommentStore, { useStoreState, useStoreActions } from './Store';

const CommentCard = ({ articleId }) => {

  const [loading, setLoading] = useState(false);

  const { commentList } = useStoreState();
  const { onRemove } = useStoreActions();

  const handleRemoveComment = async (id) => {
    setLoading(true);
    await onRemove({ articleId, commentId: id });
    setLoading(false);
  };

  return <Card>
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={commentList}
      loading={loading}
      renderItem={item => (
        <List.Item
          actions={
            [
              <Popconfirm
                title="确定删除这条真诚的评论么"
                onConfirm={() => handleRemoveComment(item.id)}
                okText="残忍删除"
                cancelText="我在想想"
              >
                <Button type="link" danger>删除</Button>
              </Popconfirm>

            ]
          }
        >
          <List.Item.Meta
            title={`${item.author}(${item.email})`}
            description={`评论时间：${item.created_at}`}
          />
          <div>{item.content}</div>
        </List.Item>
      )}
    />
  </Card>
}

export default connect(CommentStore)(CommentCard);