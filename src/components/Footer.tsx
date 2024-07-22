import { LibraryIcon, UserIcon } from "./Icons";

export const Footer = () => {
  return (
    <div className="flex justify-evenly border-2 border-t-darkBluewhite h-[100px] items-center bg-dark mt-[24px]">
      <div className="items-center flex flex-col flex-1">
        <LibraryIcon fill="#E6E7E8" />
        <span className="text-lightGrey text-xs font-bold mt-[4px]">
          Library
        </span>
      </div>
      <div className="items-center flex flex-col flex-1">
        <UserIcon />
        <span className="text-lightGrey text-xs font-bold mt-[4px]">
          Account
        </span>
      </div>
    </div>
  );
};
