// components/TimeColumn.tsx
export function TimeColumn({ hours }: { hours: string[] }) {
  return (
    <div className="col-span-1 border-r bg-muted text-sm font-medium text-center sticky left-0 z-10">
      {hours.map((hour) => (
        <div
          key={hour}
          className="h-10 flex items-center justify-center border-b"
        >
          {hour}
        </div>
      ))}
    </div>
  );
}
