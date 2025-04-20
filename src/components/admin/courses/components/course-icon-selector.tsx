import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
// import { CheckIcon } from "lucide-react";
import { CourseIcon, courseIcons } from "@/constants/courseIcons";

interface IconSelectorProps {
  selectedIconId: number | undefined;
  onIconSelect: (iconId: number) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIconId,
  onIconSelect,
}) => {
  const [open, setOpen] = useState(false);
  const selectedIcon: CourseIcon =
    courseIcons.find((icon) => icon.id == selectedIconId) ?? courseIcons[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <selectedIcon.icon className={`size-6 ${selectedIcon.color}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-50 w-64 p-2 max-h-60 overflow-y-auto rounded-xl bg-popover shadow-md scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent"
      >
        <div className="grid grid-cols-6 gap-1">
          {courseIcons
            .filter((icon) => icon.id !== 0)
            .map((icon) => {
              const isSelected = icon.id == selectedIconId;
              return (
                <Button
                  key={icon.id}
                  onClick={() => {
                    onIconSelect(icon.id);
                    setOpen(false);
                  }}
                  variant={isSelected ? "outline" : "ghost"}
                  size="icon"
                >
                  <icon.icon className={`size-7 ${icon.color} `} />
                </Button>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default IconSelector;
