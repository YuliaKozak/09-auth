// app/(public routes)/sign-in/page.tsx

"use client";

// Додаємо імпорти
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { ApiError } from "@/lib/api/api";
//import css from "./SignInPage.module.css";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as LoginRequest; // Виконуємо запит
      const res = await login(formValues); // Виконуємо редірект або відображаємо помилку
      if (res) {
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
      );
    }
  };

  return (
    <form action={handleSubmit}>
            <h1>Sign in</h1>     {" "}
      <label>
                Email         <input type="email" name="email" required />   
         {" "}
      </label>
           {" "}
      <label>
                Password        {" "}
        <input type="password" name="password" required />     {" "}
      </label>
            <button type="submit">Log in</button>      {error && <p>{error}</p>}
         {" "}
    </form>
  );
};

export default SignIn;
