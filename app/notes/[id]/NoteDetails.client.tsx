"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchSingleNote } from "../../../lib/api";
import css from "./NoteDetails.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter(); // Хук для навігації назад

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchSingleNote(id),
    refetchOnMount: false,
    enabled: !!id, // Запит не почнеться, поки id не завантажиться з URL
  });

  // Обробка стану завантаження
  if (isLoading) return <p className={css.loading}>Loading...</p>;

  // Обробка помилки або відсутності нотатки
  if (error || !note) return <p className={css.error}>Some error..</p>;

  // Форматування дати
  const formattedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString()
    : "Unknown date";

  // Функція повернення на попередню сторінку
  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        {/* Кнопка "Назад" тепер інтегрована у вашу стильну верстку */}
        <button onClick={handleGoBack} className={css.backButton}>
          ← Back
        </button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>Created at: {formattedDate}</p>
        </div>
      </div>
    </main>
  );
};

export default NoteDetailsClient;
