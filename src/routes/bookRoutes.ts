import { Router } from "express";
import bookControllers from "@/controllers/bookControllers";
import authMiddleware from "@/middlewares/authMiddleware";
import { validateSchema } from "@/middlewares/schemaValidationMiddleware";
import { bookSchema } from "@/schemas/Book";

const bookRoutes = Router();

bookRoutes.post(
  "/",
  authMiddleware.authValidation,
  validateSchema(bookSchema),
  bookControllers.create
);
bookRoutes.get("/", authMiddleware.authValidation, bookControllers.findAll);
bookRoutes.post(
  "/take-book/:id",
  authMiddleware.authValidation,
  bookControllers.takeBook
);
bookRoutes.get(
  "/my-books",
  authMiddleware.authValidation,
  bookControllers.findAllMyBooks
);

export default bookRoutes;
