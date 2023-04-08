import { DefaultErrorType, EmailErrorType } from "@/protocols/error";

function conflictError(message: string): DefaultErrorType {
  return {
    name: "ConflictError",
    message,
  };
}

function duplicatedEmailError(email: string): EmailErrorType {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
    email,
  };
}

function unauthorizedError(): DefaultErrorType  {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function notFoundError(): DefaultErrorType  {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

function invalidCredentialsError(): DefaultErrorType  {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

export default {
  conflictError,
  duplicatedEmailError,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
};
