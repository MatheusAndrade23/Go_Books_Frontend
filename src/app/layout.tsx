import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { ThemeProvider } from "../providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const metadata = {
  title: "Go Books",
  description: "Um site de leilão de livros!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </AuthProvider>
          <ToastContainer
            autoClose={3000}
            pauseOnHover={false}
            style={{ width: "max-content" }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
