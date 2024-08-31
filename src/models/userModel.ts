export type User = {
    id: number
    name: string
    password: string //encrypted
    role: "admin" | "user"
    api_token?: string
}

export type UserRequestParam = {
    name: string
    password: string //plain text
}