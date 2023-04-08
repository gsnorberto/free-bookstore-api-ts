export type BookDataType = {
    bookId: number,
    name: string,
    author: string,
    status: boolean,
    userId: number
}

export type FindAllBooksType = {
    bookId: number,
    name: string,
    author: string,
    status: boolean,
    createdBy: string
}[]

export type FindAllMyBooksType = {
    userName: string,
    bookName: string,
    bookAuthor: string
}[]

export type UpdateStatusBookType = {
    status: boolean,
    bookId: number,
}

export type CreateBookType = Omit<BookDataType, "status" | "bookId">

export type TakeBookType = Omit<BookDataType, "status" | "name" | "author">
