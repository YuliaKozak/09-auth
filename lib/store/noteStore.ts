// app/lib/stores/noteStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreateNoteData } from "../api/clientApi"; // Використовуємо CreateNoteData, де є tag

type NoteDraftStore = {
  draft: CreateNoteData;
  setDraft: (note: Partial<CreateNoteData>) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo", // Значення за замовчуванням
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (updatedFields) =>
        set((state) => ({
          draft: { ...state.draft, ...updatedFields },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
