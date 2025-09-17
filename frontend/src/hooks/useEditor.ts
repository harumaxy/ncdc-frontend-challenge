import { create } from 'zustand';

type EditTarget = 'list' | 'title' | 'body';

interface EditorState {
  selectedId: number | null;
  editTarget: EditTarget | null;
  select: (id: number) => void;
  cancelSelect: () => void;
  edit: (target: EditTarget) => void;
  cancelEdit: () => void;
}

export const useEditor = create<EditorState>((set) => ({
  selectedId: null,
  editTarget: null,
  select: (id: number | null) => set({ selectedId: id }),
  cancelSelect: () => set({ selectedId: null }),
  edit: (editTarget: EditTarget) => set({ editTarget }),
  cancelEdit: () => set({ editTarget: null }),
}));
