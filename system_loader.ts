/**
 * @todo The file needs to be generated automatically on build/run
 *  as there is no way to lazy load the dynamic "non-literal" path.
 */

import { lazy } from "react"

export const TTRPGSystems = {
  "broken-compass": lazy(() => import("@/../data/systems/broken-compass/components/character")),
}
