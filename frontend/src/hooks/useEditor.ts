import { create } from 'zustand';

type EditTarget = 'list' | 'title' | 'body';

interface EditorState {
  selectedId: number | null;
  editTarget: EditTarget | null;
  editText: string;
  select: (id: number) => void;
  cancelSelect: () => void;
  edit: (target: EditTarget, initialText?: string) => void;
  cancelEdit: () => void;
  setEditText: (editText: string) => void;
}

export const useEditor = create<EditorState>((set, get) => ({
  selectedId: null,
  editTarget: null,
  editText: '',
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
  edit: (editTarget: EditTarget, initialText?: string) =>
    set({ editTarget, editText: initialText ?? '' }),
  cancelEdit: () => set({ editTarget: null, editText: '' }),
  setEditText: (editText: string) => set({ editText }),
}));
