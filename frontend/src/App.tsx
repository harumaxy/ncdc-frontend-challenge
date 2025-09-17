import Editor from './components/Editor';
import PageList from './components/PageList';
import { usePages } from './hooks/usePages';

function App() {
  const {
    pages,
    currentPage,
    currentPageId,
    setCurrentPageId,
    addNewPage,
    deletePage,
    updatePageTitle,
    updatePageContent,
  } = usePages();

  return (
    <div className="flex h-screen bg-white font-noto-sans-jp">
      <PageList
        pages={pages}
        currentPageId={currentPageId}
        onPageSelect={setCurrentPageId}
        onPageDelete={deletePage}
        onPageAdd={addNewPage}
      />

      <div className="flex flex-1 flex-col">
        {currentPage && (
          <Editor
            page={currentPage}
            onTitleUpdate={updatePageTitle}
            onContentUpdate={updatePageContent}
          />
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
