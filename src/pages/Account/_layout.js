import React, { Fragment } from 'react';
import AccountStore from './Store';
import connect from '../../utils/connect';

const AccountLayout = ({ children }) => (<Fragment>{children}</Fragment>)

export default connect(AccountStore)(AccountLayout)