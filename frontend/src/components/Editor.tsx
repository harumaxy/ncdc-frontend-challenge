import {
  getContentControllerGetAllContentListQueryKey,
  useContentControllerUpdateContent,
  type Content,
} from '@ncdc-frontend-challenge/swagger';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useEditor } from '../hooks/useEditor';
import IconButton from './IconButton';

interface EditorFormProps {
  text: string;
  type: 'title' | 'body';
  onSave: () => void;
  onEdit: () => void;
}

type InputElement = HTMLTextAreaElement | HTMLInputElement;

function EditorForm({ text, type, onSave, onEdit }: EditorFormProps) {
  const editor = useEditor();
  const isEditing = type === editor.editTarget;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (e: React.ChangeEvent<InputElement>) => {
    editor.setEditText(e.target.value);
    editor.validate(e.target.value, type);
  };
  const onKeyDown = (e: React.KeyboardEvent<InputElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || type === 'title')) {
      onSave();
    } else if (e.key === 'Escape') {
      editor.cancelEdit();
    }
  };

  // 編集状態に入るときに、textarea にフォーカスしてテキスト末尾にカーソルを移動する
  useEffect(() => {
    if (!isEditing) return;
    if (type === 'title' && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
    if (type === 'body' && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing, type]);

  const form =
    type === 'title' ? (
      <input
        ref={inputRef}
        type="text"
        value={editor.editText}
        className="w-full block h-full border-none outline-none bg-transparent resize-none"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    ) : (
      <textarea
        ref={textareaRef}
        value={editor.editText}
        className="w-full block h-full border-none outline-none bg-transparent resize-none"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  const buttons = isEditing ? (
    <>
      <IconButton
        size={'w-16'}
        icon="cancel"
        variant="ghost"
        onClick={editor.cancelEdit}
        data-testid={`${type}-cancel-button`}
      />
      <IconButton
        size={'w-16'}
        icon="save"
        onClick={onSave}
        testid={`${type}-save-button`}
      />
    </>
  ) : (
    <IconButton icon="edit" onClick={onEdit} testid={`${type}-edit-button`} />
  );

  const errorMessage =
    editor.validation.status === 'error' && editor.validation.type === type
      ? editor.validation.errMsg
      : null;

  return (
    <div
      className={`flex gap-[40px] items-start ${type === 'body' ? 'flex-1' : ''}`}
    >
      <div
        className={`pb-[20px] p-[30px] flex-1 flex-col ${
          type === 'title'
            ? 'text-2xl font-bold'
            : 'bg-white flex-1 h-full rounded-[8px]'
        }`}
      >
        {isEditing ? (
          <>
            {errorMessage && (
              <div className="text-red-500 text-sm font-medium">
                {errorMessage}
              </div>
            )}
            {form}
          </>
        ) : (
          <>
            <div className="w-full h-full whitespace-break-spaces">{text}</div>
          </>
        )}
      </div>
      <div className="flex gap-2 w-[160px]">{buttons}</div>
    </div>
  );
}

export default function Editor({ content }: { content: Content }) {
  const queryClient = useQueryClient();
  const updateMutation = useContentControllerUpdateContent({
    mutation: {
      // 楽観的更新
      onMutate: async (updatedContent) => {
        const listKey = getContentControllerGetAllContentListQueryKey();
        const previousContents = queryClient.getQueryData<{ data: Content[] }>(
          listKey,
        );
        queryClient.setQueryData<{ data: Content[] }>(listKey, (old) => ({
          ...old,
          data: (old?.data ?? []).map((c) =>
            c.id === updatedContent.id ? { ...c, ...updatedContent.data } : c,
          ),
        }));
        return { previousContents };
      },
    },
  });
  const editor = useEditor();

  return (
    <div className="p-[40px] flex-1 flex flex-col">
      <div className="h-full flex flex-col p-[30px] rounded-[16px] bg-[#F5F8FA]">
        {/* Title section */}
        <EditorForm
          text={content.title ?? ''}
          type="title"
          onEdit={() => editor.edit('title', content.title ?? '')}
          onSave={() => {
            if (editor.validation.status === 'error') return;
            updateMutation.mutate({
              id: content.id,
              data: { title: editor.editText, body: content.body ?? '' },
            });
            editor.cancelEdit();
          }}
        />

        {/* Body section */}
        <EditorForm
          text={content.body ?? ''}
          type="body"
          onEdit={() => editor.edit('body', content.body ?? '')}
          onSave={() => {
            if (editor.validation.status === 'error') return;
            updateMutation.mutate({
              id: content.id,
              data: { title: content.title ?? '', body: editor.editText },
            });
            editor.cancelEdit();
          }}
        />
      </div>
    </div>
  );
}
