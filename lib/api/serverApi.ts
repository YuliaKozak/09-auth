//lib/api/serverApi.ts
import { api } from "./api";
import type { Note } from "../../types/note";
import { FetchNotesResponse } from "./clientApi";

import { User } from "../../types/user";
import { cookies } from "next/headers";

const getAuthHeaders = () => {
  const cookieStore = cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search, tag },
    ...getAuthHeaders(),
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`, getAuthHeaders());
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me", getAuthHeaders());
  return response.data;
};

export const checkSession = async () => {
  const response = await api.get("/auth/session", getAuthHeaders());
  return response.data;
};
