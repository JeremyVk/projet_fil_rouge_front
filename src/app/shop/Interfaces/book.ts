import { Article } from "./article";
import { BookVariant } from "./bookVariant";

export interface Book extends Article {
    format?: string,
    editor?: string,
}
