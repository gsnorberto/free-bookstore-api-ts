export type CreateUserType = {
    id?: number,
    name: string,
    email: string,
    password: string
}

export type UserSignInType = Omit<CreateUserType, "name">

export type CreateSessionType = {
    id?: number,
    token: string,
    userId: number
}
