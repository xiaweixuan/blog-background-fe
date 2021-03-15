import React from 'react';
import { Button } from 'antd';
import ArticleEditorCard from '../ArticleEditorCard';
import ArticleContentHeader from './ArticleContentHeader'
import CommentCard from './CommentCard';
import { useStoreState } from '../ArticleStore';


const ArticleContent = ({ match: { params: { article_id } }, history }) => {

  const { articlebyId } = useStoreState();

  const currentArticle = articlebyId[Number(article_id)];
  const articleContent = currentArticle ?
    JSON.parse(currentArticle.json_content) :
    { blocks: [] }

  return <div>
    <ArticleContentHeader currentArticle={currentArticle} />
    <ArticleEditorCard
      value={articleContent}
      readOnly
      extra={[
        <Button
          key="editableSwitch"
          type="primary"
          style={{ marginRight: '25px' }}
          onClick={() => history.push(`/article/edit/${article_id}`)}
        >
          编辑文章
        </Button>
      ]}
    />
    <CommentCard />
  </div>
}

export default ArticleContent;
