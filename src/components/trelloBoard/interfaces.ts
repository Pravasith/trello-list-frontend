



export type Card = {
    type: 'TODO' | 'DONE',
    title: string,
    id: string,

    dueDate?: Date,
    description?: string,
}


export interface ITrelloList {
    name: string
    id: string
}

export interface ITrelloBoard {
    name: string
    id: string
    lists?: ITrelloList[]
}

export interface IProps {
    todos: Card[],
    done: Card[]
}