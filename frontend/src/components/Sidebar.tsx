import {
  getContentControllerGetAllContentListQueryKey,
  useContentControllerAddContent,
  useContentControllerDeleteContent,
  useContentControllerGetAllContentList,
  type Content,
} from '@ncdc-frontend-challenge/swagger';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useMemo } from 'react';
import { useEditor } from '../hooks/useEditor';
import HeaderLogo from './HeaderLogo';
import IconButton from './IconButton';

export default function Sidebar() {
  const queryResult = useContentControllerGetAllContentList();
  const editor = useEditor();
  const isEditingList = editor.editTarget === 'list';

  const renderedContents = useMemo(() => {
    const contents = queryResult.data?.data ?? [];
    return contents.map((content) => (
      <ListItem
        key={content.id}
        content={content}
        isActive={editor.selectedId === content.id}
        isEditing={editor.editTarget === 'list'}
      />
    ));
  }, [queryResult.data?.data, editor.selectedId, editor.editTarget]);

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
        {renderedContents}
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

  const handleClick = useCallback(
    () => editor.select(content.id),
    [editor, content.id],
  );

  const handleDelete = useCallback(async () => {
    if (editor.selectedId === content.id) {
      editor.cancelSelect();
    }
    await deleteMutation.mutate({ id: content.id });
  }, [editor, content.id, deleteMutation]);

  return (
    <div
      className={`p-2 h-[44px] rounded-[4px] cursor-pointer flex items-center justify-between group ${
        isActive
          ? 'bg-brand-gray text-primary font-bold'
          : 'hover:bg-brand-gray'
      }`}
      onClick={handleClick}
    >
      <span className="truncate">{content.title}</span>
      {isEditing && <DeleteButton onClick={handleDelete} />}
    </div>
  );
}

const DeleteButton = React.memo(function DeleteButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <img
      src="/icon/delete.svg"
      width="24px"
      onClick={onClick}
      className="hover:bg-[#E6E6E6] active:bg-[#CCC] disabled:text-[#ECECEC] rounded-[4px]"
    />
  );
});

interface SidebarFooterProps {
  isEditing: boolean;
}

function SidebarFooter({ isEditing }: SidebarFooterProps) {
  const editor = useEditor();
  const queryClient = useQueryClient();
  const addMutation = useContentControllerAddContent();

  const handleAddContent = useCallback(async () => {
    const { data } = await addMutation.mutateAsync({
      data: {
        title: '新しいコンテンツ',
        body: '内容を入力してください',
      },
    });
    const listKey = getContentControllerGetAllContentListQueryKey();
    // レスポンスの作成されたデータを使ってリストに楽観的追加をする
    queryClient.setQueryData<{ data: Content[] }>(listKey, (old) => ({
      ...old,
      data: [...(old?.data ?? []), data],
    }));
  }, [addMutation, queryClient]);

  const handleEditList = useCallback(() => editor.edit('list'), [editor]);

  const buttons = useMemo(
    () =>
      isEditing ? (
        <>
          <IconButton
            key="left"
            icon="new-page"
            variant="inverted"
            onClick={handleAddContent}
          />
          <IconButton
            key="right"
            icon="done"
            variant="primary"
            onClick={editor.cancelEdit}
          />
        </>
      ) : (
        <>
          <div className="w-32" key="left">
            {/* spacer */}
          </div>
          <IconButton
            key="right"
            icon="edit"
            onClick={handleEditList}
            className="w-full"
            testid="list-edit-button"
          />
        </>
      ),
    [isEditing, handleAddContent, editor.cancelEdit, handleEditList],
  );

  return (
    <div className="flex justify-center p-4 gap-[10px] bg-brand-gray">
      {buttons}
    </div>
  );
}
