import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  title: string;
  desc: string;
  children: React.JSX.Element;
  headerBtns?: React.JSX.Element;
  fullWidth?: boolean;
}

export default function ContentSection({
  title,
  desc,
  children,
  headerBtns,
  fullWidth = false,
}: ContentSectionProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between">
        <div className="">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
        <div className="flex flex-row gap-2 items-center justify-end">
          {headerBtns}
        </div>
      </div>
      <Separator className="my-4 flex-none" />
      <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
        <div className={cn("-mx-1 px-1.5", !fullWidth && "lg:max-w-xl")}>
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
