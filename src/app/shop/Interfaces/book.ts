import { Article } from "./article";

export interface Book extends Article {
    isbnNumber?: number,
    format?: string,
    editor?: string,
}
