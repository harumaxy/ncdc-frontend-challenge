interface Props {
  onPageAdd: () => void;
}

export default function SidebarFooter({ onPageAdd }: Props) {
  return (
    <div className="p-4 border-t border-gray-200 space-y-2">
      {/* Add page button */}
      <button
        className="mt-4 w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-gray-400 hover:text-gray-600"
        onClick={onPageAdd}
      >
        + 新しいページ
      </button>
    </div>
  );
}
