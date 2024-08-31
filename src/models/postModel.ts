export enum postStatus {
    active,
    disabled
}

export type Post = {
    id: number
    status: postStatus
    title: string
    author: string
    Content: string
}