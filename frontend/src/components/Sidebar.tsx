import HeaderLogo from './HeaderLogo';
import Footer from './Footer';

interface Page {
  id: string;
  title: string;
  content: string;
}

interface SidebarProps {
  pages: Page[];
  currentPageId: string;
  onPageSelect: (pageId: string) => void;
  onPageDelete: (pageId: string) => void;
  onPageAdd: () => void;
}

export default function Sidebar({ pages, currentPageId, onPageSelect, onPageDelete, onPageAdd }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <HeaderLogo />
      </div>

      {/* Pages list */}
      <div className="flex-1 p-4">
        <div className="space-y-1">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`p-2 rounded cursor-pointer flex items-center justify-between group ${
                currentPageId === page.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
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

        {/* Add page button */}
        <button
          className="mt-4 w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-gray-400 hover:text-gray-600"
          onClick={onPageAdd}
        >
          + 新しいページ
        </button>
      </div>

      {/* Bottom navigation */}
      <Footer />
    </div>
  );
}