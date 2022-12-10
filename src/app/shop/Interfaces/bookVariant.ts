import { BaseVariant } from "./baseVariant";
import { Book } from "./book";

export interface BookVariant extends BaseVariant {
    book?: Book,
    isbnNumber?: string,
}