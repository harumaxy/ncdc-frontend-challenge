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

      {currentPage && (
        <Editor
          page={currentPage}
          onTitleUpdate={updatePageTitle}
          onContentUpdate={updatePageContent}
        />
      )}
    </div>
  );
}

export default App;
