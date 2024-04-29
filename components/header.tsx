import Image from "next/image";
import { Button } from "./ui/button";
import { AlignRight } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src="/logo.svg" alt="Foodie" height={30} width={100} priority />

      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <AlignRight />
      </Button>
    </div>
  );
}
