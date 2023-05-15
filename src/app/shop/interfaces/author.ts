import {Book} from "./book";

export interface Author {
  firstname?: string,
  lastname?: string,
  language?: string,
  books?: Book[]
}
