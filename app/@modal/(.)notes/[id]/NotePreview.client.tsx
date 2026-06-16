"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import { fetchSingleNote } from "@/lib/api/clientApi";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchSingleNote(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back(); // 🔥 повертає на попередній маршрут
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p>
            <b>Tag:</b> {data.tag}
          </p>
          <p>
            <b>Created:</b> {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </Modal>
  );
}
