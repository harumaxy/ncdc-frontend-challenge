import type { Page } from '../hooks/usePages';
import SidebarFooter from './Footer';
import HeaderLogo from './HeaderLogo';

interface SidebarProps {
  pages: Page[];
  currentPageId: string;
  onPageSelect: (pageId: string) => void;
  onPageDelete: (pageId: string) => void;
  onPageAdd: () => void;
}

export default function Sidebar({
  pages,
  currentPageId,
  onPageSelect,
  onPageDelete,
  onPageAdd,
}: SidebarProps) {
  return (
    <div className="w-64 pl-[40px] border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="pt-[30px] pb-[20px]">
        <HeaderLogo />
      </div>

      {/* Pages list */}
      <div className="flex-1">
        <div className="space-y-1">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`p-2 rounded cursor-pointer flex items-center justify-between group ${
                currentPageId === page.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onPageSelect(page.id)}
            >
              <span className="truncate">{page.title}</span>
              <button
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPageDelete(page.id);
                }}
              >
                −
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <SidebarFooter onPageAdd={onPageAdd} />
    </div>
  );
}
