import { Address } from "./address";
import { BaseVariant } from "./baseVariant";
import { OrderItem } from "./order-item";
import { User } from "./user";

export interface Order {
    id?: number,
    user?: User,
    orderItems?: Array<OrderItem>
    amount?: number,
    createdAt?: Date,
    shippingAmount?: number,
    shippingAddressId?: number,
    shippingAddress?: Address,
    number?: number
}