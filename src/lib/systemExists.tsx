import { TTRPGSystems } from "@root/system_loader";

/**
 * Check if TTRPG system is loaded into FF.
 * @param systemName System name like "broken-compass"
 * @returns 
 */
export function systemExists(systemName: string): boolean {

  return Boolean(Object.keys(TTRPGSystems).find(key => key === systemName));

}
