"use client";
import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor({value, onEditorChange}) {
  const editorRef = useRef(null);
  
 

  return (
    <div className="mt-5">
      <Editor
        apiKey="9uvk7rg4faiuobmtr8lt3t97cetb04d27wzh1emsmzg817vj"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={onEditorChange}
        value={value}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style: `
    body {
      font-family: Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: #eee3bc;
    }
  `,
        }}
      />
    </div>
  );
}
