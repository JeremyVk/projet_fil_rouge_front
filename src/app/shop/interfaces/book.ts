import { Article } from "./article";
import {Author} from "./author";

export interface Book extends Article {
    format?: string,
    editor?: string,
    authors?: Author[]
}
