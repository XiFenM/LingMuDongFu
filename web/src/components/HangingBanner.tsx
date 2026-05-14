import Image from "next/image";

type Props = {
  text?: string;
  sub?: string;
  className?: string;
};

export function HangingBanner({ text, sub, className }: Props) {
  return (
    <div className={`relative w-[88px] md:w-[110px] lg:w-[132px] aspect-[3/8] select-none ${className ?? ""}`}>
      <Image
        src="/assets/lydt/decor/decor-hanging-banner-paper-alpha.png"
        alt=""
        fill
        sizes="(min-width:1024px) 132px, 88px"
        className="object-fill"
        aria-hidden
      />
      <div className="absolute inset-x-[18%] top-[16%] bottom-[12%] flex items-center justify-center gap-1 text-[#5d4a2c]">
        <VerticalText value={text} className="text-[15px] md:text-[17px] lg:text-[19px] gap-[0.18em]" />
        {sub ? <VerticalText value={sub} className="text-[9px] md:text-[10px] lg:text-[11px] gap-[0.1em] text-[#7a6537]" /> : null}
      </div>
    </div>
  );
}

function VerticalText({ value, className }: { value?: string; className?: string }) {
  if (!value) return null;

  return (
    <span className={`flex flex-col items-center font-display leading-none ${className ?? ""}`}>
      {[...value].map((char, index) => (
        <span key={`${char}-${index}`}>{char}</span>
      ))}
    </span>
  );
}
