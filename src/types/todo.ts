export interface TodoInterface {
    created_at?: string | null
    id?: number
    title?: string | null
    user_id?: string | null
}

export type Todo = TodoInterface | null;