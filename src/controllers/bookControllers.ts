import bookServices from "@/services/bookServices";
import { Request, Response, NextFunction } from "express";
import { CreateBookType, TakeBookType } from "@/protocols/book"; 

async function create(req: Request, res: Response, next: NextFunction) {
  const { name, author } = req.body;

  const { id } = res.locals.user;
  let bookData: CreateBookType = { name, author, userId: id }
  try {
    await bookServices.create(bookData);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const books = await bookServices.findAll();

    return res.send({ books });
  } catch (err) {
    next(err);
  }
}

async function takeBook(req: Request, res: Response, next: NextFunction) {
  const { id } = res.locals.user;
  const bookId = +req.params.id;

  let bookData: TakeBookType = { bookId, userId: id }
  try {
    await bookServices.takeBook(bookData);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAllMyBooks(req: Request, res: Response, next: NextFunction) {
  const { id }: { id: number } = res.locals.user;

  try {
    const books = await bookServices.findAllMyBooks(id);
    return res.send({ books });
  } catch (err) {
    next(err);
  }
}
export default { create, findAll, takeBook, findAllMyBooks };
