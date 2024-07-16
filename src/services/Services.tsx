import { createContext, useContext } from "react";
import { PlayerService } from "./player.service";

const playerService = new PlayerService();

export const services = {
  playerService,
};
export type Services = typeof services;
export const ServicesContext = createContext<Services | null>(null);
export const ServicesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export function useServices(): Services {
  const services = useContext(ServicesContext);
  if (!services) {
    throw Error("ServiceContext not defined");
  }
  return services;
}
