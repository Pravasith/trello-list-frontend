



export type Card = {
    type: 'TODO' | 'DONE',
    title: string,
    id: string,

    dueDate?: Date,
    description?: string,
}

export interface IProps {
    todos: Card[],
    done: Card[]
}