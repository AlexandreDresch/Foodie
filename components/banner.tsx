import Image from "next/image";

interface BannerProps {
  percentage: number;
  text: string;
  image: string;
  className: string;
}

export default function Banner({
  percentage,
  image,
  className,
  text,
}: BannerProps) {
  return (
    <div
      className={`flex w-full items-center justify-around rounded-md ${className} p-5 lg:p-10`}
    >
      <div className="text-white">
        <div className="flex justify-between">
          <div className="mr-1 text-base font-light">
            <p>up</p>
            <p>to</p>
          </div>

          <p className="text-5xl font-bold">
            {percentage}
            <span className="text-3xl">%</span>
          </p>
        </div>

        <p className="w-full text-end font-bold">off</p>
        <p className="text-base font-light">{text}</p>
      </div>

      <Image
        width={0}
        height={0}
        className="size-32 object-contain sm:size-36"
        sizes="100vw"
        priority
        src={image}
        alt={text}
      />
    </div>
  );
}
