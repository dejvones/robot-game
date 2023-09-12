import Editor from '@monaco-editor/react';
import { setEditorInput } from '../utils';

export const EditorComponent = () => {
  const options = {
        contextmenu: false,
        minimap: {enabled: false}
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