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
  isEditing: boolean;
  onSave: () => void;
  onEdit: () => void;
  formClass?: string;
  containerClass?: string;
}

function EditorForm({
  text,
  isEditing,
  onSave,
  onEdit,
  formClass,
  containerClass,
}: EditorFormProps) {
  const editor = useEditor();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 編集状態に入るときに、textarea にフォーカスしてテキスト末尾にカーソルを移動する
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
      value={editor.editText}
      onChange={(e) => editor.setEditText(e.target.value)}
      className="w-full block h-full border-none outline-none bg-transparent resize-none"
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          onSave();
        } else if (e.key === 'Escape') {
          editor.cancelEdit();
        }
      }}
    />
  ) : (
    <div className="w-full h-full whitespace-break-spaces">{text}</div>
  );
  const buttons = isEditing ? (
    <>
      <IconButton
        size={'w-16'}
        icon="cancel"
        variant="ghost"
        onClick={editor.cancelEdit}
      />
      <IconButton size={'w-16'} icon="save" onClick={onSave} />
    </>
  ) : (
    <IconButton icon="edit" onClick={onEdit} />
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
          isEditing={editor.editTarget === 'title'}
          text={content.title ?? ''}
          onEdit={() => editor.edit('title', content.title ?? '')}
          onSave={() => {
            updateMutation.mutate({
              id: content.id,
              data: { title: editor.editText, body: content.body ?? '' },
            });
            editor.cancelEdit();
          }}
          formClass="text-2xl font-bold"
        />

        {/* Body section */}
        <EditorForm
          isEditing={editor.editTarget === 'body'}
          text={content.body ?? ''}
          onEdit={() => editor.edit('body', content.body ?? '')}
          onSave={() => {
            updateMutation.mutate({
              id: content.id,
              data: { title: content.title ?? '', body: editor.editText },
            });
            editor.cancelEdit();
          }}
          formClass="bg-white flex-1 h-full"
          containerClass="flex-1"
        />
      </div>
    </div>
  );
}
