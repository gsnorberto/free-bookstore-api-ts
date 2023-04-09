import connectionDb from "../config/database.js";
import { BookDataType, FindAllBooksType, CreateBookType, TakeBookType, UpdateStatusBookType, FindAllMyBooksType } from "../protocols/book.js";
import { QueryResult } from "pg";


async function create({ name, author, userId }: CreateBookType): Promise<void> {
  await connectionDb.query(
    `
        INSERT INTO books (name, author, "userId")
        VALUES ($1, $2, $3)
        `,
    [name, author, userId]
  );
}

async function findByName(name: string): Promise<QueryResult<BookDataType>> {
  return await connectionDb.query(
    `
        SELECT
          id as bookId,
          name,
          author,
          available as status,
          userId
        FROM books WHERE name = $1;
    `,
    [name]
  );
}

async function findAll(): Promise<QueryResult<FindAllBooksType>> {
  return await connectionDb.query(
    `
        SELECT 
          b.id as bookId,
          b.name,
          b.author,
          b.available as status, 
          u.name as "createdBy"
        FROM books b
        JOIN users u
        ON b."userId" = u.id;
    `
  );
}

async function findById(id: number): Promise<QueryResult<BookDataType>> {
  return await connectionDb.query(
    `
          SELECT
            id as bookId,
            name,
            author,
            available as status,
            userId
          FROM books 
          WHERE id = $1;
      `,
    [id]
  );
}

async function updateStatusBook({status, bookId}: UpdateStatusBookType): Promise<void> {
  await connectionDb.query(
    `
      UPDATE books
      SET available = $1
      WHERE id = $2;
  `,
    [status, bookId]
  );
}

async function takeBook({userId, bookId}: TakeBookType): Promise<void> {
  await connectionDb.query(
    `
      INSERT INTO "myBooks" ("userId", "bookId")
      VALUES ($1, $2);
    `,
    [userId, bookId]
  );
}

async function findAllMyBooks(userId: number): Promise<QueryResult<FindAllMyBooksType>> {
  return await connectionDb.query(
    `
    SELECT 
      u.name as "userName",
      b.name as "bookName",
      b.author as "bookAuthor" 
    FROM "myBooks" m
      JOIN users u ON m."userId" = u.id
      JOIN books b ON m."bookId" = b.id
    WHERE m."userId" = $1
    `,
    [userId]
  );
}

// async function deleteById(userId: number) {
//   return await connectionDb.query(
//     `
//     DELETE FROM "books" 
//     `,
//     [userId]
//   );
// }

export default {
  create,
  findByName,
  findAll,
  findById,
  takeBook,
  updateStatusBook,
  findAllMyBooks,
};
