import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface HeadingProps {
  title: string;
  className?: string;
  link?: string;
}

export default function Heading({ title, link, className }: HeadingProps) {
  const hasLink = !!link;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="font-semibold">{title}</h2>

      {hasLink && (
        <Button
          variant="ghost"
          className="h-fit p-0 text-primary hover:bg-transparent"
          asChild
        >
          <Link href={link} passHref>
            See all
            <ChevronRightIcon size={16} />
          </Link>
        </Button>
      )}
    </div>
  );
}
