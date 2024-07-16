type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const PrimaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="buttonPrimary text-white text-base
        font-bold p-4 rounded-lg w-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-dark hover:bg-blue-700  text-lightGrey text-base
        font-bold p-4 rounded-lg w-full border border-x-lightGrey box-border"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TertiaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-dark hover:bg-blue-700  text-lightGrey text-base
            font-bold px-3 py-6 rounded-lg border border-x-lightGrey box-border w-[151px]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
