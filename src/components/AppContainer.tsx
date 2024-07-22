type AppContainerProps = {
  children: React.ReactNode;
};

export const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <div className="bg-dark container sm:mx-auto  px-[16px] md:w-[640px]">
      {children}
    </div>
  );
};
