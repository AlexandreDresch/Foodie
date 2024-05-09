"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormInputs {
  search: string;
}

export default function Search() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { search } = data;

    if (!search) {
      return;
    }

    router.push(`/restaurant?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Search Restaurants"
        className="border-none"
        {...register("search")}
        onChange={(e) => setValue("search", e.target.value)}
      />

      <Button size="icon" type="submit">
        <SearchIcon size={18} />
      </Button>
    </form>
  );
}
