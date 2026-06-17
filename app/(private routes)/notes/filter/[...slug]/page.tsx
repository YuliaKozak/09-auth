import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? "all";

  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  const title = `${formattedTag} Notes | NoteHub`;
  const description = `Manage your ${tag} notes, tasks, and ideas efficiently with NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${formattedTag} Notes`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page = "1", search = "" } = await searchParams;

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
