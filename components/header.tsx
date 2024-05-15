"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { AlignRight, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export default function Header() {
  const { data, status } = useSession();

  function handleSignOut() {
    signOut();
  }

  function handleSignIn() {
    signIn();
  }
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.svg" alt="Foodie" height={30} width={100} priority />
      </Link>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <AlignRight />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {status === "authenticated" ? (
            <div className="flex justify-between pt-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data?.user?.image as string | undefined} />
                  <AvatarFallback>
                    {data?.user?.name?.split(" ")[0][0]}
                    {data?.user?.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{data?.user?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {data?.user?.email}
                  </p>
                </div>
              </div>

              <Button size="icon" onClick={handleSignOut}>
                <LogOutIcon size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Sign In</h2>

              <Button size="icon" onClick={handleSignIn}>
                <LogInIcon size={20} />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div>
            <Link href="/">
              <Button
                size="icon"
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-2xl px-2 hover:bg-primary hover:text-white"
              >
                <HomeIcon size={20} />
                <span className="block">Home</span>
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
