export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">Seedo</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
