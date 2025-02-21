import { createContext, useContext } from "react";
import { PlayerService } from "./player.service";
import { DBService } from "./db.service";
import { FSRSService } from "./fsrs.service";
import { AddVideoService } from "./addVideo.service";

const dbService = new DBService();
const fsrsService = new FSRSService(dbService);
const playerService = new PlayerService(fsrsService);
const addVideoService = new AddVideoService(dbService);

export const services = {
  playerService,
  dbService,
  fsrsService,
  addVideoService,
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
