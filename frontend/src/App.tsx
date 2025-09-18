import {
  useContentControllerGetAllContentList,
  type Content,
} from '@ncdc-frontend-challenge/swagger';
import { useMemo } from 'react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import { useEditor } from './hooks/useEditor';

function App() {
  const editor = useEditor();
  const result = useContentControllerGetAllContentList<{ data: Content[] }>();

  const selectedContent = useMemo(
    () => result.data?.data.find((content) => content.id === editor.selectedId),
    [result.data?.data, editor.selectedId],
  );

  return (
    <div className="flex h-screen bg-white font-noto-sans-jp">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        {selectedContent ? (
          <Editor content={selectedContent} />
        ) : (
          <div className="flex-1">{/* 選択がない時のスペーサー */}</div>
        )}
        <div className="flex w-full px-[30px] pb-4 justify-between">
          <div>Copyright © 2025 ~ </div>
          <div>運営会社</div>
        </div>
      </div>
    </div>
  );
}

export default App;
