import { Address } from "./address";
import { Order } from "./order";

export interface User {
    '@id'?: string,
    id? :number,
    firstname?: string,
    lastname?: string,
    email?: string,
    roles?: Array<string>,
    plainPassword?: string,
    currentPassword?: string,
    password?: string,
    addresses?: string[],
    orders?: Order[]
}
