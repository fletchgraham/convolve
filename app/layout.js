export const metadata = {
  title: "Convolution Demo",
  description: "Demo of a kernel mask application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          padding: 16,
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
