import React from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import "./TextEditor.css";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "|",
    "code",
    "|",
    "undo",
    "redo",
  ],
};

function TextEditor(props) {
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={props.initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.bodyContent(data);
      }}
      onBlur={(event, editor) => {
        const data = editor.getData();
        props.onBlur(data);
      }}
      name="body"
      id="body"
      className="h-60"
    />
  );
}

export default TextEditor;
