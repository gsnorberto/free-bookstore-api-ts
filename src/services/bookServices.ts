import errors from "../errors/index.js";
import bookRepositories from "../repositories/bookRepositories.js";
import { CreateBookType, TakeBookType, FindAllBooksType, FindAllMyBooksType, UpdateStatusBookType } from "@/protocols/book.js";

async function create(bookData: CreateBookType): Promise<void> {
  const {
    rows: [book],
  } = await bookRepositories.findByName(bookData.name);
  if (book) throw errors.conflictError("Book already exists");

  await bookRepositories.create(bookData);
}

async function findAll():  Promise<FindAllBooksType | []> {
  const { rows, rowCount } = await bookRepositories.findAll();
  if (!rowCount) throw errors.notFoundError();
  return rows;
}

async function takeBook(bookData: TakeBookType): Promise<void> {
  const {
    rows: [book],
    rowCount,
  } = await bookRepositories.findById(bookData.bookId);
  if (!rowCount) throw errors.notFoundError();
  if (!book.available) throw errors.conflictError("Book not available");

  let bookStatus: UpdateStatusBookType = {status: false, bookId:bookData.bookId}
  await bookRepositories.updateStatusBook(bookStatus);
  await bookRepositories.takeBook(bookData);
}

async function findAllMyBooks(userId: number): Promise<FindAllMyBooksType | []> {
  const { rows: books, rowCount } = await bookRepositories.findAllMyBooks(
    userId
  );
  if (!rowCount) throw errors.notFoundError();
  return books;
}

export default { create, findAll, takeBook, findAllMyBooks };
