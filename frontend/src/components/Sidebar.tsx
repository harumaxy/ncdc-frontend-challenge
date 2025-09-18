import {
  getContentControllerGetAllContentListQueryKey,
  useContentControllerAddContent,
  useContentControllerDeleteContent,
  useContentControllerGetAllContentList,
  type Content,
} from '@ncdc-frontend-challenge/swagger';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useEditor } from '../hooks/useEditor';
import HeaderLogo from './HeaderLogo';
import IconButton from './IconButton';

export default function Sidebar() {
  const contents = useContentControllerGetAllContentList().data?.data ?? [];
  const editor = useEditor();
  const isEditingList = editor.editTarget === 'list';

  return (
    <div
      className="h-screen w-80 border-r border-gray-200 flex flex-col"
      data-testid="sidebar"
    >
      {/* Header */}
      <div className="pl-[40px] pt-[30px] pb-[20px]">
        <HeaderLogo />
      </div>

      {/* Contents list */}
      <div className="pl-[40px] flex-1 flex flex-col gap-1 overflow-y-auto">
        {contents.map((content) => (
          <ListItem
            key={content.id}
            content={content}
            isActive={editor.selectedId === content.id}
            isEditing={editor.editTarget === 'list'}
          />
        ))}
      </div>

      {/* Bottom navigation */}
      <SidebarFooter isEditing={isEditingList} />
    </div>
  );
}

interface ListItemProps {
  content: Content;
  isActive: boolean;
  isEditing: boolean;
}

function ListItem({ content, isActive, isEditing }: ListItemProps) {
  const editor = useEditor();
  const queryClient = useQueryClient();
  const deleteMutation = useContentControllerDeleteContent({
    mutation: {
      // コンテンツを削除したとき、レスポンスを待たず楽観的更新をする
      onMutate: async ({ id }) => {
        const listKey = getContentControllerGetAllContentListQueryKey();
        const previousContents = queryClient.getQueryData<{ data: Content[] }>(
          listKey,
        );
        queryClient.setQueryData<{ data: Content[] }>(listKey, (old) => ({
          ...old,
          data: (old?.data ?? []).filter((c) => c.id !== id),
        }));
        return { previousContents };
      },
    },
  });

  return (
    <div
      className={`p-2 h-[44px] rounded-[4px] cursor-pointer flex items-center justify-between group ${
        isActive ? 'bg-brand-gray text-primary' : 'hover:bg-brand-gray'
      }`}
      onClick={() => editor.select(content.id)}
    >
      <span className="truncate">{content.title}</span>
      {isEditing && (
        <DeleteButton
          onClick={async () => {
            if (editor.selectedId === content.id) {
              editor.cancelSelect();
            }
            await deleteMutation.mutate({ id: content.id });
          }}
        />
      )}
    </div>
  );
}

function DeleteButton({ onClick }: { onClick?: () => void }) {
  return <img src="/icon/delete.svg" width="24px" onClick={onClick} />;
}

interface SidebarFooterProps {
  isEditing: boolean;
}

function SidebarFooter({ isEditing }: SidebarFooterProps) {
  const editor = useEditor();
  const addMutation = useContentControllerAddContent();
  const queryClient = useQueryClient();

  const buttons = React.useMemo(() => {
    return isEditing ? (
      <>
        <IconButton
          icon="new-page"
          variant="inverted"
          onClick={async () => {
            addMutation.mutate({
              data: {
                title: '新しいコンテンツ',
                body: '内容を入力してください',
              },
            });
            const listKey = getContentControllerGetAllContentListQueryKey();
            // サーバー側で振られる serial id が不明なため、楽観的更新できないので再クエリ
            queryClient.invalidateQueries({ queryKey: listKey });
          }}
        />
        <IconButton icon="done" variant="primary" onClick={editor.cancelEdit} />
      </>
    ) : (
      <IconButton
        icon="edit"
        onClick={() => editor.edit('list')}
        className="w-full"
        testid="list-edit-button"
      />
    );
  }, [addMutation, editor, isEditing, queryClient]);

  return (
    <div className="flex justify-end p-4 gap-2 bg-brand-gray">{buttons}</div>
  );
}
