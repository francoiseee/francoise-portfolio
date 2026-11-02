import { useSyncExternalStore } from "react";
import { lofi } from "../utils/lofi.js";

// The music's current state ({ playing, volume }), kept in sync for any component.
export function useLofi() {
  return useSyncExternalStore(lofi.subscribe, lofi.get);
}
