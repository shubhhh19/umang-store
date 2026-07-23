export const metadata = {
  title: "Umang CMS Studio",
  description: "Self-service content management for Umang",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
