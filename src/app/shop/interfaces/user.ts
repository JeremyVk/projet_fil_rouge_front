export interface User {
    id? :number,
    firstname?: string,
    lastname?: string,
    email?: string,
    roles?: Array<string>,
    password?: string
}
