import { HydraView } from "./hydra-view"

export interface Hydra {
    "hydra:member": Array<any>
    "hydra:search": object,
    "hydra:view": HydraView,
    "hydra:totalItems": number
}
