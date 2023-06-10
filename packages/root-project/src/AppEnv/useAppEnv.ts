import { useContext } from "react";
import { AppEnvContext } from "./AppEnvProvider";
import { AppEnv } from "./AppEnv";

export function useAppEnv(): AppEnv{
  return useContext(AppEnvContext);
}