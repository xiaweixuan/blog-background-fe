import React, { Fragment } from 'react';
import connect from '../../utils/connect';
import ScriptStore from './Store';

const ScriptLayout = ({ children }) => (<Fragment>{children}</Fragment>)

export default connect(ScriptStore)(ScriptLayout)