import React from 'react';

const connect = (Store) => {
  const StoreCom = Store;
  return (ComponentView) => {
    return (props) => <StoreCom><ComponentView {...props} /></StoreCom>
  }
}

export default connect;