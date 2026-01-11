import { AuthenticationProvider } from "./context/authentication-context";
import { ThemeProvider } from "./context/theme-context";
import "./globals.css";

export const metadata = {
  title: "Mini SaaS Dashboard",
  description: "Frontend Developer Assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <AuthenticationProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
