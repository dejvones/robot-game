import Editor from '@monaco-editor/react';

export const EditorComponent = () => {
    const options = {
        contextmenu: false,
        minimap: {enabled: false}
    }

    let lastValue = '';

  function handleEditorChange(value : string | undefined) : void {
    if (value)
        lastValue = value;
    console.log(lastValue);
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