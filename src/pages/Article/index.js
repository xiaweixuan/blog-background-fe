import React, { useState } from 'react';
import { Card, Button, Drawer, Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import ArticleCardList from './ArticleCardList';
import TagOrTypeEditDrawer from './TagOrTypeEditDrawer';
import { useStoreState as useArticleTagStoreState } from './ArticleTagStore';
import { useStoreState as useArticleTypeStoreState } from './ArticleTypeStore';
import styles from './index.less';

const Article = ({ history }) => {

  const [visible, setVisible] = useState(false);

  const [currentType, setCurrentType] = useState();
  const [currentTag, setCurrentTag] = useState();

  const { tagList } = useArticleTagStoreState();
  const { typeList } = useArticleTypeStoreState();

  return <div>
    <TagOrTypeEditDrawer visible={visible} onClose={() => setVisible(false)}/>
    <Button
      type="primary"
      onClick={() => history.push('/article/create')}
      style={{ marginBottom: '15px', marginRight: '15px' }}
    >
      新建文章
       </Button>
    <Button
      type="default"
      onClick={() => setVisible(true)}
    >
      类别与标签管理
      </Button>
    <Card style={{ marginBottom: '25px' }}>
      <div className={styles.selectContain}>
        <h4>文章类别:</h4>
        <div>
          <span
            key="all"
            className={classNames(styles.selectItem, { [styles.activedSelectItem]: !currentType })}
            onClick={() => setCurrentType()}
          >
            全部
            </span>
          {typeList && typeList.map(
            (item) =>
              <span
                key={item.id}
                className={classNames(styles.selectItem, { [styles.activedSelectItem]: currentType === item.id })}
                onClick={() => setCurrentType(item.id)}
              >{item.name}</span>
          )}
        </div>
      </div>
      <div className={styles.selectContain}>
        <h4>文章标签:</h4>
        <div>
          <span
            key="all"
            className={classNames(styles.selectItem, { [styles.activedSelectItem]: !currentTag })}
            onClick={() => setCurrentTag()}
          >
            全部
            </span>
          {tagList && tagList.map(
            (item) =>
              <span
                key={item.id}
                className={classNames(styles.selectItem, { [styles.activedSelectItem]: currentTag === item.id })}
                onClick={() => setCurrentTag(item.id)}
              >{item.name}</span>
          )}
        </div>
      </div>
    </Card>
    <ArticleCardList currentType={currentType} currentTag={currentTag} />
  </div>
}

export default Article;