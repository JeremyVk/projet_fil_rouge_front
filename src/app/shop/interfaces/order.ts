import { BaseVariant } from "./baseVariant";
import { User } from "./user";

export interface Order {
    user?: User,
    orderItems?: Array<BaseVariant>
    amount?: number,
    createdAt?: Date,
    shippingAmount?: number,
}