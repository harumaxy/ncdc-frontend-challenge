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

export const useEditor = create<EditorState>((set) => ({
  selectedId: null,
  editTarget: null,
  editText: '',
  select: (id: number | null) => set({ selectedId: id }),
  cancelSelect: () => set({ selectedId: null }),
  edit: (editTarget: EditTarget, initialText?: string) =>
    set({ editTarget, editText: initialText ?? '' }),
  cancelEdit: () => set({ editTarget: null, editText: '' }),
  setEditText: (editText: string) => set({ editText }),
}));
