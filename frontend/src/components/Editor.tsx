import { useEffect, useRef, useState } from 'react';
import type { Page } from '../hooks/usePages';
import IconButton from './IconButton';

interface EditorFormProps {
  initialText: string;
  onUpdate: (text: string) => void;
  formClass?: string;
  containerClass?: string;
}

function EditorForm({
  initialText,
  onUpdate,
  formClass,
  containerClass,
}: EditorFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    onUpdate(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(initialText);
    setIsEditing(false);
  };

  useEffect(() => {
    setEditValue(initialText);
  }, [initialText]);

  // 編集状態に入るときに、textarea にフォーカスして最後尾にカーソルを移動する
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing]);

  const form = isEditing ? (
    <textarea
      ref={textareaRef}
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      className="w-full block h-full border-none outline-none bg-transparent resize-none"
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          handleSave();
        } else if (e.key === 'Escape') {
          handleCancel();
        }
      }}
    />
  ) : (
    <div className="w-full h-full whitespace-break-spaces">{initialText}</div>
  );
  const buttons = isEditing ? (
    <>
      <IconButton
        size={16}
        icon="cancel"
        variant="ghost"
        onClick={handleCancel}
      />
      <IconButton size={16} icon="save" onClick={handleSave} />
    </>
  ) : (
    <IconButton icon="edit" onClick={() => setIsEditing(true)} />
  );

  return (
    <div className={`flex gap-[40px] items-start ${containerClass ?? ''}`}>
      <div className={`pb-[20px] p-[30px] flex-1 flex-col ${formClass ?? ''}`}>
        {form}
      </div>
      <div className="flex gap-2 w-[160px]">{buttons}</div>
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
          formClass="bg-white flex-1 h-full"
          containerClass="flex-1"
        />
      </div>
    </div>
  );
}
