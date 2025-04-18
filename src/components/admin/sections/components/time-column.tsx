import { slotHeight, timeSlots } from "@/constants/section.constants";

export default function TimeColumn() {
  return (
    <div className="col-span-1 border-r bg-muted   text-center sticky left-0 z-10">
      <div className="sticky top-0 bg-secondary text-center  border-b h-10">
        {/* Schedule */}
      </div>
      {timeSlots.map(
        ({ label }, i) =>
          i % 4 === 0 && (
            <div
              key={i}
              className="bg-secondary flex items-center justify-end border-b text-xs p-2"
              style={{
                height: `${slotHeight * 4}px`,
              }}
            >
              {label}
            </div>
          )
      )}
    </div>
  );
}
