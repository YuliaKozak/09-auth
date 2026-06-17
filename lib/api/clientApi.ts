//lib/api/clientApi.ts
import { api } from "./api";
import type { Note } from "../../types/note";
import { User } from "@/types/user";

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

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search, tag },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get("/auth/session");
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>("/auth/me");
  return res.data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const res = await api.patch<User>("/auth/update", data);
  return res.data;
};
