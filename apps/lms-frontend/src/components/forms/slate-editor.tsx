import React, { useState, useMemo } from 'react';
import { Slate, Editable, withReact, ReactEditor, useSlate } from 'slate-react';
import { BaseEditor, Editor } from 'slate';
import { createEditor, Descendant } from 'slate';
import { BiBold, BiItalic, BiPaperclip } from 'react-icons/bi';
import { IoImagesOutline } from 'react-icons/io5';
import { Button } from '@skillprompt-lms/libs/ui-components/components/button';

interface SlateEditorProps {
  goBack: () => void;
}

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string; bold?: boolean; italic?: boolean };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Helper functions
const isMarkActive = (editor: ReactEditor, format: string) => {
  const [match] = Array.from(
    Editor.nodes(editor as BaseEditor & ReactEditor, {
      match: (n) => (n as any)[format] === true,
      universal: true,
    })
  );
  return !!match;
};

const toggleMark = (editor: ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor as BaseEditor & ReactEditor, format);
  } else {
    Editor.addMark(editor as BaseEditor & ReactEditor, format, true);
  }
};

const ToolbarButton: React.FC<{
  format?: string;
  icon: JSX.Element;
  onClick?: () => void;
}> = ({ format, icon, onClick }) => {
  const editor = useSlate();
  return (
    <button
      className={`p-2 bg-gray-200 rounded hover:bg-gray-300 ${
        format && isMarkActive(editor, format) ? 'bg-gray-300' : ''
      }`}
      onMouseDown={(e) => {
        e.preventDefault();
        if (format) {
          toggleMark(editor, format);
        } else if (onClick) {
          onClick();
        }
      }}
    >
      {icon}
    </button>
  );
};

const SlateEditor: React.FC<SlateEditorProps> = ({ goBack }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'Start writing your article here...' }],
    },
  ]);

  const renderLeaf = (props: any) => {
    const { attributes, children, leaf } = props;
    let modifiedChildren = children;

    if (leaf.bold) {
      modifiedChildren = <strong>{modifiedChildren}</strong>;
    }
    if (leaf.italic) {
      modifiedChildren = <em>{modifiedChildren}</em>;
    }

    return <span {...attributes}>{modifiedChildren}</span>;
  };

  const handleAttachmentUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Attachment uploaded: ${file.name}`);
      }
    };
    input.click();
  };

  const handleMediaUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Media uploaded: ${file.name}`);
      }
    };
    input.click();
  };

  return (
    <div className=" p-2 border border-gray-300 rounded-md bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">Add Article</h4>
        <Button
          type="button"
          className="text-gray-600 text-sm hover:underline bg-gray-50"
          name="Go Back"
          onClick={goBack}
        />
      </div>

      {/* Text Editor with Toolbar */}
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => setValue(newValue)}
      >
        {/* Toolbar */}
        <div className="flex items-center space-x-2 mb-4">
          <ToolbarButton format="bold" icon={<BiBold />} />
          <ToolbarButton format="italic" icon={<BiItalic />} />
          <ToolbarButton
            icon={<BiPaperclip />}
            onClick={handleAttachmentUpload}
          />
          <ToolbarButton
            icon={<IoImagesOutline />}
            onClick={handleMediaUpload}
          />
        </div>

        {/* Editable Text Area */}
        <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
          <Editable
            placeholder="Type your article content here..."
            renderLeaf={renderLeaf}
          />
        </div>
      </Slate>

      {/* Save Button */}
      <div className="mt-4 text-right">
        <Button
          type="button"
          name="Save"
          className="bg-custom-teal py-2 px-4 text-white rounded-md hover:bg-custom-dark-teal"
        />
      </div>
    </div>
  );
};

export default SlateEditor;
