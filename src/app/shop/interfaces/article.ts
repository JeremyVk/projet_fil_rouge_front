import { BaseVariant } from "./baseVariant";

export interface Article {
    id?: number,
    title?: string,
    resume?: string,
    editor?: string,
    image?: string,
    quantity?: number,
    variants?: Array<BaseVariant>,
}
