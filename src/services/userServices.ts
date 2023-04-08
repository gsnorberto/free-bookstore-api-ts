import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index.js";

import { CreateUserType, UserSignInType, CreateSessionType } from "@/protocols/user.js";

async function create({ name, email, password }: CreateUserType): Promise<void> {
  const { rowCount } = await userRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}

async function signin({ email, password }: UserSignInType): Promise<string> {
  const {
    rowCount,
    rows: [user],
  } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = uuidV4();

  let session: CreateSessionType = { token, userId: user.id };
  await userRepositories.createSession(session);

  return token;
}

export default {
  create,
  signin,
};
