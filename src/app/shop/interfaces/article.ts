import { BaseVariant } from "./baseVariant";
import {Author} from "./author";

export interface Article {
    id?: number,
    title?: string,
    resume?: string,
    editor?: string,
    image?: string,
    quantity?: number,
    variants?: Array<BaseVariant>,
    authors?: Author[]
}
