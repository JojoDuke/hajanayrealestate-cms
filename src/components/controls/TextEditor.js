import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import MUIRichTextEditor from "mui-rte";
import { EditorState, convertToRaw, getCurrentContent } from "draft-js";


const MySuperScriptIcon = () => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        className="MuiSvgIcon-root"
      >
        <g>
          <rect fill="none" height="24" width="24" x="0" y="0" />
          <path d="M22,7h-2v1h3v1h-4V7c0-0.55,0.45-1,1-1h2V5h-3V4h3c0.55,0,1,0.45,1,1v1C23,6.55,22.55,7,22,7z M5.88,20h2.66l3.4-5.42h0.12 l3.4,5.42h2.66l-4.65-7.27L17.81,6h-2.68l-3.07,4.99h-0.12L8.85,6H6.19l4.32,6.73L5.88,20z" />
        </g>
      </svg>
  );
}

const emptyContentState = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));

const TextEditor = ({save, initialValues=emptyContentState, name, label="Textový editor", placeholder="Začněte psát...", error="", setEditorChanged}) => {
 
  const [ dataFromEditor, setDataFromEditor ] = useState(initialValues);
  
  const saveTextEditor = (data) => {
    setDataFromEditor(data);
    save(name, data);
    setEditorChanged(false);
  }

  /*const getDefaultValues = ( ) => {
    defaultValues = initialValues;
    return defaultValues;
  }

  useEffect(() => {
    change();
  }, [EditorState])
  */

  

  const setChange = (data) => {


      /*if (JSON.stringify(convertToRaw(data.getCurrentContent())) !== JSON.stringify(dataFromEditor)) {
        console.log("changed");
        setEditorChanged(true);
        setDataFromEditor(convertToRaw(data.getCurrentContent()));
      }*/

      if (JSON.stringify(convertToRaw(data.getCurrentContent())) !== dataFromEditor) {
        setEditorChanged(true);
      }

      setDataFromEditor(JSON.stringify(convertToRaw(data.getCurrentContent())));
  }
  
  

  
  useEffect(() => {
    setTimeout(() => {
      setEditorChanged(false);
    }, 1500);
    
  }, [])  

  return(
    <div style={{margin: '16px 8px 8px 8px', width: '100%', position: 'relative'}}>
      <MUIRichTextEditor
          label={placeholder}
          defaultValue={initialValues}
          onSave={saveTextEditor}
          onChange={setChange}
          toolbar={true}
          controls={["bold", "italic", "underline", "superscript", "save"]}
          customControls={[
            {
              name: "superscript",
              icon: <MySuperScriptIcon />,
              type: "inline",
              inlineStyle: { fontSize: "0.6em", verticalAlign: "super" }
            }
          ]}
          inlineToolbar={true}
          inlineToolbarControls={["bold", "italic", "superscript"]}
          error={error === "" ? false : true}
        />
        <span style={{position: 'absolute', top: '0', left: '0', transform: 'translate(1px, -8px) scale(0.85)', background: 'linear-gradient(0deg, rgba(247,250,255,1) 0%, rgba(255,255,255,1) 100%)', padding: '0 5px', color: 'rgba(0,0,0,0.5)'}}>
          {label}
        </span>
        {error !== "" && <span style={{color: 'red', margin: '3px 12px 0 12px', fontSize: '12px', width: '100%'}}>{error}</span>}
      </div>
  );
};

export default TextEditor;