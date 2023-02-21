import { Address } from "./address";

export interface User {
    '@id'?: string,
    id? :number,
    firstname?: string,
    lastname?: string,
    email?: string,
    roles?: Array<string>,
    password?: string,
    addresses?: Address[]
}
