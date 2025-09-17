import React from 'react';
import type { Page } from '../hooks/usePages';
import HeaderLogo from './HeaderLogo';
import IconButton from './IconButton';

interface PageListProps {
  pages: Page[];
  currentPageId: string;
  onPageSelect: (pageId: string) => void;
  onPageDelete: (pageId: string) => void;
  onPageAdd: () => void;
}

export default function PageList({
  pages,
  currentPageId,
  onPageSelect,
  onPageDelete,
  onPageAdd,
}: PageListProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="h-screen w-80 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="pl-[40px] pt-[30px] pb-[20px]">
        <HeaderLogo />
      </div>

      {/* Pages list */}
      <div className="pl-[40px] flex-1 flex flex-col gap-1 overflow-y-auto">
        {pages.map((page) => (
          <ListItem
            key={page.id}
            page={page}
            isActive={currentPageId === page.id}
            onClick={() => onPageSelect(page.id)}
            onDelete={() => onPageDelete(page.id)}
            isEditing={isEditing}
          />
        ))}
      </div>

      {/* Bottom navigation */}
      <SidebarFooter
        onPageAdd={onPageAdd}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

interface ListItemProps {
  page: Page;
  isActive: boolean;
  isEditing: boolean;
  onClick: () => void;
  onDelete: () => void;
}

function ListItem({
  page,
  isActive,
  isEditing,
  onClick,
  onDelete,
}: ListItemProps) {
  return (
    <div
      className={`p-2 h-[44px] rounded-[4px] cursor-pointer flex items-center justify-between group ${
        isActive ? 'bg-brand-gray text-primary' : 'hover:bg-brand-gray'
      }`}
      onClick={onClick}
    >
      <span className="truncate">{page.title}</span>
      {isEditing && <DeleteButton onClick={onDelete} />}
    </div>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return <img src="/icon/delete.svg" width="24px" onClick={onClick} />;
}

interface SidebarFooterProps {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onPageAdd: () => void;
}

function SidebarFooter({
  onPageAdd,
  isEditing,
  setIsEditing,
}: SidebarFooterProps) {
  const buttons = React.useMemo(() => {
    return isEditing ? (
      <>
        <IconButton icon="new-page" variant="inverted" onClick={onPageAdd} />
        <IconButton
          icon="done"
          variant="primary"
          onClick={() => setIsEditing(false)}
        />
      </>
    ) : (
      <IconButton
        icon="edit"
        onClick={() => setIsEditing(true)}
        className="w-full"
      />
    );
  }, [isEditing, onPageAdd, setIsEditing]);

  return (
    <div className="flex justify-end p-4 gap-2 bg-brand-gray">{buttons}</div>
  );
}
