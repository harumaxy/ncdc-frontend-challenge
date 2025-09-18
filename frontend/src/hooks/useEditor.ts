import { create } from 'zustand';

type EditTarget = 'list' | 'title' | 'body';

type Validation =
  | { status: 'ok' }
  | { status: 'error'; type: 'title' | 'body'; errMsg: string };

interface EditorState {
  selectedId: number | null;
  editTarget: EditTarget | null;
  editText: string;
  validation: Validation;
  select: (id: number) => void;
  cancelSelect: () => void;
  edit: (target: EditTarget, initialText?: string) => void;
  cancelEdit: () => void;
  setEditText: (editText: string, type: 'title' | 'body') => void;
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
  },
  cancelEdit: () => {
    set({ editTarget: null, editText: '', validation: { status: 'ok' } });
  },
  setEditText: (editText: string, type: 'title' | 'body') => {
    const validation = validate(editText, type);
    set({ editText, validation });
  },
}));

function validate(text: string, type: 'title' | 'body'): Validation {
  const isOverTitleLimit =
    type === 'title' && (text.length < 1 || text.length > 50);
  if (isOverTitleLimit) {
    return {
      status: 'error',
      type,
      errMsg: 'タイトルは1文字以上、50文字以下である必要があります',
    };
  }
  const isOverBodyLimit =
    type === 'body' && (text.length < 10 || text.length > 2000);
  if (isOverBodyLimit) {
    return {
      status: 'error',
      type,
      errMsg: '本文は10文字以上、2000文字以下である必要があります',
    };
  }
  return { status: 'ok' };
}
