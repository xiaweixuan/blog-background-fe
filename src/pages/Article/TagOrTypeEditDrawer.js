import React, { useState } from 'react';
import { Popconfirm, Drawer, Tag, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useStoreState as useArticleTagStoreState,
  useStoreActions as useStoreTagActions,
} from './ArticleTagStore';
import {
  useStoreState as useArticleTypeStoreState,
  useStoreActions as useStoreTypeActions,
} from './ArticleTypeStore';
import styles from './index.less';

const TagOrTypeEditDrawer = ({ visible, onClose }) => {

  const [editable, setEditable] = useState();
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(false);

  const { tagList } = useArticleTagStoreState();
  const { onAdd: onTagAdd, onRemove: onTagRemove } = useStoreTagActions();
  const { typeList } = useArticleTypeStoreState();
  const { onAdd: onTypeAdd, onRemove: onTypeRemove } = useStoreTypeActions();

  const handleAddType = async () => {
    await onTypeAdd({ name: inputValue })
    setInputValue();
    setEditable();
  }
  const handleRemoveType = async (typeId) => {
    setLoading(true);
    await onTypeRemove({ typeId });
    setLoading(false);
  }
  const handleAddTag = async () => {
    await onTagAdd({ name: inputValue })
    setInputValue();
    setEditable();
  }
  const handleRemoveTag = async (tagId) => {
    setLoading(true);
    await onTagRemove({ tagId });
    setLoading(false);
  }

  return <Drawer
    title="标签与类别管理"
    placement="right"
    closable={false}
    onClose={onClose}
    visible={visible}
  >
    <h3>标签：</h3>
    {tagList && tagList.map((tag) =>
      <Popconfirm
        key={tag.id}
        title={`确定删除这个【${tag.name}】么`}
        onConfirm={() => handleRemoveTag(tag.id)}
        okButtonProps={{ loading }}
        okText="残忍删除"
        cancelText="我在想想"
      >
        <Tag >{tag.name}</Tag>
      </Popconfirm>
    )}
    {editable !== 'tag' && <PlusOutlined onClick={() => setEditable('tag')} />}
    {editable === 'tag' &&
      <Input
        size="small"
        value={inputValue}
        className={styles.tagInput}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleAddTag}
      />
    }
    <h3>类别：</h3>
    {typeList && typeList.map((type) =>
      <Popconfirm
        key={type.id}
        title={`确定删除这个【${type.name}】么`}
        onConfirm={() => handleRemoveType(type.id)}
        okButtonProps={{ loading }}
        okText="残忍删除"
        cancelText="我在想想"
      >
        <Tag>{type.name}</Tag>
      </Popconfirm>
    )}
    {editable !== 'type' && <PlusOutlined onClick={() => setEditable('type')} />}
    {editable === 'type' &&
      <Input
        size="small"
        value={inputValue}
        className={styles.tagInput}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleAddType}
      />
    }
  </Drawer>
}

export default TagOrTypeEditDrawer;
