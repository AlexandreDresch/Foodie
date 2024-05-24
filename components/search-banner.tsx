import Image from "next/image";
import Search from "./search";

export default function SearchBanner() {
  return (
    <div className="relative flex w-full bg-primary p-24 text-white xl:p-28">
      <div className="space-y-4 md:w-3/5 lg:w-1/2">
        <div>
          <h2 className="text-3xl font-bold">Are you hungry?</h2>
          <h3>Find the best restaurants near you.</h3>
        </div>

        <div className="rounded-lg bg-white p-6">
          <Search />
        </div>
      </div>

      <div className="absolute bottom-0 left-2/3">
        <Image
          src="/search-banner-image.png"
          alt="Banner food image."
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
