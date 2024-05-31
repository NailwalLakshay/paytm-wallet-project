export function Card({
  title,
  children,
  classname
}: {
  title: string;
  children: React.ReactNode;
  classname? : string
}): JSX.Element {
  return (
    <div className={`${classname} flex flex-col p-2 gap-2`}>
      <h1 className="font-semibold text-xl">{title}</h1>
      <div className="border-b"></div>
      {children}
    </div>
  );
}
