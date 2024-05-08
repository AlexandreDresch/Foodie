import Image from "next/image";
import { Button } from "./ui/button";
import { AlignRight } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.svg" alt="Foodie" height={30} width={100} priority />
      </Link>

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
