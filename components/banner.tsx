import Image from "next/image";

type BaseBannerProps = {
  variant: "base";
  percentage: number;
  text: string;
  image: string;
  color: string;
  textOrientation?: never;
};

type DetailedBannerProps = {
  variant: "detailed";
  percentage: number;
  text: string;
  image: string;
  color: string;
  textOrientation: "left" | "right";
};

type BannerProps = BaseBannerProps | DetailedBannerProps;

export default function Banner({
  percentage,
  variant,
  image,
  color,
  text,
}: BannerProps) {
  return (
    <div
      className={`flex w-full items-center justify-around rounded-md ${color} p-5 lg:p-10`}
    >
      <div className="text-white">
        <div className="flex justify-between">
          <div className="text-base font-light">
            <p>up</p>
            <p>to</p>
          </div>

          <p
            className={`text-5xl font-bold ${
              variant === "detailed" && "text-primary"
            }`}
          >
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
        className="size-32 object-fill sm:size-36"
        sizes="100vw"
        priority
        src={image}
        alt={text}
      />
    </div>
  );
}