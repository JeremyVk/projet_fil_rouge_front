export interface Jwt {
    email: string;
    exp: number;
    iat: number;
    roles: string[];
}
