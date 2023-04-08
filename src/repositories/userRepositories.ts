import connectionDb from "../config/database.js";
import { CreateUserType, CreateSessionType } from "@/protocols/user.js";

async function findByEmail(email: string) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE email=$1
  `,
    [email]
  );
}

async function create({ name, email, password }: CreateUserType) {
  await connectionDb.query(
    `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `,
    [name, email, password]
  );
}

async function createSession({ token, userId }: CreateSessionType) {
  await connectionDb.query(
    `
        INSERT INTO sessions (token, "userId")
        VALUES ($1, $2)
    `,
    [token, userId]
  );
}

async function findSessionByToken(token: string) {
  return await connectionDb.query(
    `
        SELECT * FROM sessions WHERE token = $1
    `,
    [token]
  );
}

async function findById(id: number) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE id=$1
  `,
    [id]
  );
}

export default {
  findByEmail,
  create,
  createSession,
  findById,
  findSessionByToken,
};
