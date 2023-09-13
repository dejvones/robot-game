import Editor from '@monaco-editor/react';
import { setEditorInput } from '../utils';
import { GameStatus } from '../domains';
import { useEffect, useState } from 'react';

interface props {
  status: GameStatus
}

export const EditorComponent = ({status} : props) => {
  const [readOnly, setReadOnly] = useState<boolean>(false);
  useEffect(() => {
    setReadOnly(status === GameStatus.Running);
  },[status])


  const options = {
        contextmenu: false,
        minimap: {enabled: false},
        readOnly: readOnly
    }

  function handleEditorChange(value : string | undefined) : void {
    if (value)
        setEditorInput(value);
  }

  return (
    <Editor
        className='my-3'
      height="60vh"
      width="30vw"
      defaultValue=""
      theme="vs-dark"
      options={options}
      onChange={(value) => handleEditorChange(value)}
      
    />
  );
}