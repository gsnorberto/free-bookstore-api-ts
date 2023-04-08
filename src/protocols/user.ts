export type CreateUserType = {
    name: string,
    email: string,
    password: string
}

export type UserSignInType = Omit<CreateUserType, "name">

export type CreateSessionType = {
    token: string,
    userId: number
}
