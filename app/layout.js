export const metadata = {
  title: "Convolution Demo",
  description: "Demo of a kernel mask application.",
};

export default function RootLayout({ children }) {
  // some typical style settings
  const bodyStyle = {
    margin: 0,
    padding: 0,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  };
  return (
    <html lang="en">
      <body style={bodyStyle}>{children}</body>
    </html>
  );
}
