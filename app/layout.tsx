import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning attributes mismatch ko ignore karne ke liye zaroori hai
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#0a0a0b]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}