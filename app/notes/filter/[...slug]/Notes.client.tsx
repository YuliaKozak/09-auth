"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link"; // 1. Імпортуємо Link для навігації

// Видалено імпорти Modal та NoteForm, бо вони тут більше не потрібні
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api/clientApi";

import css from "./NotesPage.module.css";

type NotesClientProps = {
  tag: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  // Видалено стейт const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={debouncedSetSearch} />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        {/* 2. Замінюємо <button> на <Link> з маршрутом на сторінку створення */}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <div className={css.mainContent}>
        <h1>{tag === "all" ? "All Notes" : `${tag} Notes`}</h1>

        {isLoading && <p>Loading notes...</p>}
        {isError && <p>Something went wrong...</p>}

        {!isLoading &&
          !isError &&
          (notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <p>No notes found in this category.</p>
          ))}
      </div>

      {/* 3. Весь блок <Modal>...</Modal> повністю видалено */}
    </div>
  );
}
