import React, { useEffect, useState } from 'react';
import { Card, List, Button } from 'antd';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import { useStoreState, useStoreActions } from '../ArticleStore';
import styles from './index.less';

const ArticleCardList = ({ currentType, currentTag, history }) => {
  const [loading, setLoading] = useState(false);

  const { articleList } = useStoreState();
  const { onFetch } = useStoreActions();

  useEffect(() => {
    (async () => {
      setLoading(true)
      await onFetch({
        type_id: currentType,
        tag_id: currentTag,
      });
      setLoading(false)
    })()
  }, [onFetch, currentType, currentTag])

  return <Card>
    <List
      rowKey="id"
      loading={loading}
      grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
      dataSource={articleList}
      renderItem={item => (
        <List.Item>
          <Card
            className={styles.card}
            hoverable
            cover={<img alt={item.title} src={item.cover} />}
            onClick={() => history.push(`/article/content/${item.id}`)}
          >
            <Card.Meta
              title={<a>{item.title}</a>}
              description={<span>{item.synopsis}</span>}
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
          </Card>
        </List.Item>
      )} />
  </Card>
}

export default withRouter(ArticleCardList);