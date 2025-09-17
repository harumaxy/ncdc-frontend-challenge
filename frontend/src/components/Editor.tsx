import { useEffect, useState } from 'react';
import type { Page } from '../hooks/usePages';
import IconButton from './IconButton';

interface TitleEditorProps {
  title: string;
  onTitleUpdate: (newTitle: string) => void;
}

function TitleEditor({ title, onTitleUpdate }: TitleEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  useEffect(() => {
    setEditValue(title);
  }, [title]);

  const handleSave = () => {
    onTitleUpdate(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="text-2xl font-bold w-full border-none outline-none bg-transparent"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            } else if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          autoFocus
        />
        <div className="flex gap-2">
          <IconButton icon="save" onClick={handleSave} />
          <IconButton icon="cancel" onClick={handleCancel} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <h1
        className="text-2xl font-bold cursor-pointer hover:bg-gray-50 p-1 rounded"
        onClick={() => setIsEditing(true)}
      >
        {title}
      </h1>
      <IconButton icon="edit" onClick={() => setIsEditing(true)} />
    </div>
  );
}

interface ContentEditorProps {
  content: string;
  onContentUpdate: (newContent: string) => void;
}

function ContentEditor({ content, onContentUpdate }: ContentEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);

  useEffect(() => {
    setEditValue(content);
  }, [content]);

  const handleSave = () => {
    onContentUpdate(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="h-full flex flex-col space-y-3">
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 w-full resize-none border-none outline-none text-sm leading-relaxed"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          autoFocus
        />
        <div className="flex gap-2">
          <IconButton icon="save" onClick={handleSave} />
          <IconButton icon="cancel" onClick={handleCancel} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative group h-full">
      <div
        className="text-sm leading-relaxed cursor-pointer h-full hover:bg-gray-50 p-2 rounded"
        onClick={() => setIsEditing(true)}
      >
        {content}
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
        <IconButton
          icon="edit"
          onClick={() => setIsEditing(true)}
          className="text-xs px-2 py-1"
        />
      </div>
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
      <div className="p-[30px] rounded-[16px] bg-[#F5F8FA]">
        {/* Title section */}
        <TitleEditor
          title={page.title}
          onTitleUpdate={(newTitle) => onTitleUpdate(page.id, newTitle)}
        />

        {/* Content section */}
        <div className="flex-1 p-6">
          <ContentEditor
            content={page.content}
            onContentUpdate={(newContent) =>
              onContentUpdate(page.id, newContent)
            }
          />
        </div>
      </div>
    </div>
  );
}
