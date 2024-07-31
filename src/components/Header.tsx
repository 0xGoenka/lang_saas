import { BackIcon } from "./Icons";

export type HeaderProps = {
  text: string;
  onClick?: () => void;
  right?: React.ReactNode;
};

export const Header = ({ text, onClick, right }: HeaderProps) => {
  return (
    <div className="mt-[12px] flex cursor-pointer" onClick={onClick}>
      <BackIcon />
      <span className="text-white text-base font-bold mx-[8px] my-[6px] leading-5">
        {text}
      </span>
      <div className="flex-1"></div>
      {right}
    </div>
  );
};
