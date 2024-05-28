export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col p-2 gap-2">
      <h1 className="font-semibold text-xl">{title}</h1>
      <div className="border-b"></div>
      {children}
    </div>
  );
}
