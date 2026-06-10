import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export const metadata = {
  title: "My Notes | NoteHub",
  description: "Manage your personal notes here.",
};

type Props = {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function NotesPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page = "1", search = "" } = await searchParams;

  // 👉 витягуємо тег із URL
  const tag = slug?.[0] ?? "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", Number(page), search, tag],
    queryFn: () => fetchNotes(Number(page), search, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
