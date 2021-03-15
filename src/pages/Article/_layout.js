import React, { Fragment } from 'react';
import connect from '../../utils/connect';
import ArticleStore from './ArticleStore';
import ArticleTagStore from './ArticleTagStore';
import ArticleTypeStore from './ArticleTypeStore';

const ArticleLayout = ({ children }) => (<Fragment>{children}</Fragment>)

export default connect(ArticleTagStore, ArticleTypeStore, ArticleStore)(ArticleLayout)