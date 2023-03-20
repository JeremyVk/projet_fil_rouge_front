import { BaseVariant } from "./baseVariant";

export interface OrderItem {
    id?: number,
    variant?: BaseVariant,
    quantity?: number,
    price?: number,
    tax?: number
}
