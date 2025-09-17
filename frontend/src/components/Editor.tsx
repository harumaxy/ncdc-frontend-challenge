import { useState } from 'react';

interface Page {
  id: string;
  title: string;
  content: string;
}

interface EditorProps {
  page: Page;
  onTitleUpdate: (pageId: string, newTitle: string) => void;
  onContentUpdate: (pageId: string, newContent: string) => void;
}

export default function Editor({ page, onTitleUpdate, onContentUpdate }: EditorProps) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingContent, setEditingContent] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      {/* Title section */}
      <div className="p-6 border-b border-gray-200">
        {editingTitle ? (
          <input
            type="text"
            defaultValue={page.title}
            className="text-2xl font-bold w-full border-none outline-none bg-transparent"
            onBlur={(e) => {
              onTitleUpdate(page.id, e.target.value);
              setEditingTitle(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onTitleUpdate(page.id, (e.target as HTMLInputElement).value);
                setEditingTitle(false);
              }
            }}
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2">
            <h1
              className="text-2xl font-bold cursor-pointer hover:bg-gray-50 p-1 rounded"
              onClick={() => setEditingTitle(true)}
            >
              {page.title}
            </h1>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setEditingTitle(true)}
            >
              ✎
            </button>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="flex-1 p-6">
        {editingContent ? (
          <textarea
            defaultValue={page.content}
            className="w-full h-full resize-none border-none outline-none text-sm leading-relaxed"
            onBlur={(e) => {
              onContentUpdate(page.id, e.target.value);
              setEditingContent(false);
            }}
            autoFocus
          />
        ) : (
          <div className="relative group h-full">
            <div
              className="text-sm leading-relaxed cursor-pointer h-full hover:bg-gray-50 p-2 rounded"
              onClick={() => setEditingContent(true)}
            >
              {page.content}
            </div>
            <button
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700"
              onClick={() => setEditingContent(true)}
            >
              ✎
            </button>
          </div>
        )}
      </div>
    </div>
  );
}