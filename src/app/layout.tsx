import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { seedProducts } from '@/FakeData/seed';
seedProducts();

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'eCommerce dashboard',
  description: 'Just a project for learning',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-full min-w-80 max-w-7xl m-auto bg-gray-100 dark:bg-gray-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
