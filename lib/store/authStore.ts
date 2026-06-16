import { create } from "zustand";
import { User } from "@/types/user"; // Імпортуємо глобальний інтерфейс User

// 1. Визначаємо інтерфейс для нашого стору
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

// 2. Створюємо стор із використанням подвійних дужок для коректного виведення типів TypeScript
export const useAuthStore = create<AuthStore>()((set) => ({
  // Початковий стан
  user: null,
  isAuthenticated: false,

  // Метод для запису даних користувача після успішного логіну/реєстрації
  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  // Метод для очищення стану під час виходу (logout)
  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
