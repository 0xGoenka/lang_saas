type AppContainerProps = {
  children: React.ReactNode;
};

export const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <div className="bg-dark container mx-auto  min-h-screen border border-white">
      {children}
    </div>
  );
};
