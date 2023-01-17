import { Article } from "./article";
import { Format } from "./format";

export interface BaseVariant {
    image?: string;
    id?: number,
    stock?: number,
    unitPrice?: number,
    article?: Article,
    quantity?: number,
    parent?: Article,
    title?: string,
    format?: Format,
    type?: string
}