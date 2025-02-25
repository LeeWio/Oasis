export default function BlogrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="inline-block text-center w-full justify-center">
        {children}
      </div>
    </section>
  );
}
