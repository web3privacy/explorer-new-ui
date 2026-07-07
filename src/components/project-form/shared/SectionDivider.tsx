export function SectionDivider({ title }: { title: string }) {
  return (
    <div className="my-10 mb-6 flex w-full items-center gap-4 lg:gap-8">
      <span className="whitespace-nowrap font-dm-mono text-sm font-bold text-muted-foreground uppercase">
        {title}
      </span>
      <div className="w-full border-t-2 border-border" />
    </div>
  );
}
