import { Address } from "./address";

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
    addresses?: Address[]
}
