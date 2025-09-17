import { useState } from 'react';

export interface Page {
  id: string;
  title: string;
  content: string;
}

const mockPages: Page[] = [
  {
    id: '1',
    title: '坊ちゃん',
    content:
      '親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無謀をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負けるような弱虫と云われて、悔しかったから、なんの気にしない気になって、頭から飛び降りて見たが、考えてみるとこれはいささか無謀だった。こんな類はほかにもある。',
  },
  {
    id: '2',
    title: '学問のすゝめ',
    content:
      '天は人の上に人を造らず人の下に人を造らずと言えり。されば天より人を生ずるには、万人は万人みな同じ位にして、生まれながら貴賤上下の差別なく、万物の霊たる身と心との働きをもって天地の間にあるよろずの物を資り、もって衣食住の用を達し、自由自在、互いに人の妨げをなさずしてめいめい安楽にこの世を渡らしめ給うの趣意なり。',
  },
  {
    id: '3',
    title: '舞姫',
    content:
      '石炭をば早や積み果てつ。中等室の卓のほとりはいと静にて、熾熱燈の光の晴れがましきも徒なり。今宵は夜毎にここに集ひ来る骨牌仲間も「ホテル」に宿りて、舟に残れるは余一人のみなれば。',
  },
];

export function usePages() {
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [currentPageId, setCurrentPageId] = useState<string>('1');

  const currentPage = pages.find((page) => page.id === currentPageId);

  const addNewPage = () => {
    const newId = String(pages.length + 1);
    const newPage: Page = {
      id: newId,
      title: '新しいページ',
      content: 'ここに内容を入力してください。',
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newId);
  };

  const deletePage = (pageId: string) => {
    if (pages.length <= 1) return; // Don't allow deleting the last page

    const updatedPages = pages.filter((page) => page.id !== pageId);
    setPages(updatedPages);

    if (currentPageId === pageId) {
      setCurrentPageId(updatedPages[0].id);
    }
  };

  const updatePageTitle = (pageId: string, newTitle: string) => {
    if (newTitle.length === 0 || newTitle.length > 50) return;

    setPages(
      pages.map((page) =>
        page.id === pageId ? { ...page, title: newTitle } : page,
      ),
    );
  };

  const updatePageContent = (pageId: string, newContent: string) => {
    if (newContent.length < 10 || newContent.length > 2000) return;

    setPages(
      pages.map((page) =>
        page.id === pageId ? { ...page, content: newContent } : page,
      ),
    );
  };

  return {
    pages,
    currentPage,
    currentPageId,
    setCurrentPageId,
    addNewPage,
    deletePage,
    updatePageTitle,
    updatePageContent,
  };
}
