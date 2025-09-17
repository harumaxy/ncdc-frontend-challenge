import IconButton from './IconButton';

interface Props {
  onPageAdd: () => void;
}

export default function SidebarFooter({ onPageAdd }: Props) {
  return (
    <div className="p-4 border-t border-gray-200 space-y-2">
      <IconButton icon="new-page" onClick={onPageAdd} className="w-full" />
    </div>
  );
}
