import React, { PropsWithChildren, createContext } from "react";
import { AppEnv } from "./AppEnv";

export type AppEnvProviderProps = {
  appEnv: AppEnv,
}

export const AppEnvContext = createContext<AppEnv>({} as AppEnv);

export const AppEnvProvider: React.FC<PropsWithChildren<AppEnvProviderProps>> = (props) =>
{

  return (
    <AppEnvContext.Provider value={props.appEnv}>
      {props.children}
    </AppEnvContext.Provider>
  )
}