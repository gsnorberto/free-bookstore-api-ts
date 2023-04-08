export type DefaultErrorType = {
    name: string,
    message: string | string[],
    email?: string
} 

export type EmailErrorType = Required<DefaultErrorType>