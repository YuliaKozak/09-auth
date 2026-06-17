// proxy.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // 1. ЕТАП ОНОВЛЕННЯ: Якщо accessToken згорів, але є refreshToken — пробуємо оновитися ОДИН раз для всіх
  if (!accessToken && refreshToken) {
    try {
      const data = await checkSession();
      const setCookie = data?.headers?.["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };

          if (parsed.accessToken) {
            cookieStore.set("accessToken", parsed.accessToken, options);
            accessToken = parsed.accessToken; // Оновлюємо локальну змінну, щоб код нижче знав, що ми авторизовані!
          }
          if (parsed.refreshToken) {
            cookieStore.set("refreshToken", parsed.refreshToken, options);
          }
        }
      }
    } catch (error) {
      console.error("Token refresh failed in proxy:", error);
      // Якщо рефреш токен «тухлий» — далі перевірки розберуться
    }
  }

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // 2. ЕТАП ПЕРЕВІРКИ МАРШРУТІВ: тепер ми точно знаємо, авторизований юзер чи ні

  // Сценарій А: Юзер йде на /sign-in або /sign-up, але він ВЖЕ авторизований -> редірект на головну
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Сценарій Б: Юзер йде на приватні сторінки, але він НЕ авторизований -> редірект на логін
  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Сценарій В: Якщо токени оновилися успішно, передаємо нові куки далі. Інакше — просто йдемо далі
  return NextResponse.next({
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in/:path*",
    "/sign-up/:path*",
  ],
};
