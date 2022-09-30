import { Article } from "./article";

export interface Book extends Article {
    id?: number,
    isbnNumber?: number,
    format?: string,
    editor?: string,
}
