import { useState } from 'react';
import type { Page } from '../hooks/usePages';
import IconButton from './IconButton';

interface EditorFormProps {
  initialText: string;
  onUpdate: (text: string) => void;
  formClass?: string;
}

function EditorForm({ initialText, onUpdate, formClass }: EditorFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(initialText);

  const handleSave = () => {
    onUpdate(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(initialText);
    setIsEditing(false);
  };

  const form = isEditing ? (
    <textarea
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      className="w-full block h-full border-none outline-none bg-transparent resize-none"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSave();
        } else if (e.key === 'Escape') {
          handleCancel();
        }
      }}
      autoFocus
    />
  ) : (
    <span className="w-full h-full">{initialText}</span>
  );
  const buttons = isEditing ? (
    <div className="flex gap-2">
      <IconButton
        size={16}
        icon="cancel"
        variant="ghost"
        onClick={handleCancel}
      />
      <IconButton size={16} icon="save" onClick={handleSave} />
    </div>
  ) : (
    <IconButton icon="edit" onClick={() => setIsEditing(true)} />
  );

  return (
    <div className={`flex gap-[40px] items-start justify-between`}>
      <div className={`pb-[20px] p-[30px] flex-1 ${formClass ?? ''}`}>
        {form}
      </div>
      {buttons}
    </div>
  );
}

interface EditorProps {
  page: Page;
  onTitleUpdate: (pageId: string, newTitle: string) => void;
  onContentUpdate: (pageId: string, newContent: string) => void;
}

export default function Editor({
  page,
  onTitleUpdate,
  onContentUpdate,
}: EditorProps) {
  return (
    <div className="p-[40px] flex-1 flex flex-col">
      <div className="h-full flex flex-col p-[30px] rounded-[16px] bg-[#F5F8FA]">
        {/* Title section */}
        <EditorForm
          initialText={page.title}
          onUpdate={(newTitle) => onTitleUpdate(page.id, newTitle)}
          formClass="text-2xl font-bold"
        />

        {/* Content section */}

        <EditorForm
          initialText={page.content}
          onUpdate={(newTitle) => onContentUpdate(page.id, newTitle)}
          formClass="bg-white"
        />
      </div>
    </div>
  );
}
