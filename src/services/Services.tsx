import { createContext, useContext } from "react";
import { PlayerService } from "./player.service";
import { EngineService } from "./engine.service";
import { DBService } from "./db.service";

const playerService = new PlayerService();
const dbService = new DBService();
const engineService = new EngineService(dbService);

export const services = {
  playerService,
  engineService,
  dbService,
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
