import React, { useEffect } from 'react';
import { useStoreState } from './Store';

const ScriptContent = ({ match: { params: { script_id } } }) => {
  const { scriptById } = useStoreState();

  const currentScript = scriptById[Number(script_id)];

  useEffect(() => {
    var customIframe = document.getElementById('customIframe');
    var div = document.createElement('div');
    div.id = "root";
    customIframe.contentDocument.body.appendChild(div);
    var script = customIframe.contentDocument.createElement('script');
    script.src = currentScript && currentScript.script_path;
    customIframe.contentDocument.body.appendChild(script);
  }, [scriptById])

  return <iframe
    id="customIframe"
    style={{ width: '100%', height: 'calc(100% - 180px)' }}
  ></iframe>
}

export default ScriptContent;
