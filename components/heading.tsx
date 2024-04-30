import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";

interface HeadingProps {
  title: string;
  link: string;
}

export default function Heading({ title, link }: HeadingProps) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="font-semibold">{title}</h2>

      <Button
        variant="ghost"
        className="h-fit p-0 text-primary hover:bg-transparent"
      >
        See all
        <ChevronRightIcon size={16} />
      </Button>
    </div>
  );
}
