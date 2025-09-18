import { create } from 'zustand';

type EditTarget = 'list' | 'title' | 'body';

interface EditorState {
  selectedId: number | null;
  editTarget: EditTarget | null;
  editText: string;
  validation:
    | { status: 'ok' }
    | { status: 'error'; type: 'title' | 'body'; errMsg: string };
  select: (id: number) => void;
  cancelSelect: () => void;
  edit: (target: EditTarget, initialText?: string) => void;
  cancelEdit: () => void;
  setEditText: (editText: string) => void;
  validate: (text: string, type: 'title' | 'body') => void;
  clearValidationError: () => void;
}

export const useEditor = create<EditorState>((set, get) => ({
  selectedId: null,
  editTarget: null,
  editText: '',
  validation: { status: 'ok' } as const,
  select: (id: number | null) => {
    const { selectedId: previousId, editTarget } = get();
    if (id === previousId) return; // noop
    // 別のコンテンツを選択したら、title or body の編集状態を解除
    set({
      selectedId: id,
      editTarget: editTarget === 'list' ? editTarget : null,
      editText: '',
    });
  },
  cancelSelect: () => set({ selectedId: null }),
  edit: (editTarget: EditTarget, initialText?: string) => {
    set({ editTarget, editText: initialText ?? '' });
    get().clearValidationError();
  },
  cancelEdit: () => {
    set({ editTarget: null, editText: '' });
    get().clearValidationError();
  },
  setEditText: (editText: string) => set({ editText }),
  validate: (text: string, type: 'title' | 'body') => {
    const isOverTitleLimit =
      type === 'title' && (text.length < 1 || text.length > 50);
    if (isOverTitleLimit) {
      set({
        validation: {
          status: 'error',
          type,
          errMsg: 'タイトルは1文字以上、50文字以下である必要があります',
        },
      });
      return;
    }
    const isOverBodyLimit =
      type === 'body' && (text.length < 10 || text.length > 2000);
    if (isOverBodyLimit) {
      set({
        validation: {
          status: 'error',
          type,
          errMsg: '本文は10文字以上、2000文字以下である必要があります',
        },
      });
      return;
    }
    set({ validation: { status: 'ok' } });
  },
  clearValidationError: () => set({ validation: { status: 'ok' } }),
}));
