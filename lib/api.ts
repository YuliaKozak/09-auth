// src/lib/api.ts

import axios from "axios";
import type { Note } from "../types/note";

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const noteInstance = axios.create({
  baseURL: "https://next-v1-notes-api.goit.study",
});

noteInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await noteInstance.get<FetchNotesResponse>("/notes", {
    params: { page, search, tag },
  });
  return response.data;
};

export const fetchSingleNote = async (id: string): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await noteInstance.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};
export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const getCategories = async () => {
  const res = await axios<Category[]>("/categories");
  return res.data;
};
