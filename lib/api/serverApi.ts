//lib/api/serverApi.ts
import { api } from "./api";
import type { Note } from "../../types/note";
import { FetchNotesResponse } from "./clientApi";

import { User } from "../../types/user";
import { cookies } from "next/headers";

export const getAuthHeaders = async () => {
  const cookieStore = await cookies();
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
  const authHeaders = await getAuthHeaders();
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search, tag },
    ...authHeaders,
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const authHeaders = await getAuthHeaders();
  const response = await api.get<Note>(`/notes/${id}`, authHeaders);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const authHeaders = await getAuthHeaders();
  const response = await api.get<User>("/users/me", authHeaders);
  return response.data;
};

export const checkSession = async () => {
  const authHeaders = await getAuthHeaders();
  const response = await api.get("/auth/session", authHeaders);
  return response;
};
